import React,{useState} from 'react';
import {Modal,Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {getNewContact} from '../actions/actions';


const NewContactModal = ({closeModal}) => {
    const [contactToAdd, setContactToAdd] = useState('')

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNewContact(contactToAdd))
        closeModal()

        
    }


    return (
        <>
        <Modal.Header>Create Contact</Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>New Contact Username</Form.Label>
                    <Form.Control type="text" required value={contactToAdd} onChange={(e)=>setContactToAdd(e.target.value)}/>
                </Form.Group>
                <Button type='submit' variant='dark' className="bspBrown my-2">Add Contact</Button>
            </Form>
        </Modal.Body>
        
        </>
    )
}

export default NewContactModal
