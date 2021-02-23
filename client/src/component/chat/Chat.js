import React from "react";
import Axios from "axios";

const ChatList = (props) => {

    const [people, setPeople] = React.useState([]);

    const pp = (x) => {
        setPeople(people, ...x)
    }
    
    React.useEffect(() => {
        Axios.post('http://localhost:3001/chat/people', {userId : props.id})
        .then((res) => {
            if(res.data.boards)
            {
                var result = res.data.boards
                console.log('boards', result);
                console.log('...boards', ...result);
                // setPeople(...people, ...result);
                pp(result);
            }
        }).catch((err) => {console.log(err)})
    })
    console.log('people', people)
    return (
        <div>
            <h2>ChatList</h2>
            <hr />

        </div>
    )
}

export default ChatList;