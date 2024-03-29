import {
  Typography,
  Button,
  Stack,
  Box,
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { db } from "../firebase";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import pixel_scroll from "../images/pixel_scroll.png";

export default function StreakManager({ email }) {
  const [user, setUser] = useState({});
  const [emails, setEmails] = useState([]);
  const [goodOpen, setGoodOpen] = useState(false);
  const [badOpen, setBadOpen] = useState(false);
  const [bossOpen, setBossOpen] = useState(false);
  const email_date = email + "_date"; //Collection naming convention for the user's collection of good and bad date documents
  const email_info = email + "_info"; //Document id naming convention for the user's document of info
  const dateCollectionRef = collection(db, email_date);
  var today = new Date();
  const [error, setError] = useState(false);

  //function called upon by checking in. User gets rewarded with 1 coin and gains 1 exp.
  //if exp hits 7, user levels up and earns 2 bonus coins.
  const createGoodDate = async () => {
    if (
      user.today_date ===
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ) {
      setError(true);
    } else {
      setGoodOpen(true);
      //await addDoc(dateCollectionRef, {goodDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(), badDate: "-"})
      await updateDoc(doc(db, "user_info", email_info), {
        exp: user.exp + 1,
        coin: user.coin + 1,
        checkin_streak: user.checkin_streak + 1,
        today_date:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate(),
      });
      if (user.exp === 6) {
        updateDoc(doc(db, "user_info", email_info), {
          exp: 0,
          level: user.level + 1,
          coin: user.coin + 2,
          atk_dmg: user.atk_dmg + 1,
        });
      }
    }
  };

  //function called upon when user confesses a relapse. User loses 4 coins and all current exp.
  //a document of badDate will be added.
  const createBadDate = async () => {
    if (
      user.today_date ===
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    ) {
      setError(true);
    } else {
      setBadOpen(true);
      await addDoc(dateCollectionRef, {
        badDate:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate(),
      });
      await updateDoc(doc(db, "user_info", email_info), {
        exp: 0,
        coin: user.coin - 4,
        today_date:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate(),
        checkin_streak: 0,
        relapsed_count: user.relapsed_count + 1,
      });
    }
  };

  //Fetches collection of dates in real time from Firestore Database
  useEffect(() => {
    const getEmails = async () => {
      const colRef = query(dateCollectionRef);
      onSnapshot(colRef, (snapshot) => {
        setEmails(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.email_date }))
        );
      });
    };

    getEmails();
    // eslint-disable-next-line
  }, []);

  //Fetches a single document of specified id in real time from Firestore Database
  //snapshots the user's info document that includes coin, exp and level
  const docRef = doc(db, "user_info", email_info);
  onSnapshot(docRef, (doc) => {
    setUser({ email_info, ...doc.data() });
  });

  const handleGoodDialogClose = async () => {
    setGoodOpen(false);
    await updateDoc(doc(db, "user_info", email_info), {
      enemy_hp: user.enemy_hp - user.atk_dmg,
    });
    if (user.enemy_hp <= user.atk_dmg) {
      updateDoc(doc(db, "user_info", email_info), {
        enemy_lev: user.enemy_lev + 1,
        enemy_hp: user.enemy_hp + user.level * 10,
        coin: user.coin + 10,
      });
      setBossOpen(true);
    }
  };

  const handleBadDialogClose = () => {
    setBadOpen(false);
  };

  const handleBossDialogClose = () => {
    setBossOpen(false);
  };

  //Closes dialog for error when checking in more than once a day
  const handleErrorDialogClose = () => {
    setError(false);
  };
  return (
    <main>
      <Stack marginTop={2} direction="row">
        <Stack direction="row" flexGrow={1}>
          <Box
            sx={{
              height: 370,
              border: 2,
              borderColor: "primary.main",
              p: 2,
              backgroundColor: "white",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Box>
          <Stack>
            <Box
              sx={{
                border: 2,
                borderColor: "error.main",
                p: 2,
                backgroundColor: "white",
              }}
            >
              <Typography variant="h6">
                {" "}
                <strong>Relapsed history</strong>
              </Typography>
            </Box>
            {emails.map((email_date) => {
              return (
                <div>
                  <Box
                    sx={{
                      border: 2,
                      borderColor: "error.main",
                      p: 2,
                      backgroundColor: "white",
                    }}
                  >
                    <Typography>
                      {" "}
                      <strong>Date: </strong> {email_date.badDate}{" "}
                    </Typography>
                  </Box>
                </div>
              );
            })}
          </Stack>
          <Stack gap={1}>
            <Button
              color="success"
              size="large"
              variant="contained"
              type="submit"
              onClick={createGoodDate}
            >
              {" "}
              Check in today!{" "}
            </Button>
            <Button
              color="error"
              size="large"
              variant="contained"
              type="submit"
              onClick={createBadDate}
            >
              {" "}
              Relapsed today..{" "}
            </Button>
          </Stack>
        </Stack>
        <Stack>
          <Box
            sx={{
              display: "flex",
              height: 370,
              width: 350,
              p: 1,
              backgroundImage: `url(${pixel_scroll})`,
              backgroundSize: "cover",
            }}
          >
            <Box m="auto">
              <Typography sx={{ textAlign: "center" }}>
                <strong>Check in streak:{user.checkin_streak}</strong>
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                <strong>Relapsed count:{user.relapsed_count} </strong>
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>

      <Dialog
        open={goodOpen}
        keepMounted
        onClose={handleGoodDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Alert severity="success">
            {" "}
            <AlertTitle>
              <strong>Great job Quitter!</strong>
            </AlertTitle>
            <strong>
              {" "}
              You are one step closer to overcoming {user.addiction}!{" "}
            </strong>
          </Alert>{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your bravery has weakened and hurt the Goblin Addict Boss! You are{" "}
            {7 - user.exp} day(s) away from <strong>Bonus</strong> rewards :D
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleGoodDialogClose}
          >
            {" "}
            woohoo!!{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={badOpen}
        keepMounted
        onClose={handleBadDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Alert severity="error">
            {" "}
            <AlertTitle>
              <strong>
                Oh no! You have went back to your old roots Quitter!
              </strong>{" "}
            </AlertTitle>
            <strong>
              {" "}
              {user.addiction} requires better discipline to overcome. Don't
              give up!{" "}
            </strong>
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The goblins looted 4 coins from you and you lost Xp while you were
            away...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleBadDialogClose}
          >
            {" "}
            We will do better!{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={bossOpen}
        keepMounted
        onClose={handleBossDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Alert severity="warning">
            {" "}
            <AlertTitle>
              <strong>
                Great job! The Goblin Addict Boss has been defeated!{" "}
              </strong>{" "}
            </AlertTitle>
            <strong>
              {" "}
              However...the fight is not won yet, a stronger foe has took over
              the fallen goblin boss.{" "}
            </strong>
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You looted<strong> 10 coins</strong> from the fallen boss.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            onClick={handleBossDialogClose}
          >
            {" "}
            Let go!{" "}
          </Button>
        </DialogActions>
      </Dialog>

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
              <strong>You have already checked in for today!</strong>{" "}
            </AlertTitle>
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Check back in tomorrow Quitter
          </DialogContentText>
        </DialogContent>
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
    </main>
  );
}
