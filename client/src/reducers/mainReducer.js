//import actions in here


const mainReducer = (state,action) => {

    if(state == null){
        state = {
            conversations:[],
            contacts:[],
            currentUser:{}
        }
    }

    switch(action.type){
        case 'ADD_CURRENT_USER':
            return{
                ...state,
                currentUser:action.currentUser
            }



        default:
            return state;
    }
    
}

export default mainReducer;
