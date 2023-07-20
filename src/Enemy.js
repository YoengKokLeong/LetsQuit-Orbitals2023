import {useState} from "react";
import {Box, Stack,Typography} from '@mui/material';
import goblin_boss from "../images/goblin_boss.webp"
import enemy_hp from "../images/enemy_hp.gif"
import {db} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";

export default function Enemy({email_info}) {
    const [user,setUser] = useState({});
    const docRef = doc(db, "user_info", email_info)
 
    onSnapshot(docRef, (doc) => {
      setUser({email_info,...doc.data()})
   })

    return (
        <Stack direction ="row" gap={2}>
        <Stack>
        <Typography variant = "h5" textAlign={"right"}> <strong><u> Goblin Addict Boss</u></strong></Typography>
        <Typography variant = "h5" textAlign={"right"}><strong> Lv: {user.enemy_lev}</strong></Typography>
        <Typography variant = "h5" textAlign={"right"}><img src= {enemy_hp} width={50} height={40} alt= ""/><strong>{user.enemy_hp}</strong></Typography>
        </Stack>
        <Box sx={{width: 350, height: 300, backgroundColor: 'white', border: 2, borderColor: 'primary.main'}}>
        <img src= {goblin_boss} width={350} height={300} alt= ""/>
        </Box>
        </Stack>
    );
}
