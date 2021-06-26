import React from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@material-ui/core";
import { auth, db } from "../firebase";
import styled from "styled-components";
import {useRouter} from "next/router"
import {useCollection} from "react-firebase-hooks/firestore"

function Chat(props) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const recipientEmail = getRecipientEmail(props.users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(props.users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
    const enterChat = () => {
        router.push(`/chat/${props.id}`)
    }
  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
      }

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

export default Chat;
