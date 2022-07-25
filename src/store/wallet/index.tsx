import { createSlice } from "@reduxjs/toolkit";
import { HipoContract as BaseHipoContract } from "hipo-contract";
import { WalletType } from "hipo-wallet";
import { WGTContract } from "src/contract";


export declare class HipoContract extends BaseHipoContract {
	WGTContract: WGTContract
}

interface State {
	Contract?: HipoContract,
	walletType: WalletType | null,
	isLogin?: boolean,
	token?: string | null,
	lastAccount?: string | null
}

const walletSlice = createSlice({
	name: 'wallet',
	initialState: {
		walletType: 'metaMask',
		isLogin:false,
		token: '',
		lastAccount: '',	
		Contract: {}
	} as State,
	reducers: {
		setWalletType (state, {payload}) {
			localStorage.setItem('walletType', payload)
			state.walletType = payload
		},
		setLastAccount (state, {payload}) {
			localStorage.setItem('lastAccount', payload)
			state.lastAccount = payload
		},
		setToken (state, {payload}) {
			localStorage.setItem('token', payload)
			state.token = payload
		},
		setContract (state, {payload}) {
			state.Contract = payload
		},
		setIsLogin (state, {payload}) {
			state.isLogin = payload
		},
		initLoginInfo (state) {
			const walletType = localStorage.getItem('walletType') || 'metaMask'
			const token = localStorage.getItem('token') || null
			const lastAccount = localStorage.getItem('lastAccount') || null
			state.token = token
			state.walletType = walletType as WalletType
			state.lastAccount = lastAccount
		},
		logOut (state) {
			state.token = null
			state.walletType = null
			state.lastAccount = null
			localStorage.setItem('walletType', '')
			localStorage.setItem('lastAccount', '')
			localStorage.setItem('token', '')
			state.isLogin = false
		}
	}	
})

export const { setWalletType, setContract ,setIsLogin, setToken, setLastAccount, logOut, initLoginInfo} = walletSlice.actions

export default walletSlice.reducer