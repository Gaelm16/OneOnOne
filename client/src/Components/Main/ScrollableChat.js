import React from 'react'

const ScrollableChat = ({messages}) => {
  return (
    <div>
    {messages.map((message) => {
        <div key={message.id}>
            
        </div>
    })}
    </div>
  )
}

export default ScrollableChat