import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobaleState } from '../GlobaleState'
import logo from '../img/logo.jpg'

function Client() {
  var allClientData = localStorage.getItem('All Client Info') ? JSON.parse(localStorage.getItem('All Client Info')) : []
  const [allClientInfo, setAllClientInfo] = useState(allClientData)
  const [firstDate, setFirstDate] = useState('')
  const [secondDate, setSecondDate] = useState('')
  const [name, setName] = useState('')
  const [numberOfCouter, setNumberOfCouter] = useState('')
  const [prevFigure, setPrevFigure] = useState('')
  const [lastFigure, setLastFigure] = useState('')

  const state = useContext(GlobaleState)
  const [token] = state.token

  const getData = () => {
    if(firstDate.length !== 0 && secondDate.length !== 0 && name.length !== 0 && numberOfCouter.length !== 0 && prevFigure.length !== 0 && lastFigure.length !== 0) { 
      let data = {
        firstDate: firstDate,
        secondDate: secondDate,
        name: name,
        numberOfCouter: numberOfCouter,
        prevFigure: prevFigure,
        lastFigure: lastFigure
      }

        setAllClientInfo([...allClientInfo, data])
      }
  }

  const handleAdd = async (e) => {
    e.preventDefault()    
    
    if(firstDate.length !== 0 && secondDate.length !== 0 && name.length !== 0 && numberOfCouter.length !== 0 && prevFigure.length !== 0 && lastFigure.length !== 0) {
      
      try {
        const res = await axios.post('/api/client', {
          name: name, 
          counterNumber: numberOfCouter, 
          factureDate: firstDate, 
          paymentDate: secondDate, 
          prevFigure: prevFigure, 
          lastFigure: lastFigure
        }, {
          headers: {
            'Authorization': token
          }
        })
        
        alert(res.data.msg)
      } catch (err) {
        alert(err.response.data.msg)
      }
      
      setFirstDate('')
      setSecondDate('')
      setName('')
      setNumberOfCouter('')
      setPrevFigure('')
      setLastFigure('')
    } 
    else {
      alert('Please fill all the fields!')
    }
    
    getData()
  }
    
    
  useEffect(() => {
    localStorage.setItem('All Client Info', JSON.stringify(allClientInfo))
  }, [allClientInfo])


  useEffect(() => {
    let lc = localStorage.getItem('All Client Info')
    if(lc) {
      setAllClientInfo(JSON.parse(lc))
    }
  }, [])
  
  return (
    <div className='container'>
      <img src={logo} alt="" />
        <h1>اضافة زبون جديد</h1>

        <form className='form'>
            <label htmlFor="number_of_counter">رقم العداد</label>
            <input type='number' id='number_of_counter' value={numberOfCouter} onChange={e => setNumberOfCouter(e.target.value)} required />
            
            <label htmlFor="name">الاسم الكامل</label>
            <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} required />
            
            <label htmlFor="first_date">تاريخ الفاتورة</label>
            <input type='date' id='first_date' value={firstDate} onChange={e => setFirstDate(e.target.value)} required />

            <label htmlFor="second_date">تاريخ الدفع</label>
            <input type='date' id='second_date' value={secondDate} onChange={e => setSecondDate(e.target.value)} required />

            <label htmlFor="prev_figure">البيان السابق</label>
            <input type='number' id='prev_figure' value={prevFigure} onChange={e => setPrevFigure(e.target.value)} required />

            <label htmlFor="lest_figure">البيان الجديد</label>
            <input type='number' required id='lest_figure' value={lastFigure} onChange={e => setLastFigure(e.target.value)} />

            <input className='button' onClick={handleAdd} type='submit' value='اضافة' />
            <Link to='/download'>استلام</Link>
        </form>
    </div>
  )
}

export default Client