import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Modal} from 'react-bootstrap';
import SideBar from './SideBar';
import ErrorModal from './ErrorModal';
import OpenConversation from './OpenConversation';


const ChatDashboard = () => {
    //const username = useSelector(state => state.currentUser.username);
    //const userId = useSelector(state => state.currentUser.id)
    
    const isError = useSelector(state => state.isError)
    const errorMessage = useSelector(state => state.errorMessage)
    const conversations = useSelector(state=>state.conversations)
    //console.log(conversations)
    let selectedConversation = conversations.filter(convo => {
        return convo.isSelected 
    })
    //console.log(selectedConversation)
    

    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if(isError){
            setModalOpen(true)
            
        }
        
    },[isError])

    const closeModal = () => {
        
        setModalOpen(false)
        
    }
    
    

    return (
        <div className="d-flex sidebar-wrapper">
        <SideBar/>
        {selectedConversation && <OpenConversation/>}
        <Modal show={modalOpen} onHide={closeModal}>
        <ErrorModal  closeModal={closeModal} message={errorMessage}/>
        </Modal>
        </div>
    )
}

export default ChatDashboard
