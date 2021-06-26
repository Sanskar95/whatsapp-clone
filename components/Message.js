import React from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ModeCommentTwoTone } from "@material-ui/icons";
import moment from "moment";

function Message(props) {
  const [loggedInUser] = useAuthState(auth);
  const TypeOfMessage = props.user === loggedInUser.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {props.message.message}
        <Timestamp>
          {" "}
          {props.message.timestamp
            ? moment(message.timestamp).format("LT")
            : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;
const Sender = styled(MessageElement)`
  background-color: #dcf8c6;
  margin-left: auto;
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
