import {useState} from "react";
import {Stack, Typography, LinearProgress, Box} from '@mui/material';
import coinss from "../images/coinss.gif"
import xpp from "../images/xpp.png"
import attack from "../images/attack.png"
import {db} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";

export default function Rewards ({email_info, email_shop}) {
    const [progress, setProgress] = useState(0)
    const [user,setUser] = useState({});
    const docRef = doc(db, "user_info", email_info)
 
    onSnapshot(docRef, (doc) => {
      setUser({email_info,...doc.data()})
      setProgress(user.exp * 14.3)
   })

   const [userShop,setUserShop] = useState({});
   const shopDocRef = doc(db, "user_shop", email_shop)
    onSnapshot(shopDocRef, (doc) => {
    setUserShop({email_shop,...doc.data()})
   })

    return (
        <Stack>
            <Typography variant = "h5"> <strong><u> {user.name}</u> </strong></Typography>
            <Typography variant ="h5"> <img src= {attack} width={40} height={40} alt= ""/><strong> {user.atk_dmg} </strong></Typography>
            <Typography variant = "h5">  <img src= {coinss} width={35} height={35} alt= ""/> <strong> {user.coin}  </strong> </Typography>
            <Typography variant = "h5"> <img src= {xpp} width={37} height={37} alt= ""/> <strong> Lv. {user.level} </strong></Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography> <strong> {user.exp} / 7 </strong></Typography>
            <Box sx={{width: 105, height: 105, border: 2, borderColor: 'primary.main'}}>
            <img src= {userShop.equipPet} width={105} height={105} alt= ""/>
            </Box>
        </Stack>
    )
    ;
};