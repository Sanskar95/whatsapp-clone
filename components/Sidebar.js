import React, { useState } from "react";
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
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import getRecipientEmail from "../utils/getRecipientEmail";

function Sidebar() {
  const [user] = useAuthState(auth);
  const [input, setInput] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [modalOpenFlag, setModalOpenFlag] = React.useState(false);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const handleEmailInput = (event) => {
    setInput(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpenFlag(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const getChats = () => {
    return chatsSnapshot?.docs
      .filter((chatObj) =>
        getRecipientEmail(chatObj.data().users, user)
          .toString()
          .includes(searchInput)
      )
      .map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ));
  };

  const vaildateAndCreateChat = () => {
    if (
      EmailValidator.validate(input) &&
      !doesChatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
      setModalOpenFlag(false);
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
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
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
        <TextField
          onChange={handleSearchInputChange}
          fullWidth
          id="outlined-basic"
          label="Search Chats"
          variant="outlined"
        />
      </SearchContainer>

      <SidebarButton onClick={handleModalOpen}>Start a New Chat</SidebarButton>
      {getChats()}
      <Dialog
        open={modalOpenFlag}
        onClose={() => {
          setModalOpenFlag(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the email with whom you want to have a conversation.
          </DialogContentText>
          <TextField
            onChange={handleEmailInput}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModalOpenFlag(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={vaildateAndCreateChat} color="primary">
            Create Chat
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

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
    background-color: #c8f902;
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
