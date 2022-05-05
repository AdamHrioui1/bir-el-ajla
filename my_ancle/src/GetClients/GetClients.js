import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobaleState } from '../GlobaleState'

function GetClients() {
    const state = useContext(GlobaleState)
    const [client] = state.clients
    const [search, setSearch] = state.search

    // if(client.length === 0) return null

    return (
        <div className='all__clients'>
            <div className="search_container">
                <input type='search' className='search' onChange={e => setSearch(`?counterNumber[regex]=${e.target.value}`)} placeholder='...بحث' />
            </div>
            {
                client.map(c => {
                    return (
                        <Link key={c._id} to={`/client/${c._id}`}>
                            <div className='box' key={c._id}>
                                <h3>{c.counterNumber}</h3>
                                <h3>{c.name}</h3>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default GetClients