import { useAsyncEffect } from "ahooks";
import { intToFixed } from "hipo-contract";
import { useCallback, useState } from "react";
import { useHipoContract, useWalletHooks } from "src/store/wallet/hooks";

export function useBalance () {
	const { useProvider, useAccount } = useWalletHooks()
	const { HipoContract } = useHipoContract()
	const selfAccount = useAccount()
	const provider = useProvider()
	const [gtBalance, setGtBalance] = useState('0')

	const getBalance = useCallback(async (account: string) => {
		return await provider?.getBalance(account) || '0'
	}, [provider])
	
	const getTokenBalacne = useCallback(async (token: string) => {
		return await HipoContract?.ERC20.getBalanceOf(token)
	}, [HipoContract])

	useAsyncEffect(async () => {
		const res = await provider?.getBalance(selfAccount as string) || '0'
		setGtBalance(intToFixed(res.toString() || '0', 18))
	}, [provider, selfAccount])

	return  {getBalance, gtBalance, getTokenBalacne}
}