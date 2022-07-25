import { ThemeProvider, createTheme, SxProps } from '@mui/material/styles'
import { Component, ReactNode } from "react";
import ReactDOM from "react-dom";
import { getTheme } from "src/utils/theme";
import { ModalTitle } from "./ModalTitle";

class State {
	open = false
	title = 'Title'
	showCancel = true
	cancelText = ''
	okText = 'Ok'
	sx?: SxProps ={}
	onOk?:() => void
	onCancel?: () => void
	content?: () => ReactNode 
	okSx:SxProps={}
	cancelSx:SxProps={}
}

class ModalComponent extends Component {
	state = new State()
	
	init (val: State) {
		this.setState(val)
	}
	
	setOpen (val: boolean) {
		this.setState({open: val})
	}
	
	getTheme () {
		return createTheme(getTheme({mode: 'drak'}))
	}

	render(): ReactNode {
		return  <ThemeProvider theme={this.getTheme()}>
			<ModalTitle
				title={this.state.title}
				cancelText={this.state.cancelText}
				okText={this.state.okText}
				okSx={this.state.okSx}
				sx={this.state.sx}
				cancelSx={this.state.cancelSx}
				content={this.state.content}
				open={this.state.open}
				onCancel={this.state.onCancel}
				onOk={this.state.onOk}
				onChange={this.setOpen.bind(this)}
			/>
		</ThemeProvider>
	}
}


function createModal () {
	const div = document.createElement('div')
	document.body.append(div)
	const modalComp: any = ReactDOM.render(<ModalComponent />, div)

	return {
		open(props: Partial<State>) {
			modalComp.init(props)
		},
		close () {
			modalComp.setOpen(false)
		}
	}
}

let instance: ReturnType<typeof createModal> 

function createInstace () {
	if (!instance) {
		instance = createModal()
	}
	return instance
}

interface IModal {
	(props?: Partial<Omit<State, 'onOk' | 'onCancel'>>): Promise<typeof instance> 
	instance?: typeof instance
}

export const Modal: IModal = (props) => {
	const modalInstance = createInstace();
	Modal.instance = modalInstance;
	return new Promise((resolve, reject) => {
		function onOk () {
			resolve(modalInstance)
		}
		function onCancel () {
			reject(modalInstance)
		}
		modalInstance.open({ open: true, onOk , onCancel, ...props });
	})
}
