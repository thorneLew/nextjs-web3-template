import { Box, Typography } from "@mui/material"
import { Modal } from "."

export const ModalSwitchNetwork = () => {
	return Modal({
		title: 'Please switch to GateChain network',
		okText: 'Switch network',
		sx:{height: 261},
		okSx: {width: 280,height: 50},
		content: () => <Box sx={{display: 'flex', color: '#c0c3c6', flexDirection: 'column', alignItems: 'center', mt: '20px'}}>
			<Typography variant="body2" sx={{textAlign: 'center', mb: '20px', fontFamily:' PingFangSC, PingFangSC-Regular'}}>In order to trade items, please switch to GateChain network within your MetaMask wallet.</Typography>
			<Typography variant="body2" sx={{fontFamily:' PingFangSC, PingFangSC-Regular'}}>your MetaMask wallet.</Typography>
		</Box>,

	})
}