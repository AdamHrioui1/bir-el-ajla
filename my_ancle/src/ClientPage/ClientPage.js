import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobaleState } from '../GlobaleState'

function Clientpage() {
  const params = useParams()
  const state = useContext(GlobaleState)
  const [client] = state.clients
  const [currentClient, setCurrentClient] = useState([])
  
  useEffect(() => {
    if(client) {
      client.forEach(c => {
        return c._id === params.id && setCurrentClient(c)
      });
    }
  }, [client, params.id])

  if(client.length === 0) return null
  if(currentClient.length === 0) return null

  return (
    <div>
        <div className="client_page_header">
          <h1>{currentClient.name} : الاسم الكامل</h1>
          <h1>{currentClient.counterNumber} : رقم العداد</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>المبلغ الاجمالي</th>
              <th>المستحقات الثابتة</th>
              <th>الثمن</th>
              <th>الفرق</th>
              <th>البيان الجديد</th>
              <th>البيان السابق</th>
              <th className='table__date__container'>تاريخ الدفع</th>
              <th className='table__date__container'>تاريح البيان</th>
            </tr>
          </thead>

          <tbody>
            {
              currentClient.date.map((d, index) => {
                return (
                  <tr key={index}>
                    <td>{(parseInt(d.lastFigure) - parseInt(d.prevFigure)) * 6 + 5} dh</td>
                    <td>5 dh</td>
                    <td>{(parseInt(d.lastFigure) - parseInt(d.prevFigure)) * 6}</td>
                    <td>{parseInt(d.lastFigure) - parseInt(d.prevFigure)}</td>
                    <td>{d.lastFigure}</td>
                    <td>{d.prevFigure}</td>
                    <td className='table__date__container'>{d.paymentDate}</td>
                    <td className='table__date__container'>{d.factureDate}</td>
                  </tr>
                )
              })
            }
          
          </tbody>
        </table>
    </div>
  )
}

export default Clientpage