import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Stack,
  TextField,
  Typography,
  Box,
  Button,
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import Slide1 from "../../images/LetsQuit/Slide1.JPG";
import trial14 from "../../images/trial14.jpg";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const email_info = email + "_info";
  const email_shop = email + "_shop";
  const userInfoCollectionRef = doc(db, "user_info", email_info);
  const userShopCollectionRef = doc(db, "user_shop", email_shop);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        //creates a document of user info on account creation
        setDoc(userInfoCollectionRef, {
          name: email,
          email: email,
          password: password,
          coin: Number(0),
          addiction: "",
          level: Number(1),
          exp: Number(0),
          atk_dmg: Number(1),
          enemy_lev: Number(1),
          enemy_hp: Number(7),
          checkin_streak: Number(0),
          relapsed_count: Number(0),
          today_date: "",
        });
        //creates a document of user shop purchases on account creation
        setDoc(userShopCollectionRef, {
          equipItem:
            "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FMini_Knight_Figure.webp?alt=media&token=c85094bc-dd58-4dbc-a79a-97e6511996da",
          equipPet:
            "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2Fno_pet.avif?alt=media&token=16190947-db11-4f73-8ca1-8440134ffa6d",
          item1: Boolean(false),
          item2: Boolean(false),
          item3: Boolean(false),
          pet1: Boolean(false),
          pet2: Boolean(false),
          pet3: Boolean(false),
          pet4: Boolean(false),
        });
        navigate("/Home");
      })
      .catch((fail) => {
        console.log(fail);
        setError(true);
      });
  };

  const handleErrorDialogClose = () => {
    setError(false);
  };

  return (
    <div
      className="sign-in-container"
      style={{
        backgroundImage: `url(${trial14})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 504,
          height: 530,
          backgroundColor: "white",
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <img
        src={Slide1}
        alt=""
        style={{
          height: 235,
          width: 505,
          position: "absolute",
          left: "50%",
          top: "25%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <form onSubmit={signUp}>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1 }}
          style={{
            position: "absolute",
            left: "43.5%",
            top: "42%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <strong> Create Account </strong>
        </Typography>

        <Stack spacing={1} direction="column" gap={1}>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
            noValidate
            autoComplete="off"
            style={{
              position: "absolute",
              left: "50%",
              top: "48%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <TextField
              size="small"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </Box>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
            noValidate
            autoComplete="off"
            style={{
              position: "absolute",
              left: "50%",
              top: "55%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <TextField
              size="small"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Box>
          <Box
            sx={{ "& button": { m: 1, width: "20ch" } }}
            style={{
              position: "absolute",
              left: "42.5%",
              top: "62%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Button
              type="submit"
              color="success"
              variant="contained"
              size="small"
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </form>
      <p
        style={{
          position: "absolute",
          left: "45.5%",
          top: "67%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Already have an account?
        <Link to="/">
          {" "}
          <strong> Sign in </strong>{" "}
        </Link>
        here.
      </p>

      <Dialog
        open={error}
        keepMounted
        onClose={handleErrorDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Alert severity="error">
            {" "}
            <AlertTitle>
              <strong>Invalid email or password used!</strong>{" "}
            </AlertTitle>
          </Alert>
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleErrorDialogClose}
          >
            {" "}
            Okay{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUp;
