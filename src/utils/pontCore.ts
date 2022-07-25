import request from './pontFetch'
export class PontCore {
	static fetch (path: string, params: any, method: string, options: any) {
		if (method === 'GET') {
			return request.get(path, {...options, params})
		} else if (method === 'POST') {
			let body = options?.body || {}
			if (!(options.body instanceof URLSearchParams) && options.isFormData) {
				body = new URLSearchParams()

				Object.keys(options.body).map(key => {
					let item = options.body[key]
					if (options.body[key] instanceof Object) {
						item = JSON.stringify(options.body[key])
					}
					body.append(key, item)
				})
			}
			return request.post(path, body, options)
		}
	}
}
