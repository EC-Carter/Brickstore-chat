import React,{useState} from 'react';
import {Form, Button,Modal} from 'react-bootstrap';


const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const handleCloseModal = () => setShow(false);
    

    const handleSubmit =  async (e) => {
        e.preventDefault();
        fetch('/usersData',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            },
        body:JSON.stringify({
            username:userName,
            password:password
    })
});
        
        setUserName('');
        setPassword('');
        setShow(true);
        //console.log(show)
    }
    




return (
    <>
    <div className="fullPageWrapper  d-flex flex-column align-items-center justify-content-center">
    
    <Form  onSubmit={handleSubmit} className=" bg-white col-6 d-flex flex-column " >
    <h2 className ="align-self-center my-3">Register</h2>
        <Form.Group className="p-2">
            <Form.Label>UserName</Form.Label>
            <Form.Control type='text' placeholder='enter userName' name='username' onChange={(e)=>setUserName(e.target.value)} value={userName}/>
        </Form.Group>

        <Form.Group className="p-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='enter password' name='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </Form.Group>
        <Button type='submit' className="bspBrown align-self-center my-3">Create Account</Button>
    </Form>
        
    </div>

    <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header >
            <Modal.Title>Thanks for Joining</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Your account has been created. You will need your acount verified by a manager before being able to log in. 
        </Modal.Body>
        <Modal.Footer>
            <Button  className="bspBrown" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
    </Modal>


    </>
)
}

export default Register

