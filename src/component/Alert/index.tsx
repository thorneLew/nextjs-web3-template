import { Box, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ReactDOM from 'react-dom'
import React from 'react'


interface IProps extends AlertProps {
	message?: string
	duration?: number
}

class State {
	notices: Notice[] = []
}

interface Notice {
	open: boolean 
	duration: number
	message: any
	severity: AlertProps['security'] 
	key: string
}
class AlertComponent extends React.Component{
	state: State = new State()

	getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }

	addNotice(notice: any) {
		const {notices} = this.state
		notice.key = this.getNoticeKey()
		if (notices.every(item => item.key !== notice.key)) {
			notices[0] = notice
			this.setState({notices})
		}
		return () => {
			this.removeNotice(notice.key)
		}
	}

	removeNotice(key: any) {
		this.setState((prevState: State) => ({
			notices: prevState.notices.filter(notice => notice.key !== key)})
		)
	}

	handleClose (index: number) {
		const {notices} = this.state
		notices[index].open = false
		this.setState({
			notices
		})
	}

	render() {
		const {notices} = this.state

		return  <Box minWidth="400px">
			{
				notices.map((notice: any, index) => {
					return <Snackbar
						key={notice.key}
						open={notice.open}  
						anchorOrigin={{vertical: 'top', horizontal: 'center'}}
						autoHideDuration={notice.duration}
						onClose={() => this.handleClose(index)}
					>
					<MuiAlert 
						elevation={6} 
						variant="filled" 
						severity={notice.severity}
					>
						{notice.message}
					</MuiAlert>
				</Snackbar>
				})
			}
		
		</Box>
	}
}

function createAlert () {
	const div = document.createElement('div')
	document.body.append(div)
	const alertComp: any = ReactDOM.render(<AlertComponent />, div)

	return {
		open(props: IProps) {
			alertComp.addNotice(props)
		},
		close () {
			ReactDOM.unmountComponentAtNode(div)
			document.removeChild(div)
		}
	}
}

let notification: any
const notice  = (type: any, message: any, duration: number) => {
	if (!notification) {
		notification = createAlert()
	}
	return notification.open({ severity: type, message, duration, open: true} as IProps)
}

export const Alert = {
	info(content: any, duration=2000) {
		return notice('info', content, duration)
	},
	success(content: any, duration=2000) {
		return notice('success', content, duration)
	},
	warning(content: any, duration=2000) {
		return notice('warning', content, duration)
	},
	error(content: any, duration=2000) {
		return notice('error', content, duration)
	},
	loading(content: any, duration = 0) {
		return notice('loading', content, duration)
	}
}





