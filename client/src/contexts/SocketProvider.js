import React,{useContext,useEffect,useState} from 'react';
import io from 'socket.io-client';
import {useSelector} from 'react-redux';

const SocketContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext)
}


export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState()
    const username = useSelector(state => state.currentUser.username)
    useEffect(() => {
        const newSocket = io('http://localhost:3005',{query:{username}})
        setSocket(newSocket)

        return () => newSocket.close()
        
    },[username])


    return (
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
    )
}


