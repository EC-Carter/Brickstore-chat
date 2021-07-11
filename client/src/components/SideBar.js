import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import {Tab,Nav,Button,Modal} from 'react-bootstrap';

import Contacts from './Contacts';
import Conversations from './Conversations';
import NewContactModal from './NewContactModal';
import NewConvoModal from './NewConvoModal';


const SideBar = ({socket}) => {
    //global state
    const username = useSelector(state => state.currentUser.username);
    const userId = useSelector(state => state.currentUser.id);
    
    //local state
    const [conversationsOpen, setConversationsOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);


    //handler functions
    const tabClickHandler = (isTrue) => {
        setConversationsOpen(isTrue)
    }

    const closeModal = () => {
        setModalOpen(false)
    }
    

    
    
    
    return (
        <div className="d-flex flex-column sideBar">
            
                <Tab.Container className="">
                    <Nav variant="tabs"className="justify-content-center">
                        <Nav.Item >
                            <Nav.Link eventKey="conversations" onClick={()=>tabClickHandler(true)} >Conversations</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="contacts" onClick={()=>tabClickHandler(false)}>Contacts</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className=" border-right overflow-auto flex-grow-1">
                        <Tab.Pane eventKey="conversations">
                            <Conversations/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="contacts">
                        <Contacts/>
                        </Tab.Pane>
                        
                    </Tab.Content>
                    <div className=" border-top border-right text-center p-2">
                    Your Username: {username}
                    </div>
                    <Button onClick={()=>setModalOpen(true)} className="bspBrown rounded-0"
                    variant="dark"
                    >
                    New {conversationsOpen? 'Conversation': 'Contact'}
                </Button>
                    
                </Tab.Container>

                <Modal show={modalOpen} onHide={closeModal}>
                {conversationsOpen? 
                <NewConvoModal closeModal={closeModal} /> :
                <NewContactModal closeModal={closeModal}/>
                }
                </Modal>

                
        </div>
    )
}

export default SideBar


