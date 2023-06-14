import { useState } from 'react'

import './Chats.css'
import UserView from './UserView.tsx'


type UserMessage = {
    author: string;
    message: string;
}

const data: Array<UserMessage> = [
    {
        author: 'Almaz Akulij',
        message: `Hello! I'm calling to notificate you: new season have just started`,
    },
    {
        author: 'Akulij',
        message: `Hello! I'm calling`,
    },
    {
        author: 'Just Akulij',
        message: 'just call me!!!!',
    },
]

function Chats() {
  return (
        <div className='user_views'>
            <h2>Сообщения</h2>
            {
              data.map((message, index) => {
                return <UserView
                         key={index}
                         userfullname={message.author}
                         last_message={message.message}
                         onClick={(e) => console.log(e)}
                       />
              })
            }
        </div>
  )
}

export default Chats
