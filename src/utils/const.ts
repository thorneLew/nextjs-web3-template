export const PHONE = { xs: 'flex', md: 'none' }
export const WEB = {xs: 'none', md: 'flex'}


interface IChainList {
  [key: number]: {
    chainId: number,
    chainName: string,
    rpcUrls: string[],
    nativeCurrency: {
      symbol: string,
      decimals: number,
    },
    blockExplorerUrls: string[]
  } 
}
export const CHAINLIST: IChainList = {
	85: {
        "chainId": 85,
        "chainName": 'Meteora',
        "rpcUrls": [
          'https://meteora-evm.gatenode.cc'
        ],
        "nativeCurrency": {
            "symbol": 'gt',
            "decimals": 18
        },
        "blockExplorerUrls": ['https://gatescan.org/testnet']
	}	
}

type INextMode = 'test' | 'prod'
export const getEnvConfig = () => {
  const mode: INextMode = ( process.env.NEXT_MODE as INextMode )
  const config = {
    test: {
      chainId: 85,
      gateScanDomain: 'https://gatescan.org/testnet',
      uploadPath: 'https://www.hipo.com/files/',
      hipoDomain: 'https://hipotest.gatenode.cc'
    },
    prod: {
      chainId: 86,
      gateScanDomain: 'https://gatescan.org',
      uploadPath: 'https://www.hipo.com/files/',
      hipoDomain: 'https://hipo.com'
    }
  }

  return config[mode]
  
}