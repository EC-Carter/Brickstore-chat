import React,{useState, useCallback,useEffect} from 'react';
import {Form,InputGroup,Button, Modal} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';

import {addMessageToConversation,setErrorTrue} from '../actions/actions';

import ErrorModal from './ErrorModal';

const OpenConversation = ({socket}) => {

    const dispatch = useDispatch();
    const conversations = useSelector(state => state.conversations);
    const user = useSelector(state=>state.currentUser);
    const isError = useSelector(state => state.isError);
    const errorMessage = useSelector(state => state.errorMessage);

    const [text, setText] = useState('');
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({smooth:true})
        }
    },[])

    let selectedConversation = conversations.filter( convo => {
        return convo.isSelected
    })
    selectedConversation = selectedConversation[0];

    

    //event handlers for message and use effect to recieve message from socket
    const sendMessage = (recipients,text,user) => {
        let names = recipients.map(recipient => recipient.username);
        socket.emit('send-message',{recipients,text})
        dispatch(addMessageToConversation(names,user,text))
    }

    useEffect(()=> {
        
        if(socket == null) return
        socket.on('receive-message',(data) =>{
            let recipients = data.recipients;
            let sender = data.sender;
            let text = data.text;
            console.log(`recip ${recipients} sender ${sender} text ${text}`)
            dispatch(addMessageToConversation(recipients,sender,text))
        })

        
        return ()=> socket.off('receive-message')

    },[socket,dispatch])
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedConversation){
        sendMessage(selectedConversation.recipients,text,user.username)
    
        } else {
        dispatch(setErrorTrue('You must select a conversation'))
        }
        setText('')
    }
    //for error modal
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if(isError){
            setModalOpen(true)
            
        }
        
    },[])
    const closeModal = () => {
        
        setModalOpen(false)    
    }
    
    

    return (
        <div className="d-flex flex-column flex-grow-1  openConversation">
            <div className="flex-grow-1 overflow-auto">
                <div className=' d-flex flex-column align-items-start justify-content-end px-3'>
                    
                    {selectedConversation && selectedConversation.messages.map((message,index) => {
                        const lastMessage = selectedConversation.messages.length -1 === index
                        return(
                            <div 
                            ref={lastMessage ? setRef :null}
                            key={index} 
                            className={`my-1 d-flex flex-column ${user.username === message.sender?'align-self-end align-items-end':'align-items-start' }`}
                            >
                            <div className={`rounded px-2 py-1 ${user.username === message.sender?'bg-white':'bspBrown text-white'} `}>{message.text}</div>
                                <div>{message.sender}</div>
                            </div>
                        )
                    })}
                    

                </div>

            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2 ">
                    <InputGroup>
                        <Form.Control
                        className="rounded-0"
                        as="textarea"
                        required
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style={{height:'75px',resize:'none'}}
                        />
                        <InputGroup.Append>
                        <Button type="submit" variant="dark" className="bspBrown rounded-0" style={{height:'75px'}}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
            <Modal show={modalOpen} onHide={closeModal}>
            <ErrorModal closeModal={closeModal} message={errorMessage}/>
            </Modal>
            
        </div>
        
    )
}

export default OpenConversation
