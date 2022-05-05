import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import GetClients from "./api/GetClients";
export const GlobaleState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState('')
    const [client, setClient] = useState([])
    const [search, setSearch] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const getAdmin = async () => {
        try {
            const res = await axios.get('/admin/refreshtoken')
            setToken(res.data.accesstoken)
            setIsLogged(true)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const getClient = async (token) => {
        try {
            const res = await axios.get(`/api/client${search}`, {
                headers: {
                    'Authorization': token
                }
            })
            setClient(res.data)
        } catch (err) {
            alert('get clients error: ', err.response.data.msg)
        }
    }

    useEffect(() => {
        const firstlogin = localStorage.getItem('firstlogin')
        if(firstlogin) {    
            getAdmin()
        }
    }, [token])

    useEffect(() => {
        if (token) {
            getClient(token)
        }
    }, [token, search])
    

    const state = {
        token: [token, setToken],
        clients: [client, setClient],
        search: [search, setSearch],
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    }

    return (
        <GlobaleState.Provider value={state} >
            {children}
        </GlobaleState.Provider>
    )
}