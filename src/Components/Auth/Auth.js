import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import { PostWithoutAuth } from "../../Services/HttpService";

function Auth() {

    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");


    const handleUsername = (value) => {
        setuserName(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) => {
        PostWithoutAuth("/auth/" + path, {
            userName: userName,
            password: password,
        })
        .then((res) => res.json())
        .then((result) => {localStorage.setItem("tokenKey", result.message);
        localStorage.setItem('currentUser', result.userId);
        localStorage.setItem('userName', userName)
    })
        .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        setuserName("")
        setPassword("")
        window.history.go("/auth")
    }

    return(
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input onChange={(i) => handleUsername(i.target.value)}/>
            <InputLabel style={{top: 80}}>Password</InputLabel>
            <Input style={{top: 40}}
            onChange={(i) => handlePassword(i.target.value)}
            />
            <Button
            variant="contained"
            style={{marginTop: 60,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white'
            }}
            onClick={() => handleButton('register')}
            >
                Register
            </Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button variant="contained"
            style={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white'
            }}
            onClick={() => handleButton('login')}
            >Login</Button>
        </FormControl>
    )
}

export default Auth;