import React from "react";

export default function MessageHistory() {
  
  return (


<div id="message-pane" className="px-5 py-5 rounded-3">
        
        {(!openMessage) ? <h4 className="text-muted"> No message selected.</h4> : 
            (<div>
                <h4>{openMessage.messagesubject}</h4>
                {openMessage.sender === props.currentUser ? (
                    <div>
                    <h5>To: {openMessage.recipientname}</h5>
                    <p className="text-muted">From: you</p>
                    </div>
                ) : (
                    <div>
                    <h5>From: {openMessage.sendername}</h5>
                    <p className="text-muted">To: you</p>
                    </div>
                )}
                <p>{openMessage.body}</p>
                <button onClick={e => handleReply(e)} className="btn btn-primary btn-sm">Reply</button>
            </div>
            )
            }
        </div>

)
        }