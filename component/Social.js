import {AppBar, Toolbar, Typography, Button, Stack, Container, Box, TextField, CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {db} from "../firebase";
import {collection, getDocs, addDoc, doc, deleteDoc, updateDoc, query, onSnapshot} from "firebase/firestore";
import {useState, useEffect} from "react";
import globe from "../images/globe.gif"
import Archer from "../images/Archer.gif"

const theme = createTheme({
    palette: {
        background: {
            default: "#d3dff0"
        }
  }
  });

export default function Social() {
const navigate = useNavigate();

//set up react router features to switch pages
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
 //set up two different documents for firestore. One for reporting misuers, one for adivce seekers
 // eslint-disable-next-line
const [reports, setReports] = useState([]);
const reportsCollectionRef = collection(db, "reports");
const [newRptname, setNewRptname] = useState("");

const [users,setUsers] = useState([]);
const usersCollectionRef = collection(db, "users");
const [newName, setNewName] = useState("");
const [newDate, setNewDate] = useState("");
const [newHelp, setNewHelp] = useState("");
const [newReply, setNewReply] = useState("");
const [newSavior, setNewSavior] = useState("");

const createUser =  async () => {
  await addDoc(usersCollectionRef, {name: newName, date: newDate, help: newHelp, reply: newReply, savior: newSavior});
};

const createReport =  async () => {
    await addDoc(reportsCollectionRef, {Rptname: newRptname});
};

const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
}

const updateUser = async (id, reply, savior) => {
    const userDoc = doc(db, "users", id);
    const newFields = {reply: newReply, savior: newSavior}
    await updateDoc(userDoc, newFields);
  };

useEffect(() => {
    const getUsers = async () => {
        const data = query(usersCollectionRef);
        onSnapshot(data, (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })));
      })
    };

    getUsers();
// eslint-disable-next-line
}, []);

useEffect(() => {
    const getReports = async () => {
        const data = await getDocs(reportsCollectionRef);
        setReports(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getReports();
// eslint-disable-next-line
}, []);

return (
    <ThemeProvider theme= {theme}>
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
<Stack marginTop = {10} >
      <Box sx={{border: 2, borderColor: 'primary.main', p: 2, backgroundColor: "white"}}>
        <Stack direction = "column" marginBottom={1}>
            <Typography> <strong>Having difficulties staying on track? Drop your worries below and seek advice from fellow Quitters! </strong> </Typography>
            <TextField size = "small" placeholder = "Name" onChange = {(event) => {setNewName(event.target.value)}} />
            <TextField size = "small"  placeholder = "Date" onChange = {(event) => {setNewDate(event.target.value)}} />
            <TextField size = "small"  placeholder = "What problems are you facing?..." onChange = {(event) => {setNewHelp(event.target.value)}} />
        </Stack>
        <Button size = "small" variant = "contained" onClick = {createUser} > Share</Button>
      </Box> 
      
      <Stack direction = "row" marginTop={4} flexWrap={'wrap'}>
      {users.map((user) => {
            return (
                <div>
                    <Box>
                        <Box sx={{border: 2, borderColor: 'primary.main', p: 2, backgroundColor: "white"}}>
                            <Typography> <strong>Name: </strong> {user.name} </Typography>
                            <Typography> <strong>Date: </strong> {user.date} </Typography>
                            <Typography marginBottom={1}> <strong>Help: </strong> {user.help} </Typography>
                            <Button variant = "contained" color = "warning" size = "small"  onClick = {() => {deleteUser(user.id)}}> Delete entry </Button>
                        </Box>
                        <Box sx={{border: 2, borderColor: 'primary.main', p: 2, backgroundColor: "white"}}>
                            <Typography> <strong>Name: </strong> {user.savior} </Typography>
                            <Typography> <strong>Reply: </strong> {user.reply} </Typography>
                            <Stack direction = "column" marginBottom={1} marginTop={1}>
                                <TextField size = "small" placeholder = "Name..." onChange = {(event) => {setNewSavior(event.target.value)}} />
                                <TextField size = "small" placeholder = "Advice..." onChange = {(event) => {setNewReply(event.target.value)}} />
                            </Stack>
                            <Button variant = "contained" color = "primary" size = "small" onClick = {() => {updateUser(user.id, user.reply, user.savior)}}> Share </Button>   
                        </Box>
                    </Box>
                </div>
            );
        })}
    </Stack>
</Stack>

    <Stack direction = "row" marginTop = {4} flexGrow = {1}>
    <Box sx={{border: 2, borderColor: 'primary.main', p: 2, backgroundColor: "white"}}>
    <TextField size = "small" placeholder = "Name" onChange = {(event) => {setNewRptname(event.target.value)}} />
    <Button variant = "contained" color = "error" size = "small" onClick = {createReport}>
    Report a User
    </Button>
    <Typography> Spot a Quitter misusing the platform, spreading negativity or using abusive language? </Typography>
    <Typography marginBottom={1}> Report the fellow user! Lets keep this platform a safe space for fellow Quitters to achieve their goal!</Typography>
    <img src= {Archer} width={100} height={100} alt= ""/>
    <img src= {globe} width={60} height={60} alt= ""/>
    </Box>
    </Stack>

    </Container>
    </CssBaseline>
    </ThemeProvider>
 );
}
