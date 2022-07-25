import { FC, useEffect, useMemo } from "react";
import Footer from "./footer";
import Head, { ITDK } from './Head'
import BaseHeader from './Header/BaseHeader'
import { Provider } from 'src/provider'
import { Box, Container } from "@mui/material";
import { HipoWallet } from 'hipo-wallet';
import { useContract, useWalletHooks } from "src/store/wallet/hooks";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useLogin } from "src/sdk/login";
import { useDispatch } from "react-redux";
import { initLoginInfo } from "src/store/wallet";

interface ILayout {
	Header?: React.ReactNode,
	TDK?: ITDK,
	maxWidth?: any,
	sx?: object | undefined,
  showFooter?: boolean
}


/**
 * Login logic：
[ ] Normally no login status, click connectBtn to log in wallet only
[ ] Wallet connection status, when the server is not logged in, click connectBtn to authorize the wallet
[ ] When jwt fails, when triggering APIs such as creation, it will jump to the corresponding url after verifying and authorizing the login in advance.
[ ] jwt exists and expires, when the wallet is disconnected,
	[ ] If it is the same as the last login account, only wallet login
 */

const Layout: FC<ILayout> = ({ children, Header, TDK, maxWidth = 'lg', sx, showFooter }) => {
	const router = useRouter();
	useContract()
	const dispatch = useDispatch()
	const {useAccount} = useWalletHooks()
	const account = useAccount()
	const {lastAccount, handleLogOut} = useLogin()

	useEffect(() => {
		dispatch(initLoginInfo())
		HipoWallet.init()
	}, [])

	useEffect(() => {
		if (account && lastAccount && account !== lastAccount) {
			handleLogOut()
			location.reload()
		}
	}, [account, lastAccount])

	const handleStart = (url: string) => {
		NProgress.start()
	  }
	
	  const handleStop = () => {
		NProgress.done()
	  }
	
	useEffect(() => {
		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleStop)
		router.events.on('routeChangeError', handleStop)
	
		return () => {
		  router.events.off('routeChangeStart', handleStart)
		  router.events.off('routeChangeComplete', handleStop)
		  router.events.off('routeChangeError', handleStop)
		}
	  }, [router]);

	const tdk = useMemo(() => {
		return Object.assign({
			keywords: 'keywords',
			description: 'description'
		} as ITDK, TDK)
	}, [TDK])

	return <Provider>
		{/* <CssBaseline /> */}
		<Box height="100%" width="100%" display={"flex"} flexDirection="column" sx={{position: 'relative' }}>
			<Head tdk={tdk} />
			<Box flexShrink={0} sx={{ position: 'fixed', top: '0', zIndex: 99,width:'100%' }}>
				{Header || <BaseHeader />}
			</Box>
			<Box component={"main"} flexGrow={1} sx={{paddingTop:'60px'}}>
				<Container maxWidth={maxWidth} sx={{ ...sx }}>
					{children}
				</Container>
			</Box>
      {showFooter ? <Footer /> :''}
		</Box>
	</Provider>

}

export default Layout