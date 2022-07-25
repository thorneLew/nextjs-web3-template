import WGTAbi from './abi/WGT.json'
import ContractAbstract from 'hipo-contract/dist/contract/ContractAbstract.js'

export class WGTContract extends ContractAbstract{
	static contractName = 'WGTContract'
	Abi = WGTAbi

	constructor(props: any) {
		super(props)
	}
	
	async withdraw (wad: string): Promise<any> {
		const signer = this.getContractSigner()
		const gasLimit_ = await signer.estimateGas.withdraw(wad)
		return signer.withdraw(wad, {gasLimit: gasLimit_})
	}	

	async deposit (payableAmount: string): Promise<any> {
		const signer = this.getContractSigner()
		const gasLimit_ = await signer.estimateGas.deposit({value: payableAmount})

		return signer.deposit({value: payableAmount, gasLimit: gasLimit_})
	}
	
	async approve(guy: string, uint: string): Promise<any> {
		const signer = this.getContractSigner()
		return signer.approve(guy, uint)
	}
	
	async allowance (account: string, operator: string) : Promise<any> {
		const provider = this.getContractProvider()
		return provider.allowance(account, operator)
	}
	
	getBalance (address: string) {
		const provider = this.getContractProvider()
		return provider.balanceOf(address)
	}
}