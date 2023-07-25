import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function InputName({ email_info }) {
  // eslint-disable-next-line
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // eslint-disable-next-line
  const [name, setName] = useState("Quitter");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleNameChangeClick = () => {
    const newName = prompt("What's your name?");
    if (newName === null || newName.length === 0) {
      setError(true);
    } else {
      setError(false);
      setName(newName);
      updateDoc(doc(db, "user_info", email_info), { name: newName });
    }
  };

  const docRef = doc(db, "user_info", email_info);

  onSnapshot(docRef, (doc) => {
    setUser({ email_info, ...doc.data() });
  });

  const goShop = () => {
    navigate("/Shop");
  };

  const goHome = () => {
    navigate("/Home");
  };

  const goSocial = () => {
    navigate("/Social");
  };

  const goProfile = () => {
    navigate("/Profile");
  };

  const goHelp = () => {
    navigate("/Help");
  };

  const goInventory = () => {
    navigate("/Inventory");
  };

  return (
    <header>
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

          {error ? (
            <Dialog
              open={error}
              onClose={error}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>
                <Alert severity="error">
                  {" "}
                  <AlertTitle>
                    <strong>Error</strong>
                  </AlertTitle>
                  <strong>Your Name cannot be empty! </strong>
                </Alert>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please tell us your name fellow Quitter!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleNameChangeClick}> Agree </Button>
              </DialogActions>
            </Dialog>
          ) : (
            <Stack spacing={2} direction="row">
              <Typography variant="h5"> Welcome back, {user.name} </Typography>
              <Button variant="contained" onClick={handleClick}>
                {" "}
                <AccountCircleIcon fontSize="medium" />{" "}
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={goProfile}>Profile</MenuItem>
                <MenuItem onClick={handleNameChangeClick}>
                  {" "}
                  Change Name{" "}
                </MenuItem>
                <MenuItem onClick={userSignOut}>Logout</MenuItem>
              </Menu>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
}
