import ReactDOM from 'react-dom/client'

import Statistics from './Statistics.tsx'
import Menu from '@src/Menu.tsx';

import 'antd/dist/reset.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Menu current='statistics'>
        <Statistics />
    </Menu>
)
