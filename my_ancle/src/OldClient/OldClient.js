import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobaleState } from '../GlobaleState'
import logo from '../img/logo.jpg'

function OldClient() {
    const state = useContext(GlobaleState)
    const [token] = state.token
    var allClientData = localStorage.getItem('All Client Info') ? JSON.parse(localStorage.getItem('All Client Info')) : []
    const [allClientInfo, setAllClientInfo] = useState(allClientData)
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')
    const [name, setName] = useState('')
    const [numberOfCouter, setNumberOfCouter] = useState('')
    const [prevFigure, setPrevFigure] = useState('')
    const [lastFigure, setLastFigure] = useState('')

    const [data, setData] = useState([])
    const [wantedData, setWantedData] = useState({
        counterNumber: '',
        date: {factureDate: '', paymentDate: '', prevFigure: '', lastFigure: ''},
        name: ''
    })

    const getClient = async () => {
        try {
            const res = await axios.get('/api/client', {
                headers: {
                    'Authorization': token
                }
            })
            setData(res.data)
        } catch (err) {
            console.log(err.response.data.msg)
        }
    }  

    const getData = () => {
        if(firstDate.length !== 0 && secondDate.length !== 0 && numberOfCouter.length !== 0 && lastFigure.length !== 0) { 

            let data = {
                firstDate: firstDate,
                secondDate: secondDate,
                name: wantedData.name,
                numberOfCouter: wantedData.counterNumber,
                prevFigure: wantedData.date[wantedData.date.length - 1] ? wantedData.date[wantedData.date.length - 1].lastFigure : '',
                lastFigure: lastFigure
            }

            setAllClientInfo([...allClientInfo, data])
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        getData()
        getClient()

        if(firstDate.length !== 0 && secondDate.length !== 0 && numberOfCouter.length !== 0 && lastFigure.length !== 0) {

            try {
                const clientExist = data.some(d => {
                    return d.counterNumber === numberOfCouter
                });

            if(!clientExist) return alert('Client not found!')
            
            const res = await axios.put('/api/client', { counterNumber: wantedData.counterNumber, 
                factureDate: firstDate,
                paymentDate: secondDate,
                prevFigure: wantedData.date[wantedData.date.length - 1] ? wantedData.date[wantedData.date.length - 1].lastFigure : '',
                lastFigure: lastFigure
            }, {
                headers: {
                    'Authorization': token
                }
            })

            alert(res.data.msg)
            } catch (err) {
                alert(err.message)
            }
            
            setFirstDate('')
            setSecondDate('')
            setName('')
            setNumberOfCouter('')
            setPrevFigure('')
            setLastFigure('')
            setWantedData({
                counterNumber: '',
                date: {factureDate: '', paymentDate: '', prevFigure: '', lastFigure: ''},
                name: ''
            })
            getClient()
        }

        else {
            alert('Please fill all the fields!')
        }
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
  
    useEffect(() => {
        if(token) {    
            getClient()
        }
    }, [token])

    const woow = (e) => {
        data.forEach(d => {
            setNumberOfCouter(e.target.value)
            return d.counterNumber === e.target.value && setWantedData(d)
        })
    }

  return (
    <div className='container'>
        <img src={logo} alt="" />

        <h1>اضافة فواتير لزبون قديم</h1>

        <form className='form'>
            <label htmlFor="number_of_counter">رقم العداد</label>
            <input type="text" list='brow' onChange={woow}/>
            <datalist id='brow'>
                {
                    data.map(d => {
                        return <option key={d.counterNumber} value={d.counterNumber} onClick={() => console.log('clicked')} >{d.counterNumber}</option>
                    })
                }
            </datalist>

            <label htmlFor="name">الاسم الكامل</label>
            <input type='text' id='name' value={wantedData.name} disabled='disabled' />
            
            <label htmlFor="first_date">تاريخ الفاتورة</label>
            <input type='date' id='first_date' value={firstDate} onChange={e => setFirstDate(e.target.value)} required />

            <label htmlFor="second_date">تاريخ الدفع</label>
            <input type='date' id='second_date' value={secondDate} onChange={e => setSecondDate(e.target.value)} required />

            <label htmlFor="prev_figure">البيان السابق</label>
            <input type='number' id='prev_figure' value={wantedData.date[wantedData.date.length - 1] ? wantedData.date[wantedData.date.length - 1].lastFigure : ''}  disabled='disabled' />

            <label htmlFor="lest_figure">البيان الجديد</label>
            <input type='number' required id='lest_figure' value={lastFigure} onChange={e => setLastFigure(e.target.value)} />

            <input className='button' onClick={handleAdd} type='submit' value='اضافة' />
            <Link to='/download'>استلام</Link>
        </form>
    </div>
  )
}

export default OldClient