import enUSLangs from '../../.kiwi/en-US'
import zhCNLangs from '../../.kiwi/zh-CN'

type ZhCNLangs = typeof zhCNLangs
export interface LangData extends ZhCNLangs{
  isEn: boolean
} 

export enum LangEnum {
  zh_CN,
  en_US 
}

const langs = {
  [LangEnum.en_US]: enUSLangs,
  [LangEnum.zh_CN]: zhCNLangs,
}


function registerI18N (lang: LangEnum): any {
  let I18N: any = langs[lang]
  return I18N
}

export default registerI18N