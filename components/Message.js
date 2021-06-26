import React from 'react'
import  styled  from 'styled-components';

function Message(props) {
    return (
        <Container>
            <p>{props.message.message}</p>
        </Container>
    )
}

export default Message;

const Container = styled.div``;
