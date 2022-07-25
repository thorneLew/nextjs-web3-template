import { Box, Button, ButtonProps, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";
import { ModalBase } from "./ModalBase";

interface IProps {
	open: boolean
	title?: string
	showCancel?: boolean
	cancelText?: string | ReactNode
	okText?: string | ReactNode
	sx?: SxProps
	okSx?: SxProps
	cancelSx?: SxProps
	content?: () => ReactNode | ReactNode
	onOk?: () => void,
	onCancel?: () => void
	onChange: (open: boolean) => void
}

const sxModalBox:SxProps = {
	width: 520, 
	height: 261, 
	bgcolor:'#313339',
	borderRadius: '8px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between'
}

export const ModalTitle:FC<IProps> = ({
	sx={}, 
	open,
	title,
	showCancel = true,
	okSx={},
	cancelSx = {},
	cancelText,
	okText, 
	content,
	onChange,
	onOk = () => {},
	onCancel = async () => {}
}) => {
	const getTitle = () => {
		return title 
		&& <Box sx={{ borderBottom: '1px solid #8b929c', height: 50, display: 'flex' , alignItems: 'center', justifyContent: 'space-between', px: 2}}>
			<span></span>
			{title}
			<span style={{cursor: 'pointer', fontSize: 18}} onClick={() => {
				onCancel()
				onChange(false)
			}
			}>&times;</span>
		</Box>
	}

	const getBtn = (variant: ButtonProps['variant'], text: string | ReactNode, cb: any, sx?: SxProps, ) => {
		if (!text) {
			return null
		}

		if (typeof(text)=='string') {
			return <Button onClick={() => {
				cb()
			}} sx={sx} variant={variant}>{text}</Button>
		}
		return text
	}

	const getFooter  = () => {
		return <Box sx={{display: 'flex', justifyContent: 'center', mb: '20px'}}>
			{getBtn('outlined', cancelText, onCancel, {color: '#fff',...cancelSx})}
			{
				getBtn(
					'contained',
					okText,
					onOk,
					{ ml: cancelText ? 3 : 0, ...okSx }
				)
			}
		</Box>
	}

	const getContent = ()  => {
		if (typeof(content) === 'function') {
			return content()
		}
		return content
	}

	return <ModalBase sx={{...sxModalBox,...sx}} open={open} onChange={onChange}>
	{getTitle()}	
	<Box flexGrow={1}>
		{getContent()}
	</Box>
	{getFooter()}
	</ModalBase>
}