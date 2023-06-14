import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import './Menu.css';

const menu: MenuProps['items'] = [
    {
        label: (
            <a href='/statistics/'>Статистика</a>
        ),
        key: 'statistics',
    },
    {
        label: (
            <a href='/chats/'>Чаты</a>
        ),
        key: 'chats',
    },
]

type MenuComponentProps = {
    current: string;
    children: any;
}

function MenuComponent(props: MenuComponentProps) {
    return (
        <>
          <Menu selectedKeys={[props.current]} mode='horizontal' items={menu} />
          <div className='page_container'>
              {props.children}
          </div>
        </>
    )
}

export default MenuComponent
