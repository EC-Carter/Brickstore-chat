//remember an action is just an object that gets returned
//an action creator is a named function that returns the action
//each one gets exported don't use export default

export const addCurrentUser = (user) => {

    return{
        type:'ADD_CURRENT_USER',
        currentUser:user
    }
    
}
