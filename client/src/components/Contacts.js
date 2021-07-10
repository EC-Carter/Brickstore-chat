import React from 'react';
import {useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';

const Contacts = () => {
    const contacts = useSelector(state => state.contacts)
    //console.log(contacts)
return (
    <ListGroup variant='flush'>
        {contacts.map(contact =>(
            <ListGroup.Item key={contact.id}>
                {contact.username}
            </ListGroup.Item>

        ))}
    
    </ListGroup>
)
}

export default Contacts
