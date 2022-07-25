import { Box, Modal, SxProps } from "@mui/material"
import { FC, useState } from "react"

const BoxSx: SxProps = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)'
}


interface IProps {
	sx?: SxProps
	open: boolean,
	onChange: (open: boolean) => void 
}
export const ModalBase:FC<IProps> = ({sx = {}, children ,open, onChange}) => {
	function handleClose () {
		onChange(false)
	}
	return <Modal
	open={open}
	onClose={handleClose}
  >
	<Box sx={{...BoxSx, ...sx}}>
		{children}	
	</Box>
  </Modal>
}