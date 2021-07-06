import React,{useEffect,useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Login = () => {

    const [data, setData] = useState(null);

useEffect(() => {
    const getDatafromServer =  async () => {
    let results = await fetch('/usersData');
    let data = await results.json();
    setData(data.users);
    }
    getDatafromServer();
    
},[])

console.log(data)

return (
    <>
    <div className="fullPageWrapper  d-flex flex-column align-items-center justify-content-center">
    
    <Form className=" bg-white col-6 d-flex flex-column ">
    <h2 className ="align-self-center my-3">Login</h2>
        <Form.Group className="p-2">
            <Form.Label>UserName</Form.Label>
            <Form.Control type='text' placeholder='enter userName'/>
        </Form.Group>

        <Form.Group className="p-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='enter password'/>
        </Form.Group>
        <Button type="submit" className="bspBrown align-self-center my-3 btn-lg">Login</Button>
        <Form.Text className ="align-self-center my-3 ">Don't have an acount. Create one <Link to="/register">here</Link></Form.Text>
    </Form>
        
    </div>
        
    </>
)
}

// {data.map(user => {
//     return <div>{user.userName} {user.password}</div>
//     })}


export default Login
