import { useMemoizedFn, useRequest } from "ahooks";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHipoContract, useWalletHooks } from "src/store/wallet/hooks";
// import API from "src/utils/api";
import NProgress from "nprogress";
import { useJWTInfo } from "src/hooks/useJWTInfo";
import moment from "moment";
import { HipoWallet } from "hipo-wallet";
import { logOut, setIsLogin, setLastAccount, setToken, setWalletType } from "src/store/wallet";
import { useDispatch, useSelector} from "react-redux";
import { RootState } from "src/store";
import { CHAINLIST, getEnvConfig } from "src/utils/const";
import { ModalSwitchNetwork } from "src/component/Modal/const";

let cancelCount = 0;
let clearLoginState = true;

export function useLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { HipoContract } = useHipoContract();
  const { useAccount, useIsActive, useChainId } = useWalletHooks();

  const account = useAccount()
  const isActive = useIsActive();
  const chainId = useChainId()
  const { jwtInfo } = useJWTInfo();
  // const { runAsync } = useRequest(API.NFTMod.nFT.postOnboarding.request, { manual: true });
  const {walletType, lastAccount, token, isLogin} = useSelector((state:RootState) => state.wallet)
  const [isWalletConnect, setIsWalletConnect] = useState(false);

  useEffect(() => {
    if (isWalletConnect && isActive) {
      setTimeout(() => {
        login();
      });
      // 执行过后
      setIsWalletConnect(false);
    }
    let timer: any;
    if (!isActive && clearLoginState) {
      timer = setTimeout(() => {
        handleLogOut();
        clearLoginState = false;
      }, 3 * 1000);
    } else {
      clearTimeout(timer);
      clearLoginState = true;
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [isActive])
  
  const checkChain = useCallback(async () => {
    const config = getEnvConfig()
    const isChain = chainId !== config.chainId 
    if (isChain) {
      ModalSwitchNetwork().then(ins => {
        const params = CHAINLIST[config.chainId]
        HipoWallet.connector?.activate(params)
        ins.close()
      })
    }
    
    return isChain
  }, [chainId])

  const login = useCallback(async () => {
    if (!isActive && !isWalletConnect) {
      HipoWallet.connect("metaMask");
      dispatch(setWalletType("metaMask"))
      setIsWalletConnect(true);
      return;
    }

    if (!HipoContract?.sign) {
      return;
    }

    let loginForm = { action: "HIPO-ONBOARDING", timestamp: Math.round(new Date().getTime() / 1000).toString() } as any;
    const data = await HipoContract?.sign(JSON.stringify(loginForm));
    loginForm.address = account;
    loginForm.signature = data;
    // const { data: result } = (await runAsync({}, loginForm)) as any;
    // dispatch(setToken(result.jwt_token))
    dispatch(setLastAccount(account))

    if (!walletType) {
      dispatch(setWalletType("metaMask"))
    }
  }, [HipoContract, account, lastAccount, isActive]);

  const handleLogOut = () => {
    dispatch(logOut())
  };
  useEffect(() => {
    const wallet = walletType && isActive && account === lastAccount;
    dispatch(setIsLogin(wallet ? true : false));
  }, [walletType, isActive, account, lastAccount]);

  const isAuthorization = useMemo(() => {
    const exp = jwtInfo?.exp;
    if (!exp) {
      return token;
    }

    const isExpire = moment().format("X") <= exp;
    return isExpire;
  }, [token, jwtInfo, isActive, isLogin]);

  /**
   * 1. no linked Wallet
     2. wallettype is not set
     3. when the token does not exist
   * @param cb callback
   * @returns {viod}
   */
  async function authorizedLogin(cb: Function) {
    if (
    (!isActive && !isWalletConnect)
    || !walletType || !token
    ) {
      // 设置链接钱包成功
      return;
    }

    const isChain = await checkChain()
    if (isChain) {
      return
    }

    try {
      if (!isAuthorization) {
        NProgress.start();
        await login();
        dispatch(setIsLogin(true));
        NProgress.done();
      }
      if(isLogin){
        cb();
      }
      cancelCount = 0;
    } catch (error) {
      NProgress.done();
      cancelCount += 1;
      if (cancelCount === 3) {
        router.push("/");
        cancelCount = 0;
      } else {
        authorizedLogin(cb);
      }
    }
  }

  return {
    token,
    isLogin,
    lastAccount,
    isAuthorization,
    login: useMemoizedFn(login),
    handleLogOut: useMemoizedFn(handleLogOut),
    authorizedLogin: useMemoizedFn(authorizedLogin),
  };
}
