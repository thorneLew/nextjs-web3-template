import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

const ResponsiveAppBar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth={"lg"}>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", width: "100%",alignItems:'center',justifyContent:'center' }}>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
