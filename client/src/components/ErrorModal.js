import React,{useState} from 'react';
import { Modal,Button } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {setErrorFalse} from '../actions/actions';





const ErrorModal = ({message,closeModal}) => {
    const dispatch = useDispatch();
    
    const handleClick = () => {
        dispatch(setErrorFalse());
        closeModal();
        
        
        
    }
    

    return (
        <>
        <Modal.Header>{message}</Modal.Header>
        <Modal.Body>{message}: Please try again</Modal.Body>
        <Button onClick={handleClick} className="bspBrown m-2">Close</Button>
        </>
    
    
    )
}

export default ErrorModal
