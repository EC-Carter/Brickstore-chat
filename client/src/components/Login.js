import React,{useState,useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

//     const [data, setData] = useState(null);

// useEffect(() => {
//     const getDatafromServer =  async () => {
//     let results = await fetch('/usersData');
//     let data = await results.json();
//     //console.log(data)
//     setData(data);
//     }
//     getDatafromServer();
    
// },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/login',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify({
                username:userName,
                password:password
            })
        })

        setUserName('');
        setPassword('');
    }//eo handleSubmit
    


return (
    <>
    <div className="fullPageWrapper  d-flex flex-column align-items-center justify-content-center">
    
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

        <Button type="submit" className="bspBrown align-self-center my-3 btn-lg">Login</Button>

        <Form.Text className ="align-self-center my-3 ">Don't have an acount. Create one <Link to="/register">here</Link></Form.Text>

    </Form>
    {/* {data && data.map(user => {
    return <div>username: {user.username} password: {user.password}</div>
    })}  */}
    </div>

    

    

    </>
)}







export default Login
