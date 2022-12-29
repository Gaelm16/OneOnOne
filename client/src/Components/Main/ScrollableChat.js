import React, { useContext } from 'react'
import { AuthContext } from '../../UserContext'

const ScrollableChat = ({messages}) => {
  const {loggedIn} = useContext(AuthContext);

  const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
  return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  return (
    <div>
      {messages &&
        messages.map((message, i) => {
          return(
              <div key={i} className="styles">
                {(isSameSender(messages, message, i, loggedIn._id) ||
                  isLastMessage(messages, i, loggedIn._id)) && (
                    <h4>{message.sender.userName}</h4>
                )}
                  <span>
                  
                    {message.messageContent}
                  </span>
            </div>
          )
          
      })}
    </div>
    
  )
}

export default ScrollableChat