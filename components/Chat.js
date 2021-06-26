import React from 'react'
import getRecipientEmail from "../utils/getRecipientEmail"
import {useAuthState} from "react-firebase-hooks/auth"
import {Avatar} from "@material-ui/core"
import {auth} from "../firebase"
import styled from "styled-components";


function Chat(props) {
    const [user] = useAuthState(auth)
    const recipientEmail = getRecipientEmail(props.users, user);
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(users,user)));
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    
    return (
        <Container>
            <UserAvatar/>
            <p>{recipientEmail}</p>
        </Container>
    )
}

const Container=styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding:15px;
    word-break: break-word;
    :hover{
        background-color: #e9eaeb;
    }
`;
const UserAvatar= styled(Avatar)`
    margin:5px;
    margin-right: 15px;
`;

export default Chat;
