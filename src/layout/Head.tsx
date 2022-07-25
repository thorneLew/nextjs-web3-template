import { FC } from "react"
import NextHead from 'next/head'
import { getPath } from "src/utils"


export interface ITDK {
	title?: string
	description?: string,
	keywords?: string
}
interface IHead {
	tdk?: ITDK
}

const Head:FC<IHead> = ({tdk}) => {
	
	return <NextHead>
		<title>{tdk?.title || ''}</title>
        <meta name="description" content={tdk?.description || ''} />
		<meta name="keywords" content={tdk?.keywords || ''} />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={getPath('/favicon.ico')} />
		
		<link rel="stylesheet" href={getPath('/static/css/common.css')} />
	</NextHead>
}

export default Head