import { FC, useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { getTheme } from 'src/utils/theme';
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export const Provider: FC = ({children}) => {
	const mode = useSelector((state: RootState) => state.common.themeMode)
	const theme = useMemo(() => {
		return createTheme(getTheme({mode}))
	}, [mode])

	return <ThemeProvider theme={theme}>
		{children}
	</ThemeProvider>
}