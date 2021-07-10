import React,{useState} from 'react';
import {ListGroup} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {setSelectedConversation} from '../actions/actions'


const Conversations = () => {
    
    const conversations = useSelector(state => state.conversations);
    const dispatch = useDispatch();
    const handleSelection = (selectedConversation) => {
        dispatch(setSelectedConversation(selectedConversation));
    }
    
    

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation,index) => (
                <ListGroup.Item
                key={index}
                action
                onClick={()=>{ 
                //console.log(index)
                handleSelection(index)
                }}
                active={conversation.selected}
                >
                {conversation.recipients.map(r => r.username).join(', ')}
                </ListGroup.Item>
            ))}

        
        
        </ListGroup>
    )
}

export default Conversations

