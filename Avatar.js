import {useState} from "react";
import {Stack, Box} from '@mui/material';
import {db} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";

// file displays user's current avatar and pets(if any)
export default function Avatar({email_shop}) {

  const [userShop,setUserShop] = useState({});
  //snapshots the collection of user shop purchases info
  const shopDocRef = doc(db, "user_shop", email_shop)
    onSnapshot(shopDocRef, (doc) => {
      setUserShop({email_shop,...doc.data()})
   })

    return (
        <Stack direction = "row">
        <Box sx={{width: 350, height: 300, backgroundColor: 'white', border: 2, borderColor: 'primary.main'}}>
        <img 
        src= {userShop.equipItem} //equipItem is user's current avatar form
        width={350} height={300} alt= ""/>
        </Box>
        </Stack>
    );
}