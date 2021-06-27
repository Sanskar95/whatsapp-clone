import React from 'react'
import styled from 'styled-components'
import Head from "next/head"
import Button from "@material-ui/core/Button";
import { auth, provider } from '../firebase';


function login() {

    const signIn =()=>{
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src = {'/images/whatsapp_red.png'}/>
                <Button onClick={signIn} variant = "outlined">Sign In With Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default login
const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
` ;
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    border-radius: 5px;
` 