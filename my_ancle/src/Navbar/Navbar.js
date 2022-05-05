import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobaleState } from '../GlobaleState'

function Navbar() {
    const state = useContext(GlobaleState)
    const [isLogged, setIsLogged] = state.isLogged

    const logout = async () => {
        try {
            await axios.get('/admin/logout')
            setIsLogged(false)
            localStorage.removeItem('firstlogin')
            window.location.href = '/'
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <nav className='navbar'>
            {
                isLogged ?
                    <ul>
                        <Link to='/'>
                            <li>اضافة زبون جديد</li>
                        </Link>
                        <Link to='/oldclient'>
                            <li>اضافة فواتير لزبون قديم</li>
                        </Link>
                        <Link to='getclients'>
                            <li>جميع الزباىن</li>
                        </Link>
                        <Link to='/download'>
                            <li>تحميل</li>
                        </Link>
                        <button className='logout__btn' onClick={logout} >خروج</button>

                    </ul>
                :
                <h1>جماعة بئر العجلة للتنمية و الثقافة و التعاون</h1>
            }
        </nav>
    )
}

export default Navbar