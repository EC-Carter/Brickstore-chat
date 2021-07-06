import React from 'react';
import {Form, Button} from 'react-bootstrap';

const Register = () => {
return (
    <>
    <div className="fullPageWrapper  d-flex flex-column align-items-center justify-content-center">
    
    <Form className=" bg-white col-6 d-flex flex-column ">
    <h2 className ="align-self-center my-3">Register</h2>
        <Form.Group className="p-2">
            <Form.Label>UserName</Form.Label>
            <Form.Control type='text' placeholder='enter userName'/>
        </Form.Group>

        <Form.Group className="p-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='enter password'/>
        </Form.Group>
        <Button type="submit" className="bspBrown align-self-center my-3">Create Account</Button>
    </Form>
        
    </div>
    </>
)
}

export default Register
