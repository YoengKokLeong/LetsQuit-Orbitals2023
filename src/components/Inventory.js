import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Box,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { auth } from "../firebase";
import wooden_sword from "../images/wooden_sword.webp";
import knight_sword from "../images/katana_sword.webp";
import laser_sword from "../images/laser_sword.webp";
import Pet_Buddy from "../images/Pet_Buddy.webp";
import Pet_Chilly from "../images/Pet_Chilly.webp";
import Pet_Blue from "../images/Pet_Blue.webp";
import Pet_Hamm from "../images/Pet_Hamm.webp";
import QuestionMark from "../images/QuestionMark.gif";
import grass_bg from "../images/grass_bg.jpg";

const theme = createTheme({
  palette: {
    background: {
      default: "#d3dff0",
    },
  },
});

export default function Inventory() {
  const email_shop = auth.currentUser?.email + "_shop";

  const [userShop, setUserShop] = useState({});
  const shopDocRef = doc(db, "user_shop", email_shop);
  onSnapshot(shopDocRef, (doc) => {
    setUserShop({ email_shop, ...doc.data() });
  });

  const navigate = useNavigate();
  const goShop = () => {
    navigate("/Shop");
  };

  const goHome = () => {
    navigate("/Home");
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

  //Functions called by buttons to equip relevant equipment
  const equipWoodenSword = () => {
    updateDoc(doc(db, "user_shop", email_shop), {
      equipItem:
        "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2Fweapons%2Fwooden_sword_new.jpg?alt=media&token=aa795b87-3a02-4621-9cd2-4f8524be0d5b",
    });
  };

  const equipKnightSword = () => {
    updateDoc(doc(db, "user_shop", email_shop), {
      equipItem:
        "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2Fweapons%2Fkatana_sword_new.jpg?alt=media&token=d293f022-2925-4e1c-b405-b84fb1452301",
    });
  };

  const equipLaserSword = () => {
    updateDoc(doc(db, "user_shop", email_shop), {
      equipItem:
        "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2Fweapons%2Flaser_sword_knight.jpg?alt=media&token=cea60f6f-8741-4f58-b1e2-2ab9d13997b1",
    });
  };

  const equipBuddy = () => {
    updateDoc(doc(db, "user_shop", email_shop), {
      equipPet:
        "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Buddy.webp?alt=media&token=e938505e-cdbf-4d1a-bf01-69c46a14234b",
    });
  };

  const equipChilly = () => {
    updateDoc(doc(db, "user_shop", email_shop), {
      equipPet:
        "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Chilly.webp?alt=media&token=101c5141-17a3-456a-bcab-d02b7f3e691d",
    });
  };

  const equipHamm = () => {
    updateDoc(doc(db, "user_shop", email_shop), {
      equipPet:
        "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Hamm.webp?alt=media&token=d86ee791-cd19-4693-924a-a4ac5500fe2e",
    });
  };

  const equipBlue = () => {
    updateDoc(doc(db, "user_shop", email_shop), {
      equipPet:
        "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Blue.webp?alt=media&token=1dc1d5e4-a3de-470c-9e20-3312805e1c88",
    });
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
          <Stack direction="column" marginTop={12} gap={2}>
            <Stack direction="row" gap={2}>
              <Box
                sx={{
                  width: 350,
                  height: 300,
                  backgroundColor: "white",
                  border: 2,
                  borderColor: "primary.main",
                }}
              >
                <img src={userShop.equipItem} width={350} height={300} alt="" />
              </Box>
              <Box
                marginTop={25}
                sx={{
                  width: 105,
                  height: 105,
                  border: 2,
                  borderColor: "primary.main",
                  backgroundImage: `url(${grass_bg})`,
                  backgroundSize: "cover",
                }}
              >
                <img src={userShop.equipPet} width={105} height={105} alt="" />
              </Box>
            </Stack>

            <Box
              sx={{
                border: 2,
                borderColor: "primary.main",
                p: 2,
                backgroundColor: "white",
              }}
            >
              <Typography variant="h5"> Items inventory</Typography>
              <Stack direction="row" marginTop={2} flexWrap={"wrap"} gap={4}>
                {userShop.item1 ? (
                  <Stack direction="column">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <img src={wooden_sword} width={100} height={100} alt="" />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={equipWoodenSword}
                    >
                      {" "}
                      Equip{" "}
                    </Button>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <img src={QuestionMark} width={100} height={100} alt="" />
                  </Box>
                )}

                {userShop.item2 ? (
                  <Stack direction="column">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <img src={knight_sword} width={100} height={100} alt="" />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={equipKnightSword}
                    >
                      {" "}
                      Equip{" "}
                    </Button>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <img src={QuestionMark} width={100} height={100} alt="" />
                  </Box>
                )}

                {userShop.item3 ? (
                  <Stack direction="column">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <img src={laser_sword} width={100} height={100} alt="" />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={equipLaserSword}
                    >
                      {" "}
                      Equip{" "}
                    </Button>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <img src={QuestionMark} width={100} height={100} alt="" />
                  </Box>
                )}
              </Stack>
            </Box>

            <Box
              sx={{
                border: 2,
                borderColor: "primary.main",
                p: 2,
                backgroundColor: "white",
              }}
            >
              <Typography variant="h5"> Pets owned </Typography>
              <Stack direction="row" marginTop={2} flexWrap={"wrap"} gap={4}>
                {userShop.pet1 ? (
                  <Stack direction="column">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <img src={Pet_Buddy} width={100} height={100} alt="" />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={equipBuddy}
                    >
                      {" "}
                      Equip{" "}
                    </Button>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <img src={QuestionMark} width={100} height={100} alt="" />
                  </Box>
                )}

                {userShop.pet2 ? (
                  <Stack direction="column">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <img src={Pet_Chilly} width={100} height={100} alt="" />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={equipChilly}
                    >
                      {" "}
                      Equip{" "}
                    </Button>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <img src={QuestionMark} width={100} height={100} alt="" />
                  </Box>
                )}

                {userShop.pet3 ? (
                  <Stack direction="column">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <img src={Pet_Hamm} width={100} height={100} alt="" />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={equipHamm}
                    >
                      {" "}
                      Equip{" "}
                    </Button>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <img src={QuestionMark} width={100} height={100} alt="" />
                  </Box>
                )}

                {userShop.pet4 ? (
                  <Stack direction="column">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: 2,
                        borderColor: "primary.main",
                      }}
                    >
                      <img src={Pet_Blue} width={100} height={100} alt="" />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={equipBlue}
                    >
                      {" "}
                      Equip{" "}
                    </Button>
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <img src={QuestionMark} width={100} height={100} alt="" />
                  </Box>
                )}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
