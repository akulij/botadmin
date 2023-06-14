import React from 'react'

import './Chats.css'

type UserViewProps = {
    userfullname: string;
    last_message: string;
    onClick: React.MouseEventHandler<HTMLDivElement>
}

// on click set global state to this chat and push chat destructor to stack
// on esc execute destructor and drop destructor fro stack
function UserView(props: UserViewProps) {
  return (
      <div className='user_view' onClick={props.onClick}>
          <div className='view_userfulllname'>{props.userfullname}</div>
          <div className='view_last_message'>{props.last_message}</div>
      </div>
  )
}

export default UserView
