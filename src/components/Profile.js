import {
  Container,
  CssBaseline,
  Stack,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

//file displays basic infomation of the user's account
export default function Profile() {
  const email_info = auth.currentUser?.email + "_info";
  const email_shop = auth.currentUser?.email + "_shop";
  const [user, setUser] = useState({});
  const docRef = doc(db, "user_info", email_info);

  onSnapshot(docRef, (doc) => {
    setUser({ email_info, ...doc.data() });
  });

  const [userShop, setUserShop] = useState({});
  //snapshots the collection of user shop purchases info
  const shopDocRef = doc(db, "user_shop", email_shop);
  onSnapshot(shopDocRef, (doc) => {
    setUserShop({ email_shop, ...doc.data() });
  });

  const navigate = useNavigate();
  const goHome = () => {
    navigate("/Home");
  };
  const goShop = () => {
    navigate("/Shop");
  };
  const goSocial = () => {
    navigate("/Social");
  };

  const goHelp = () => {
    navigate("/Help");
  };

  const goInventory = () => {
    navigate("/Inventory");
  };

  const theme = createTheme({
    palette: {
      background: {
        default: "#d3dff0",
      },
    },
  });

  const [show, setShow] = useState(false);
  const handleRevealOnClick = () => {
    setShow(true);
  };
  const handleHideOnClick = () => {
    setShow(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar>
          <Toolbar>
            <Stack direction="row" gap={1} sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="div" marginRight={3}>
                <strong>LetsQuit</strong>
              </Typography>
              <Button
                color="warning"
                variant="contained"
                size="small"
                onClick={goHome}
              >
                Home
              </Button>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={goShop}
              >
                Shop
              </Button>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={goSocial}
              >
                Social
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={goInventory}
              >
                Inventory
              </Button>
              <Button
                color="error"
                variant="contained"
                size="small"
                onClick={goHelp}
              >
                Help
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl">
          <Stack marginTop={12} direction="column" gap={2}>
            <Typography
              color={"primary"}
              variant="h4"
              sx={{ textAlign: "left" }}
            >
              {" "}
              <strong>
                <u> Profile </u>
              </strong>{" "}
            </Typography>
            <Box
              sx={{
                width: 300,
                height: 250,
                backgroundColor: "white",
                border: 2,
                borderColor: "primary.main",
              }}
            >
              <img src={userShop.equipItem} width={300} height={250} alt="" />
            </Box>
            <Typography>
              {" "}
              <strong>Name:</strong> {user.name}{" "}
            </Typography>
            <Typography>
              {" "}
              <strong>Email:</strong> {user.email}{" "}
            </Typography>
            <Typography>
              {" "}
              <strong>Level:</strong> {user.level}{" "}
            </Typography>
            <Typography>
              {" "}
              <strong>Addiction:</strong> {user.addiction}{" "}
            </Typography>
            {show ? (
              <Stack direction="row>" gap={2}>
                <Typography>
                  {" "}
                  <strong>Password:</strong> {user.password}{" "}
                </Typography>
                <Button onClick={handleHideOnClick} variant="contained">
                  {" "}
                  Hide password{" "}
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" gap={2}>
                <Typography>
                  {" "}
                  <strong>Password:</strong>{" "}
                </Typography>
                <Button onClick={handleRevealOnClick} variant="contained">
                  {" "}
                  Reveal password{" "}
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
