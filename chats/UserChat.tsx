import axios from 'axios';

import './Chats.css'
import {useEffect, useState} from 'react';
import {Button, Input} from 'antd';

type UserMessage = {
    text: string;
    date: string;
}
type Message = {
    msg: UserMessage;
    from: string;
}
type User = {
    name: string;
}

const getUser = async (userid: number) => {
    // return data
    let {protocol, hostname, port} = location;
    // port = "8000";
    const messages = await axios.get<User>(`${protocol}//${hostname}:${port}/api/user_name?userid=${userid}`)
                                .catch((e) => {console.log(e)})
    if (messages) {
      console.log(messages.status)
      return messages.data
    }
    else {
        return {name: ''} as User
    }
}

const getMessages = async (userid: number) => {
    // return data
    let {protocol, hostname, port} = location;
    // port = "8000";
    const messages = await axios.get<UserMessage[]>(`${protocol}//${hostname}:${port}/api/user_messages?userid=${userid}`)
                                .catch((e) => {console.log(e)})
    if (messages) {
      console.log(messages.status)
      return messages.data
    }
    else {
        return [] as UserMessage[]
    }
}

const sendUserMessage = async (userid: number, message: string) => {
    const msgq = {
        userid,
        message
    }
    let {protocol, hostname, port} = location;
    await axios.post(`${protocol}//${hostname}:${port}/api/send_message`, msgq)
                                .catch((e) => {console.log(e)})
}


type MessageProps = {
    text: string;
    className: string;
    date: Date;
}

function Message(props: MessageProps) {
    return <div className={`message ${props.className}`}>{props.text}</div>
}

function UserDialog({chatid}: {chatid: number | undefined}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [user, setUser] = useState<User>({name: ''});
    const [value, setValue] = useState('');

    const sendMessage = async () => {
        await sendUserMessage(chatid as number, value)
        setMessages([{
            msg: {
                text: value,
                date: ''
            },
            from: 'responder'
        }, ...messages])
        setValue('')
    }

    useEffect(() => {
        (async () => {
            const user = await getUser(chatid as number);
            setUser(user);
            const messages = await getMessages(chatid as number);
            setMessages(messages.map((m) => {return {msg: m, from: 'sender'}}));
        })()
    }, [])

    return (
        <div className='dialog_container'>
            <div className='dialog_header'>
                <h3>
                {user.name}
                </h3>
            </div>
            <div className='dialog_messages'>
                {
                    messages.map((m, i) => {
                        const date = new Date(m.msg.date);
                        return (
                            <div key={i}>
                            <div className='message_container'>
                                <Message className={`message_${m.from}`} text={m.msg.text} date={date} />
                            </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='dialog_respond_field'>
                <Input.TextArea value={value} onChange={v => setValue(v.target.value)}></Input.TextArea>
                <Button type='primary' onClick={sendMessage}>Отправить</Button>
            </div>
        </div>
    )
    return <div className='dialog'>Диалог {chatid}</div>
}

function UserChat({chatid}: {chatid: number | undefined}) {
    // temporary, for test
    // return <UserDialog chatid={chatid}></UserDialog>
    return chatid == undefined ?
        <div className='no_dialog'>Нет диалога</div>
            : <UserDialog chatid={chatid}></UserDialog>
}

export default UserChat
