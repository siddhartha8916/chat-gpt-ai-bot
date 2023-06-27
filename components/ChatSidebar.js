import React from 'react'
import SingleConversation from './SingleConversation'

const ChatSidebar = () => {
  return (
    <div className="card shadow bg-body-tertiary rounded d-none d-md-block">
      <h4 className="card-header">Recent Conversations</h4>
      <div className="card-body" style={{ minHeight: '70vh', maxHeight: '70vh', overflow: 'auto' }}>
        <div class="list-group list-group-flush border-bottom scrollarea">
          <SingleConversation/>
          <SingleConversation/>
          <SingleConversation/>
          <SingleConversation/>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar