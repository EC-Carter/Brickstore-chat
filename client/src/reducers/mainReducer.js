


const mainReducer = (state,action) => {

    if(state == null){
        state = {
            conversations:[],
            contacts:[],
            currentUser:{},
            isError:false,
            errorMessage: ""
        }
    }

    switch(action.type){
        case 'ADD_CURRENT_USER':
            return{
                ...state,
                currentUser:action.currentUser
            }
        
        case 'ADD_NEW_CONTACT':
            return{
                ...state,
                contacts:state.contacts.concat(action.newContact)

            }
        case 'SET_ERROR_TRUE':
            return{
                ...state,
                isError:true,
                errorMessage:action.message
            }
        case 'SET_ERROR_FALSE':
            return{
                ...state,
                isError:false,
                errorMessage:''
            }
        case 'CREATE_CONVERSATION':
            let recipients = action.recipients
            let isSelected = action.isSelected
            return{
                ...state,
                conversations:[...state.conversations,{recipients, messages:[],isSelected}]
            }
        case 'SET_SELECTED_CONVERSATION':
            let selected = action.selected
            let prevState = [...state.conversations]
            let updatedConverations = prevState.map((convo, index) => {
                if(index === selected) {
                    convo.isSelected = true;
                } else {
                    convo.isSelected = false;
                }
                return convo
            })
            return{
                ...state,
                conversations:updatedConverations
            }
        case 'ADD_MESSAGE_TO_CONVO':
            //let selectedConvo = action.selectedConvo
            let prevConvos = [...state.conversations]
            let updatedConversations = prevConvos.map(convo=>{
                if(convo.isSelected){
                    convo.messages = [...convo.messages,action.message]
                }
                return convo
            })
            return{
                ...state,
                conversations:updatedConversations

            }



        default:return state;
    }
    
}

export default mainReducer

