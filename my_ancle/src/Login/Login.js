import React, { useState } from 'react'
import axios from 'axios'
import logo from '../img/logo.jpg'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/admin/login', {
                email, password
            })
            localStorage.setItem('firstlogin', true)
            window.location.href = '/'
            console.log(res)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className='container'>
            <img src={logo} alt="" />
            <h1 style={{'marginTop': '30px'}}>تسجيل الدخول</h1>
            
            <form className='form' onSubmit={handleLogin} >
                    <input style={{'margin': '30px 0', 'padding': '10px'}} type="email" name='email' onChange={e => setEmail(e.target.value)} placeholder='...البريد الالكتروني' required/>
                    <input style={{'marginBottom': '20px', 'padding': '10px'}} type="password" name='password' onChange={e => setPassword(e.target.value)} placeholder='...كلمة المرور' required/>
                    <input type="submit" value='تسجيل الذخول' className='button'/>
                </form>
        </div>
    )
}

export default Login