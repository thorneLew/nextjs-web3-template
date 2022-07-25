import { Box, Container, Typography } from "@mui/material"
import { FC } from "react"

const { style } = getStyle();
const Footer: FC = () => {
	return <Box component="footer" mt={3} sx={{...style,backgroundColor:'#05121C'}}>
    <Container maxWidth="lg" className='container'>
      <Typography variant='caption'>Footer</Typography>
    </Container>
</Box>
}

export default Footer

function getStyle() {
  const style = {}
  return { style }
}