import React,{useState,useEffect} from 'react';
import {Form, Button,Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {addCurrentUser} from '../actions/actions';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [show, setShow] = useState(false);

    const handleCloseModal = () => setShow(false);

    //to use global state
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
        const isUser = await fetch('/login',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
                
            },
            body:JSON.stringify({
                username:userName,
                password:password
            })
        })//eo fetch
        
        //set current user in global state
        //console.log(currentUser)
        const currentUser = await isUser.json();
        if('message' in currentUser ){
            setShow(true)
            console.log(currentUser)
            setUserName('');
            setPassword('');

        } else {
            dispatch(addCurrentUser(currentUser));
            setLoggedIn(true)
            
        }


        } catch(e){
            console.log(e)
        }
        
        
        
    }//eo handleSubmit
    

    
    


return (
    <>
    <div className="fullPageWrapper  d-flex flex-column align-items-center justify-content-center">
    {loggedIn && <Redirect to="/dashboard"/>}
    <Form onSubmit={handleSubmit} className=" bg-white col-6 d-flex flex-column ">
    <h2 className ="align-self-center my-3">Login</h2>
        <Form.Group className="p-2">
            <Form.Label>UserName</Form.Label>
            <Form.Control type='text' placeholder='enter userName' onChange={(e)=>setUserName(e.target.value)} value={userName} name="username"/>
        </Form.Group>

        <Form.Group className="p-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='enter password' onChange={(e)=>setPassword(e.target.value)} value={password} name="password"/>
        </Form.Group>

        <Button variant="dark" type="submit" className="bspBrown align-self-center my-3 btn-lg">Login</Button>

        <Form.Text className ="align-self-center my-3 ">Don't have an acount. Create one <Link to="/register">here</Link></Form.Text>

    </Form>
    {/* {data && data.map(user => {
    return <div>username: {user.username} password: {user.password}</div>
    })}  */}

<Modal show={show} onHide={handleCloseModal}>
        <Modal.Header >
            <Modal.Title>User Not found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Please try again or create an account if you have not already done so. 
        </Modal.Body>
        <Modal.Footer>
            <Button  variant="dark" className="bspBrown" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
    </Modal>
    </div>

    

    

    </>
)}







export default Login
