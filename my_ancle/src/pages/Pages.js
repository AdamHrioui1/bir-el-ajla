import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import Client from "../Client/Client"
import Clientpage from "../ClientPage/ClientPage"
import Download from "../Download/Download"
import GetClients from "../GetClients/GetClients"
import { GlobaleState } from "../GlobaleState"
import Login from "../Login/Login"
import OldClient from "../OldClient/OldClient"

function Pages() {
    const state = useContext(GlobaleState)
    const [isLogged] = state.isLogged
    return (
        <Routes>
            <Route path='/' element={isLogged ? <Client /> : <Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/oldclient' element={isLogged ? <OldClient /> : <Login />} />
            <Route path='/download' element={isLogged ? <Download /> : <Login />} />
            <Route path='/getclients' element={isLogged ? <GetClients /> : <Login />}/>
            <Route path='/client/:id' element={isLogged ? <Clientpage /> : <Login />} />
        </Routes>
    )
}

export default Pages