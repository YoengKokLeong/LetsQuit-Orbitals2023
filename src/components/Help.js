import {Container, CssBaseline, Stack, Button, Typography, AppBar, Toolbar} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

export default function Help () {

const navigate = useNavigate();
const goHome = () => {
    navigate("/Home");
}

const goShop = () => {
    navigate("/Shop");
}

const goSocial = () => {
  navigate("/Social");
 }
 
const goHelp = () => {
    navigate("/Help")
 }

const theme = createTheme({
       palette: {
         background: {
           default: "#d3dff0"
           }
}
});
    
return ( 
    <ThemeProvider theme = {theme}>
        <CssBaseline>
        <AppBar>
        <Toolbar>
          <Stack direction="row" gap= {1} sx={{ flexGrow: 1 }}>
            <Typography variant="h3" component="div" marginRight={3}>
              <strong>LetsQuit</strong>
            </Typography>
            <Button color = "warning" variant = "contained" size = "small" onClick ={goHome}>
              Home
            </Button>
            <Button color = "success" variant = "contained" size = "small" onClick ={goShop}>
              Shop
            </Button>
            <Button color = "secondary" variant = "contained" size = "small" onClick ={goSocial}>
              Social
            </Button>
            <Button color = "error" variant = "contained" size = "small" onClick ={goHelp}>
              Help
            </Button>
            </Stack>
        </Toolbar>
      </AppBar>
        <Container maxWidth = "xl">   
        </Container>
        </CssBaseline>
    </ThemeProvider>
);
}
