import {useState} from "react";
import {Typography, Button, Stack, Box, Alert, AlertTitle, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle} from "@mui/material";
import {db} from "../firebase";
import {doc, updateDoc, onSnapshot} from "firebase/firestore";

export default function InputAddiction ({email_info}){
  // eslint-disable-next-line
    const [addiction, setAddiction] = useState("an addiction!");
    const [error, setError] = useState(false);
    const [user,setUser] = useState({});
    

const handleAddictionChangeClick = () => {
  const newAddiction = prompt("What addiction should we overcome?");
  if (newAddiction === null || newAddiction.length === 0) {
    setError(true);
  } else {
    setError(false);
    setAddiction(newAddiction);
    updateDoc(doc(db, "user_info", email_info), {addiction: newAddiction});
  }
};

const docRef = doc(db, "user_info", email_info)
//useEffect(() => {
 //const getUsers = async () => {
    onSnapshot(docRef, (doc) => {
      setUser({email_info,...doc.data()})
   })
// };
  //getUsers();
  // eslint-disable-next-line
 //}, []);

return (
    <header>

        {error?
        <Dialog open = {error} onClose = {error} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle>
          <Alert severity="error"> <AlertTitle><strong>Error</strong></AlertTitle>
          <strong>Your addiction cannot be empty! </strong> 
          </Alert> 
          </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               Please input an addiction you are aiming to quit
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddictionChangeClick}> Agree </Button>
            </DialogActions>
          </Dialog>
        :
        <Box width={400} sx={{border: 2, borderColor: 'primary.main', p: 2, backgroundColor: "white"}}>
        <Stack direction = "row" gap = {2}>
        <Typography> Lets quit <strong>{user.addiction}</strong>! </Typography>
        <Button color="primary" variant="contained" size="small" onClick={handleAddictionChangeClick}> Set new Addiction? </Button>
        </Stack>
        </Box>
        }
        
       
    </header>
);
}
