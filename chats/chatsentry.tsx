import ReactDOM from 'react-dom/client'

import Chats from './Chats.tsx';
import Menu from '/src/Menu.tsx';

import 'antd/dist/reset.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Menu current='chats'>
        <Chats />
    </Menu>
)
