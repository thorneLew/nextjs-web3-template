import { useUpdateEffect } from "ahooks";
import { HipoContract } from "hipo-contract";
import { HipoWallet } from "hipo-wallet";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WGTContract } from "src/contract/WGT";
import { setContract } from ".";
import { RootState } from "../index";

export function useWalletHooks () {
	const walletType = useSelector((state: RootState) => state.wallet.walletType)
	const Hooks = useMemo(() => {
		return HipoWallet.getHooks(walletType as any)
	}, [walletType])
	return Hooks
}


export function useHipoContract  () {
	const HipoContract = useSelector((state: RootState) => state.wallet.Contract)
	return {HipoContract}
}

export function useContract () {
	const dispatch = useDispatch()
	const {useAccount, useChainId, useProvider}  = useWalletHooks()
	const account = useAccount()
	const chainId = useChainId()
	const provider = useProvider()


	useEffect(() => {
		if (!account || !provider || !chainId) {
			return 
		}
		
		const contract = new HipoContract({
			provider,
			chainId,
			currAccount: account ? account : '',
			config: {
				85: {
					WGTContractAddress: '0x40bB927DAFAE8dca504Ac427a1f51b0F7dC20b7f',
				},
				4: {
					WGTContractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
				},
			}
		}) as HipoContract
		contract.registerContract(WGTContract)
		
		dispatch(setContract(contract))

	}, [account, provider, chainId])
}

export function useIsLogin () {
	const isLogin = useSelector((state: RootState) => state.wallet.isLogin)
	return isLogin
}