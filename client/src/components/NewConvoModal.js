import React,{useState} from 'react'
import {Modal,Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {createConversation} from '../actions/actions'




const NewConvoModal = ({closeModal}) => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts)
    const [selectedContacts, setSelectedContacts] = useState([])
    const [isSelectedConvo, setIsSelectedConvo] = useState(false)

    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createConversation(selectedContacts,isSelectedConvo));
        closeModal();
        
    }

    const handleCheckboxChange = (contact) => {
        setSelectedContacts(prevSelectedContacts => {
            if(prevSelectedContacts.includes(contact)){
                return prevSelectedContacts.filter(prev =>{
                    return contact !== prev
                })
            } else {
                return [...prevSelectedContacts, contact]
            }
        })
        
    }
    


    return (
        <>
        <Modal.Header>Create Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact=>(
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check 
                        type="checkbox"
                        value={selectedContacts.includes(contact.id)}
                        label={contact.username}
                        onChange={()=>handleCheckboxChange(contact)}
                        />
                    </Form.Group>
                ))}

            <Button type="submit" variant="dark" className="bspBrown mt-1">Create</Button>
            </Form>
        </Modal.Body>
        
        </>
    )
}

export default NewConvoModal
