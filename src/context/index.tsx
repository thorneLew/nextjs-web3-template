import { FC } from "react"
import { Provider } from "react-redux"
import { LangData } from "src/utils/I18N"
import { I18NContext } from "./I18NContext"

interface IProps {
	I18N: LangData,
	store: any
}

export const Context: FC<IProps> = ({children, I18N, store}) => {
	return  <Provider store={store}>
		<I18NContext.Provider value={I18N}>
			{children}
		</I18NContext.Provider>
	</Provider>
}