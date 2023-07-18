import {AppBar, Toolbar, Typography, Button, Stack, Container, Box, CssBaseline, Popover} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import wooden_sword from "../images/wooden_sword.webp"
import knight_sword from "../images/katana_sword.webp"
import laser_sword from "../images/laser_sword.webp"
import Pet_Buddy from "../images/Pet_Buddy.webp"
import Pet_Chilly from "../images/Pet_Chilly.webp"
import Pet_Blue from "../images/Pet_Blue.webp"
import Pet_Hamm from "../images/Pet_Hamm.webp"
import coinss from "../images/coinss.gif"
import attack from "../images/attack.png"
import Npc_trader from "../images/Npc_scamer.webp"
import coming_soon from "../images/coming_soon.png"
import {db} from "../firebase";
import {doc, onSnapshot, updateDoc} from "firebase/firestore";
import {useState} from "react";
import {auth} from '../firebase';

const theme = createTheme({
  palette: {
      background: {
          default: "#d3dff0"
      }
}
});

export default function Shop() {
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
 const email_info = auth.currentUser?.email + "_info";
 const email_shop = auth.currentUser?.email + "_shop";
 const [user,setUser] = useState({});

 const docRef = doc(db, "user_info", email_info)
 onSnapshot(docRef, (doc) => {
   setUser({email_info,...doc.data()})
})

const [userShop,setUserShop] = useState({});
const shopDocRef = doc(db, "user_shop", email_shop)
  onSnapshot(shopDocRef, (doc) => {
    setUserShop({email_shop,...doc.data()})
 })

 const woodenSwordBuy = () => {
  updateDoc(doc(db, "user_info", email_info), {coin: user.coin - 20, atk_dmg: user.atk_dmg + 2});
  updateDoc(doc(db, "user_shop", email_shop), {item1: true});
 }
 const knightSwordBuy = () => {
  updateDoc(doc(db, "user_info", email_info), {coin: user.coin - 50, atk_dmg: user.atk_dmg -2 + 8});
  updateDoc(doc(db, "user_shop", email_shop), {item2: true,
  equipItem: "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2Fweapons%2Fkatana_sword_knight.jpg?alt=media&token=ba159f7d-4088-4556-950a-bf6dd616ab63"});
 }
 const laserSwordBuy = () => {
  updateDoc(doc(db, "user_info", email_info), {coin: user.coin - 100, atk_dmg: user.atk_dmg -8 +15});
  updateDoc(doc(db, "user_shop", email_shop), {item3: true, 
  equipItem: "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2Fweapons%2Flaser_sword_knight.jpg?alt=media&token=cea60f6f-8741-4f58-b1e2-2ab9d13997b1"});
 }
 const buddyBuy = () => {
  updateDoc(doc(db, "user_info", email_info), {coin: user.coin - 10, atk_dmg: user.atk_dmg +2});
  updateDoc(doc(db, "user_shop", email_shop), {pet1: true,
  equipPet: "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Buddy.webp?alt=media&token=e938505e-cdbf-4d1a-bf01-69c46a14234b"});
 }
 const chillyBuy = () => {
  updateDoc(doc(db, "user_info", email_info), {coin: user.coin - 20, atk_dmg: user.atk_dmg -2 +4});
  updateDoc(doc(db, "user_shop", email_shop), {pet2: true,
  equipPet: "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Chilly.webp?alt=media&token=101c5141-17a3-456a-bcab-d02b7f3e691d"});
 }
 const hammBuy = () => {
  updateDoc(doc(db, "user_info", email_info), {coin: user.coin - 40, atk_dmg: user.atk_dmg -4 +8});
  updateDoc(doc(db, "user_shop", email_shop), {pet3: true,
  equipPet: "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Hamm.webp?alt=media&token=d86ee791-cd19-4693-924a-a4ac5500fe2e"});
 }
 const blueBuy = () => {
  updateDoc(doc(db, "user_info", email_info), {coin: user.coin - 100, atk_dmg: user.atk_dmg -8 +15});
  updateDoc(doc(db, "user_shop", email_shop), {pet4: true,
  equipPet: "https://firebasestorage.googleapis.com/v0/b/letsquit-1b913.appspot.com/o/images%2FPet%2FPet_Blue.webp?alt=media&token=1dc1d5e4-a3de-470c-9e20-3312805e1c88"});
 }

 const [anchorEl, setAnchorEl] = useState(null); //Wooden Sword popover
 const open = Boolean(anchorEl);
 const handlePopoverOpen = (event) => {setAnchorEl(event.currentTarget);};
 const handlePopoverClose = () => {setAnchorEl(null);};
 
 const [anchorEl1, setAnchorEl1] = useState(null); //Katana sword popover
 const open1 = Boolean(anchorEl1);
 const handlePopoverOpen1 = (event) => {setAnchorEl1(event.currentTarget);};
 const handlePopoverClose1 = () => {setAnchorEl1(null);};

 const [anchorEl2, setAnchorEl2] = useState(null); //Laser Sword popover
 const open2 = Boolean(anchorEl2);
 const handlePopoverOpen2 = (event) => {setAnchorEl2(event.currentTarget);};
 const handlePopoverClose2 = () => {setAnchorEl2(null);};

 const [anchorEl3, setAnchorEl3] = useState(null); //Buddy popover
 const open3 = Boolean(anchorEl3);
 const handlePopoverOpen3 = (event) => {setAnchorEl3(event.currentTarget);};
 const handlePopoverClose3 = () => {setAnchorEl3(null);};

 const [anchorEl4, setAnchorEl4] = useState(null); //Chilly popover
 const open4 = Boolean(anchorEl4);
 const handlePopoverOpen4 = (event) => {setAnchorEl4(event.currentTarget);};
 const handlePopoverClose4 = () => {setAnchorEl4(null);};

 const [anchorEl5, setAnchorEl5] = useState(null); //Hamm popover
 const open5 = Boolean(anchorEl5);
 const handlePopoverOpen5 = (event) => {setAnchorEl5(event.currentTarget);};
 const handlePopoverClose5 = () => {setAnchorEl5(null);};

 const [anchorEl6, setAnchorEl6] = useState(null); //Blue popover
 const open6 = Boolean(anchorEl6);
 const handlePopoverOpen6 = (event) => {setAnchorEl6(event.currentTarget);};
 const handlePopoverClose6 = () => {setAnchorEl6(null);};

return(
    <ThemeProvider theme={theme}>
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
      <Typography marginTop={8} variant = "h3"> <strong> Shop </strong></Typography>
      <Stack direction = "row">
      <Stack  direction = "row" gap ={2} flexGrow={1}>
      <Box sx={{width: 350, height: 300, backgroundColor: 'white', border: 2, borderColor: 'primary.main'}}>
        <img src= {userShop.equipItem} width={350} height={300} alt= ""/>
      </Box>
      <Stack direction = "column">
      <Typography variant = "h5"> <strong><u> {user.name}</u> </strong></Typography>
      <Typography variant = "h5"> <img src= {coinss} width={35} height={35} alt= ""/> <strong> {user.coin} </strong>  </Typography>
      <Typography variant ="h5"> <img src= {attack} width={40} height={40} alt= ""/><strong> {user.atk_dmg} </strong></Typography>
      <Box marginTop = {9} sx={{width: 105, height: 105, border: 2, borderColor: 'primary.main'}}>
      <img src= {userShop.equipPet} width={105} height={105} alt= ""/>
      </Box>
      </Stack>
      </Stack>
      <Stack direction = "column">
      <img src= {Npc_trader} width={350} height={300} alt= ""/>
      <Typography sx={{ textAlign: 'center', m: 1 }}><strong>NPC Trader</strong></Typography>
      </Stack>
      </Stack>
      
      <Box sx ={{border: 2, borderColor: 'primary.main', p: 2, backgroundColor: "white"}}>
      <Typography variant = "h4"> Items </Typography>
      <Stack direction = "row" marginTop={2} flexWrap={'wrap'} gap ={4}>
        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}} 
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
        <img src= {wooden_sword} width={100} height={100} alt= ""/>
        </Box>
        <Popover id="mouse-over-popover"
        sx={{ pointerEvents: 'none',}} 
        open={open} 
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Stack>
        <Typography sx={{ p: 1, textAlign: 'center'}}> <strong><u>Wooden Sword</u></strong>  :20 <img src= {coinss} width={20} height={20} alt= ""/></Typography>
        <Typography sx={{ p: 1 }}> Just your regular sturdy training sword </Typography>
        <Typography sx={{ p: 1, textAlign: 'center'}}> +2 <img src= {attack} width={25} height={25} alt= ""/></Typography>
        </Stack>
        </Popover>
        {userShop.item1 ?
        <Button variant = "contained" size = "small" color = "success"> Purchased </Button>
        :
        <Button variant = "contained" size = "small" color = "warning" onClick = {woodenSwordBuy}> Buy </Button>
        }
        </Stack>

        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}
        aria-owns={open1 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen1}
        onMouseLeave={handlePopoverClose1}>
        <img src= {knight_sword} width={100} height={100} alt= ""/>
        </Box>
        <Popover id="mouse-over-popover"
        sx={{ pointerEvents: 'none',}} 
        open={open1} 
        anchorEl={anchorEl1}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
        onClose={handlePopoverClose1}
        disableRestoreFocus>
        <Stack>
        <Typography sx={{ p: 1, textAlign: 'center'}}> <strong><u>Blue Katana Sword</u></strong>  :50 <img src= {coinss} width={20} height={20} alt= ""/></Typography>
        <Typography sx={{ p: 1 }}> A symbol of strength, power and courage to defeat your addictions! </Typography>
        <Typography sx={{ p: 1, textAlign: 'center'}}> +8 <img src= {attack} width={25} height={25} alt= ""/></Typography>
        </Stack>
        </Popover>
        {userShop.item2 ?
        <Button variant = "contained" size = "small" color = "success"> Purchased </Button>
        :
        <Button variant = "contained" size = "small" color = "warning" onClick = {knightSwordBuy}> Buy </Button>
        }
        </Stack>

        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}
        aria-owns={open2 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen2}
        onMouseLeave={handlePopoverClose2}>
        <img src= {laser_sword} width={100} height={100} alt= ""/>
        </Box>
        <Popover id="mouse-over-popover"
        sx={{ pointerEvents: 'none',}} 
        open={open2} 
        anchorEl={anchorEl2}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
        onClose={handlePopoverClose2}
        disableRestoreFocus>
        <Stack>
        <Typography sx={{ p: 1, textAlign: 'center'}}> <strong><u>Lightsaber</u></strong>  :100 <img src= {coinss} width={20} height={20} alt= ""/></Typography>
        <Typography sx={{ p: 1 }}> May the force be with you in overcoming your addiction.. </Typography>
        <Typography sx={{ p: 1, textAlign: 'center'}}> +15 <img src= {attack} width={25} height={25} alt= ""/></Typography>
        </Stack>
        </Popover>
        {userShop.item3 ?
        <Button variant = "contained" size = "small" color = "success"> Purchased </Button>
        :
        <Button variant = "contained" size = "small" color = "warning" onClick = {laserSwordBuy}> Buy </Button>
        }
        </Stack>

        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}>
        <img src= {coming_soon} width={100} height={100} alt= ""/>
        </Box>
        <Button variant = "contained" size = "small" color = "warning"> Buy </Button>
        </Stack>

        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}>
        <img src= {coming_soon} width={100} height={100} alt= ""/>
        </Box>
        <Button variant = "contained" size = "small" color = "warning"> Buy </Button>
        </Stack>
      </Stack>
      </Box>

      <Box marginTop={2} sx ={{border: 2, borderColor: 'primary.main', p: 2, backgroundColor: "white"}}>
      <Typography variant = "h4"> Pets </Typography>
      <Stack direction = "row" marginTop={2} flexWrap={'wrap'} gap ={4}>
        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}
        aria-owns={open3 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen3}
        onMouseLeave={handlePopoverClose3}>
        <img src= {Pet_Buddy} width={100} height={100} alt= ""/>
        </Box>
        <Popover id="mouse-over-popover"
        sx={{ pointerEvents: 'none',}} 
        open={open3} 
        anchorEl={anchorEl3}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
        onClose={handlePopoverClose3}
        disableRestoreFocus>
        <Stack>
        <Typography sx={{ p: 1, textAlign: 'center'}}> <strong><u>Buddy</u></strong>  :10 <img src= {coinss} width={20} height={20} alt= ""/></Typography>
        <Typography sx={{ p: 1 }}> Man's best friend. No feeding required. </Typography>
        <Typography sx={{ p: 1, textAlign: 'center'}}> +2 <img src= {attack} width={25} height={25} alt= ""/></Typography>
        </Stack>
        </Popover>
        {userShop.pet1 ?
        <Button variant = "contained" size = "small" color = "success"> Purchased </Button>
        :
        <Button variant = "contained" size = "small" color = "warning" onClick = {buddyBuy}> Buy </Button>
        }
        </Stack>

        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}
        aria-owns={open4 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen4}
        onMouseLeave={handlePopoverClose4}>
        <img src= {Pet_Chilly} width={100} height={100} alt= ""/>
        </Box>
        <Popover id="mouse-over-popover"
        sx={{ pointerEvents: 'none',}} 
        open={open4} 
        anchorEl={anchorEl4}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
        onClose={handlePopoverClose4}
        disableRestoreFocus>
        <Stack>
        <Typography sx={{ p: 1, textAlign: 'center'}}> <strong><u>Chilly</u></strong>  :20 <img src= {coinss} width={20} height={20} alt= ""/></Typography>
        <Typography sx={{ p: 1 }}> Best friends with Nyan Cat </Typography>
        <Typography sx={{ p: 1, textAlign: 'center'}}> +4 <img src= {attack} width={25} height={25} alt= ""/></Typography>
        </Stack>
        </Popover>
        {userShop.pet2 ?
        <Button variant = "contained" size = "small" color = "success"> Purchased </Button>
        :
        <Button variant = "contained" size = "small" color = "warning" onClick = {chillyBuy}> Buy </Button>
        }
        </Stack>

        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}
        aria-owns={open5 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen5}
        onMouseLeave={handlePopoverClose5}>
        <img src= {Pet_Hamm} width={100} height={100} alt= ""/>
        </Box>
        <Popover id="mouse-over-popover"
        sx={{ pointerEvents: 'none',}} 
        open={open5} 
        anchorEl={anchorEl5}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
        onClose={handlePopoverClose5}
        disableRestoreFocus>
        <Stack>
        <Typography sx={{ p: 1, textAlign: 'center'}}> <strong><u>Hamm</u></strong>  :40 <img src= {coinss} width={20} height={20} alt= ""/></Typography>
        <Typography sx={{ p: 1 }}> Name is Hamm, taste like Ham. Distant cousin of Peppa Pig </Typography>
        <Typography sx={{ p: 1, textAlign: 'center'}}> +8 <img src= {attack} width={25} height={25} alt= ""/></Typography>
        </Stack>
        </Popover>
        {userShop.pet3 ?
        <Button variant = "contained" size = "small" color = "success"> Purchased </Button>
        :
        <Button variant = "contained" size = "small" color = "warning" onClick = {hammBuy}> Buy </Button>
        }
        </Stack>

        <Stack direction = "column">
        <Box sx={{width: 100, height: 100, border: 2, borderColor: 'primary.main'}}
        aria-owns={open6 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen6}
        onMouseLeave={handlePopoverClose6}>
        <img src= {Pet_Blue} width={100} height={100} alt= ""/>
        </Box>
        <Popover id="mouse-over-popover"
        sx={{ pointerEvents: 'none',}} 
        open={open6} 
        anchorEl={anchorEl6}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
        onClose={handlePopoverClose6}
        disableRestoreFocus>
        <Stack>
        <Typography sx={{ p: 1, textAlign: 'center'}}> <strong><u>Blue</u></strong> :100 <img src= {coinss} width={20} height={20} alt= ""/></Typography>
        <Typography sx={{ p: 1 }}> Doesn't eat, doesn't talk. Rumored to taste like Marigold's Jelly pudding. </Typography>
        <Typography sx={{ p: 1, textAlign: 'center'}}> +15 <img src= {attack} width={25} height={25} alt= ""/></Typography>
        </Stack>
        </Popover>
        {userShop.pet4 ?
        <Button variant = "contained" size = "small" color = "success"> Purchased </Button>
        :
        <Button variant = "contained" size = "small" color = "warning" onClick = {blueBuy}> Buy </Button>
        }
        </Stack>

      </Stack>
      </Box>
      </Container>
      </CssBaseline>
    </ThemeProvider>
);
}
