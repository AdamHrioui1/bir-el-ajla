import html2pdf from 'html2pdf.js'
import React, { useEffect } from 'react'
import logo from '../img/logo.jpg'

function Download() {
  let data = JSON.parse(localStorage.getItem('All Client Info'))

  const pdfDownload = e => {
    e.preventDefault()
    var element = document.getElementById('pdf-view')

    var opt = {
        margin: 0,
        filename: 'file.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'}
    }

    html2pdf().set({
      pagebreak: { mode: 'avoid-all', before: '#page2el' }
    });

    html2pdf().set(opt).from(element).save()
  }

  const clearData = () => {
      if(window.confirm('Do you want to clear the storage ?')) {
        localStorage.clear()
        window.location.href = '/'
      }
  }

  return (
    <>
      <div id='pdf-view'>
        {
          data.map((item, index) => {
            return (
              <>
                { index !== 0 && (index) % 5 === 0 && <div className='html2pdf__page-break'></div> }
                
                <div className="dashed__border"></div>
                <div className="table__container" key={Math.random()}>
                  <img src={logo} alt="" />
                  <table key={index}>
                    <thead>
                      <tr>
                        <th>الثمن الاجمالي</th>
                        <th>المسبحقات الثابتة</th>
                        <th>الثمن بالدرهم </th>
                        <th>الفرق</th>
                        <th>البيان الجديد</th>
                        <th>البيان السابق</th>
                        <th>رقم العداد</th>
                        <th>الاسم الكامل</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{(parseInt(item.lastFigure) - parseInt(item.prevFigure)) * 6 + 5} dh</td>
                        <td>5 dh</td>
                        <td>{(parseInt(item.lastFigure) - parseInt(item.prevFigure)) * 6}</td>
                        <td>{parseInt(item.lastFigure) - parseInt(item.prevFigure)}</td>
                        <td>{item.lastFigure}</td>
                        <td>{item.prevFigure}</td>
                        <td>{item.numberOfCouter}</td>
                        <td>{item.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )
          })
        }

      </div>
      <button className='download' onClick={pdfDownload}>Download PDF</button>
      <button className='download delete' onClick={clearData}>Clear Storage</button>
    </>
  )
}

export default Download