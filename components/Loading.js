import React from 'react'
import {Circle} from "better-react-spinkit"

function Loading() {
    return (
        <center style={{display: 'grid', placeItems: "center", height: '100vh'}}> 
            <div>
                <img alt= ""  src = {'/images/whatsapp_red.png'}
                style={{marginBottom: 10 }}
                height= {200}
                
                
                />
                <Circle color="red" size={60}/>
            </div>
        </center>
    )
}

export default Loading
 