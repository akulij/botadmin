import { BaseSyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios';

import './Chats.css'
import UserView from './UserView.tsx'


type UserMessage = {
    author: string;
    message: string;
    userid: number;
}

const data: Array<UserMessage> = [
    {
        author: 'Almaz Akulij',
        message: `Hello! I'm calling to notificate you: new season have just started`,
        userid: 1,
    },
    {
        author: 'Akulij',
        message: `Hello! I'm calling`,
        userid: 2,
    },
    {
        author: 'Just Akulij',
        message: 'just call me!!!!',
        userid: 3,
    },
]

const getMessages = async () => {
    // return data
    let {protocol, hostname, port} = location;
    // port = "8000";
    const messages = await axios.get<UserMessage[]>(`${protocol}//${hostname}:${port}/api/user_previews`)
                                .catch((e) => {console.log(e)})
    if (messages) {
      console.log(messages.status)
      return messages.data
    }
    else {
        return [] as UserMessage[]
    }
    return data
}

function NoMessages() {
    return (
        <div className='no_messages'>Нет сообщений</div>
    )
}

function Chats({onUserSelect}: {onUserSelect: any}) {
    const [messages, setMessages] = useState<UserMessage[]>([]);

    useEffect(() => {
        (async () => {
            console.log("the2")
            const messages = await getMessages();
            setMessages(messages);
        })();
    }, [])
  return (
        <div className='user_views'>
            <h2>Сообщения</h2>
            {
              messages.length ? messages.map((message, index) => {
                  const onClick = (e: BaseSyntheticEvent) => {
                      console.log(`Clicked on`)
                      console.log(e)
                      onUserSelect(message.userid)
                      console.log(`User ${message.userid} selected`)
                  }
                return <UserView
                         key={index}
                         userfullname={message.author}
                         last_message={message.message}
                         onClick={onClick}
                       />
              }) : <NoMessages />
            }
        </div>
  )
}

export default Chats
