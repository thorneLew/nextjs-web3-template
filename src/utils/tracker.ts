
interface SendOption {
	baseUrl?: string
}

class Tracker {
	baseUrl: string
	constructor (baseUrl?: string) {
		this.baseUrl = baseUrl || 'http://log.hipo.com/log.gif'
	}

	send (query:Object, option?:SendOption) {
		const baseUrl = option?.baseUrl || this.baseUrl
		const eventTime = new Date().getTime()
		const baseQuery = Object.assign({eventTime}, query)
		const img = new Image()
		const queryStr = Object.entries(baseQuery).map(([key, value]) => `${key}=${value}`).join('&')
		img.src = `${baseUrl}?${queryStr}`
	}
}

export default Tracker