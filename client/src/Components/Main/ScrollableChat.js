import React, { useContext } from 'react'
import { AuthContext } from '../../UserContext'

const ScrollableChat = ({messages}) => {
  const {user} = useContext(AuthContext);
  console.log(user.result._id)
  //let d = user.result._id

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

  const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

  return (
    <div>
      {messages &&
        messages.map((message, i) => {
          return(
              <div key={message._id} className="styles">
                {(isSameSender(messages, message, i, user.result._id) ||
                isLastMessage(messages, i, user.result._id)) && (
                   <span>             
                {message.sender.userName}
                </span>
                )}
                {/* <span>             
                  {message.sender._id === user.result._id ? 'Me' : message.sender.userName}
                </span> */}
                  <span style={{
                backgroundColor: `${
                  (message.sender._id === user.result._id) ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, message, i, user.result._id),
                marginTop: isSameUser(messages, message, i, user.result._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}>
                    {message.messageContent}
                  </span>
            </div>
          )
      })}
    </div>
    
  )
}

export default ScrollableChat