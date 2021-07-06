//import actions in here


const mainReducer = (state,action) => {

    if(state == null){
        state = {
            conversations:[],
            contacts:[]
        }
    }

    switch(action.type){


        default:
            return state;
    }
    
}

export default mainReducer;
