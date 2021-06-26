import React from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth"
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("enter email address for the user you want to chat");
    if (!input) return null;

    if (EmailValidator.validate(input)
    // && doesChatAlreadyExists(input) && input !== user.email
    ) {
        db.collection('chats').add({
                users: [user.email, input],
      });
    }
  };

  const doesChatAlreadyExists = (recipientEmail) => {
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search in Chats" />
      </SearchContainer>

      <SidebarButton onClick={createChat}>Start a New Chat</SidebarButton>
      {chatsSnapshot?.docs.map(chat=>(
        // <Chat key ={chat.id} id={chat.id} users={chat.data().users} />
        <Chat key ={chat.id} id={chat.id} users={chat.data().users} />
      ))}

    </Container>
  );
}

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const SearchInput = styled.input`
  outline-width: 0;
  flex: 1;
  border: none;
`;

const IconsContainer = styled.div``;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
`;

export default Sidebar;
