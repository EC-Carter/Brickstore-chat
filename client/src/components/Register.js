import React,{useState} from 'react';
import {Form, Button,Modal} from 'react-bootstrap';

import {Redirect} from 'react-router-dom';


const Register = () => {
    //local state
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [userNameTaken, setUserNameTaken] = useState(false);
    const [userRegistered, setUserRegistered] = useState(false);
    //function for modal
    const handleCloseModal = () => setShow(false);

    
    

    const handleSubmit =  async (e) => {
        e.preventDefault();
        setUserNameTaken(false);
        const userJson = await fetch('/usersData',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify({
                username:userName,
                password:password
            })
        })
        const userData = await userJson.json()
        console.log(userData)
        //check to see if username already exists
        if ('userNameTaken'in userData){
            setUserNameTaken(true);
        } else {
        //set some variable to redirect to login page
        setUserRegistered(true);

        }

            

        setUserName('');
        setPassword('');
        //setShow(true);
        //console.log(show)

    }
    




return (
    <>
    
    <div className="fullPageWrapper  d-flex flex-column align-items-center justify-content-center">
    {userNameTaken && <div> That user name is unavaiable please choose another</div> }


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
        <Button type='submit' variant='dark' className="bspBrown align-self-center my-3">Create Account</Button>
    </Form>

    {userRegistered && <Redirect to="/login"/> }
        
    </div>

    {/* <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header >
            <Modal.Title>Thanks for Joining</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Your account has been created. You will need your acount verified by a manager before being able to log in. 
        </Modal.Body>
        <Modal.Footer>
            <Button  className="bspBrown" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
    </Modal> */}


    </>
)
}

export default Register

