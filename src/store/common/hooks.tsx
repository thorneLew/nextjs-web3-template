import { useSelector } from "react-redux";
import { RootState } from "..";

export function useGtPrice () {
	return useSelector((state: RootState) => state?.common?.gtPrice)
}


