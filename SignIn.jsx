import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from "react";
import {auth} from '../../firebase';
import {Link, useNavigate} from "react-router-dom";
import {Stack, TextField, Typography, Box, Button} from "@mui/material";
import Slide2 from "../../images/LetsQuit/Slide2.JPG";
import trial12 from "../../images/trial12.jpg";

const SignIn = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            navigate ("/Home");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return(
        <div className = 'sign-in-container'    
            style={{
            backgroundImage: `url(${trial12})`,
            backgroundSize: "cover",
            height: "100vh" }}>
        <Box
            sx={{
            width: 504,
            height: 530,
            backgroundColor: 'white',}} 
            style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '45%',
            transform: 'translate(-50%, -50%)'}}/>
        <img src={Slide2} alt="" 
        style={{height:235,
                width:505, 
                position: 'absolute', 
                left: '50%', 
                top: '25%',
                transform: 'translate(-50%, -50%)'}} />  
            <form onSubmit={signIn}>
            <Typography 
                variant="h5"
                sx={{ flexGrow: 1 }} 
                style={{
                position: 'absolute', 
                left: '45.5%', 
                top: '42%',
                transform: 'translate(-50%, -50%)'}}>
                <strong> Log in to your account </strong>
            </Typography>

            <Stack spacing={1} direction="column" gap= {1}>
                <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '50ch' },}} noValidate autoComplete="off"  
                style={{
                position: 'absolute', 
                left: '50%', 
                top: '48%',
                transform: 'translate(-50%, -50%)'}}>
                    <TextField 
                        size ="small"
                        type="email"
                        placeholder ='Enter your email' 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    ></TextField>
                </Box>

                <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '50ch' },}} noValidate autoComplete="off" 
                    style={{
                    position: 'absolute', 
                    left: '50%', 
                    top: '55%',
                    transform: 'translate(-50%, -50%)'}}>
                    <TextField 
                        size ="small"
                        type="password" 
                        placeholder ='Enter your password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></TextField>
                </Box>
                <Box sx={{ '& button': { m: 1, width: "20ch" } }} 
                style={{
                position: 'absolute', 
                left: '42.5%', 
                top: '62%',
                transform: 'translate(-50%, -50%)'}}>
                    <Button 
                    color = "warning"
                    variant="contained"
                    size = "small"
                    type="submit"> Log in 
                    </Button>
                </Box>
            </Stack>
            </form>
            <p style={{position: 'absolute', left: '45.5%', top: '67%', transform: 'translate(-50%, -50%)'}}>
                Don't have an account? 
                <Link to = "/SignUp"> <strong> Sign up </strong> </Link>
                 here.
            </p>
        </div>
    );
};

export default SignIn;
