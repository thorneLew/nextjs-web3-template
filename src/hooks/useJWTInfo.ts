import { useLocalStorageState } from "ahooks";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export function useJWTInfo () {
	let token = useSelector((state: RootState) => state.wallet.token)
	if (token === 'false') {
		token = ''
	}
	const jwtInfo = useMemo(() => {
		if (!token) {
			return
		}
		let strings = token.split(".");
		return JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))))
	}, [token])
	return {jwtInfo}
}