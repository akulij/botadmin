import ReactDOM from 'react-dom/client'

import Chats from './Chats.tsx';
import UserChat from './UserChat.tsx';
import Menu from '@src/Menu.tsx';

import 'antd/dist/reset.css';
import './index.css'
import {createContext, useState} from 'react';

export const ChatContext = createContext(undefined);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Menu current='chats'>
        <View></View>
    </Menu>
)

function View() {
    const [chatSelected, setChatSelected] = useState<number | undefined>(undefined);

    return (
        <div className='chat_view'>
            <Chats onUserSelect={(userid: number) => setChatSelected(userid)} />
            <UserChat chatid={chatSelected}/>
        </div>
    )

}
