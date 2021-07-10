import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Modal} from 'react-bootstrap';
import SideBar from './SideBar';
import ErrorModal from './ErrorModal';
import OpenConversation from './OpenConversation';
import io from 'socket.io-client'
import { setSocket } from '../actions/actions';


const ChatDashboard = () => {
    //const username = useSelector(state => state.currentUser.username);
    //const userId = useSelector(state => state.currentUser.id)
    
    const isError = useSelector(state => state.isError);
    const errorMessage = useSelector(state => state.errorMessage);
    const conversations = useSelector(state=>state.conversations);
    const user = useSelector(state => state.currentUser);
    const username = user.username;
    
    const [socket, setSocket] = useState(null);
    let selectedConversation = conversations.filter(convo => {
        return convo.isSelected 
    })
    
    

    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if(isError){
            setModalOpen(true)
            
        }
        
    },[isError])

    const closeModal = () => {
        
        setModalOpen(false)
        
    }
    useEffect (() => {
        const newSocket = io('http://localhost:3005',
        {
        cors:{
        origin:'http://localhost:3005',
        methods:['GET','POST']
        }, 
        query: {username}
        })

        setSocket(newSocket)

        return ()=>newSocket.close()
    },[username])
    
    //console.log(socket)

    return (
        <div className="d-flex sidebar-wrapper">
        <SideBar socket={socket}/>
        {selectedConversation && <OpenConversation socket={socket}/>}
        <Modal show={modalOpen} onHide={closeModal}>
        <ErrorModal  closeModal={closeModal} message={errorMessage}/>
        </Modal>
        </div>
    )
}

export default ChatDashboard
