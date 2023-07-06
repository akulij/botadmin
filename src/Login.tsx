import { Form, Input, Button } from 'antd';

import './Login.css'

function App() {
    return (
        <div className='login_form'>
          <form action='/login' method='post'>
            <h1>Вход в админ панель</h1>
            <Form.Item name='login'>
            <Input name='login' placeholder='Логин' required></Input>
            </Form.Item>
            <Form.Item name='password'>
            <Input.Password name='password' placeholder='Пароль' required></Input.Password>
            </Form.Item>
            <Form.Item>
            <Button type='primary' htmlType='submit'>Войти</Button>
            </Form.Item>
          </form>
        </div>
    )
  return (
    <>
          <form action='/login' method='post' className='login_form'>
          <div className='form_title'>
          Вход в админ панель
          </div>
              <input type='text' placeholder='Login' name='login' required></input>
              <input type='password' placeholder='Password' name='password' required></input>
              <button type='submit'>Войти</button>
          </form>
    </>
  )
}

export default App
