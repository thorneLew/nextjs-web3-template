import '../styles/globals.css'
import App from "next/app"
import registerI18N, { LangData, LangEnum } from 'src/utils/I18N'
import { useStore } from 'src/store'
import { Context } from 'src/context'
import Tracker from 'src/utils/tracker'

if (typeof window !== 'undefined') {
  (window as any).tracker = new Tracker()
}
function MyApp({ Component, pageProps, I18N }: any) {
  const store = useStore({})

  return <Context I18N={I18N} store={store}>
      <Component {...pageProps} />
    </Context>
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  const lang = appContext?.router?.query?.lng || 'en'
  const isEnLang = lang === "en" 
  const currLang: LangEnum = isEnLang ? LangEnum.en_US : LangEnum.zh_CN
  const I18N = registerI18N(currLang)
  I18N.isEn = isEnLang
  return { ...appProps, I18N }
}

export default MyApp