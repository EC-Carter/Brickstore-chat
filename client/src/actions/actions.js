//remember an action is just an object that gets returned
//an action creator is a named function that returns the action
//each one gets exported don't use export default

export const addCurrentUser = (user) => {

    return{
        type:'ADD_CURRENT_USER',
        currentUser:user
    }
    
}

export const getNewContact = username => async(dispatch,getState) =>{
    const response = await fetch('/getUser',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
                
            },
            body:JSON.stringify({
                username:username    
            })
    })
    let newContact = await response.json()
    //console.log(newContact)
    if('message' in newContact ){
        //console.log(newContact.message)
        dispatch(setErrorTrue(newContact.message))
    } else{
        //console.log(newContact)
        dispatch(addNewContact(newContact));

    }
    
}   

export const addNewContact = (contact) => {
    return{
        type:'ADD_NEW_CONTACT',
        newContact:contact
    }
    
}

export const setErrorTrue = (message)=>{
    return{
        type:'SET_ERROR_TRUE',
        message:message

    }
}

export const setErrorFalse = () =>{
    return{
        type:'SET_ERROR_FALSE'
    }
}

export const createConversation = (recipients,isSelected) => {
    return{
        type:'CREATE_CONVERSATION',
        recipients:recipients,
        isSelected:isSelected

    }
    
}

export const setSelectedConversation = (selectedCoversation) => {
    return{
        type:'SET_SELECTED_CONVERSATION',
        selected:selectedCoversation
    }
}

export const addMessageToConversation = (recipients,sender,text) => {
    const message ={
        text,
        recipients,
        sender
    }
    return{
        type:'ADD_MESSAGE_TO_CONVO',
        message:message
        
    }
}

export const setSocket = () => {
    //sets the socket connection
    //maybe incorporate this into the add user action
}

export const sendMessage = (text,recipients,sender,socket) => async(dispatch,getState) =>{
    //check to see if socket connection exists
    //emmit message to socket
    
}

export const recieveMessage = (message) => async(dispatch,getState) =>{
    //recieves message from socket
    //calls addMessageToConversation to add the message 

}


