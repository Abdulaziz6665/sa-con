import { Redirect } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useData } from '../../Context/Context'

function Contacts () {
    
    const [data, setData, url] = useData()
    const focus = useRef()
    
    const [info, setInfo] = useState()
    const [del, setDel] = useState()
    
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState(null)
    const [succes, setSucces] = useState(false)
    
    const [path, setPathname] = useState(false)
    
    useEffect(() => {
   
        if (data) {
             window.localStorage.setItem('data', JSON.stringify(data))

            ;(async () => {
    
                const res = await fetch(`${url}/contacts`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        data
                    })
                })
    
                const json = await res.json()
                setInfo(json)
            })()
        }

    }, [data, setInfo, url])

    useEffect(() => {
        
        if (!data) {
            const dataa = JSON.parse(window.localStorage.getItem('data'))
            setData(dataa)
        }

    }, [data, setData])

    useEffect(() => {

        if (name && phone && succes) {
            
            ;(async () => {
                const res = await fetch(`${url}/contacts`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        data,
                        name,
                        phone,
                        email
                    })
                })
    
                const json = await res.json()
                setInfo(json)
            })()
            
            setSucces(false)
            setName(null)
            setPhone(null)
            setEmail(null)
        }
    }, [data, name, phone, email, succes, url])

    useEffect(() => {

        if(del) {
            ;(async () => {
                const res = await fetch(`${url}/contacts`, {
                    method: 'delete',
                    headers: {
                     'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                     del,
                     data
                    })
                })
                const json = await res.json()
                setInfo(json)
            })()
        }

    }, [url, del, setInfo, data])

    if (path) {
        window.localStorage.removeItem('data')
        return <Redirect to = {'/'}/>
    }

    return (
        <>
            <button className='universal-btn' onClick={() => {
                setPathname(true)
                setData(null)
            }}>Sign out</button>
            <h1 className='contact-title'>Contacts page</h1>
            <div className='contact-edit'>

                <form 
                    className='form-contact'
                        onSubmit={e => {
                        e.preventDefault()
                        setSucces(true)
                        focus.current.focus()
                        e.target.reset()
                    }}
                >
                    <div>
                        <input ref={focus} className='form-input' onChange={e => setName(e.target.value)} type="text" placeholder='Enter name' name='user' spellCheck='off' autoComplete='off' autoFocus={true} required />
                    </div>
                    <div>
                        <input className='form-input' onChange={e => setPhone(e.target.value)} type="text" placeholder='Phone number' name='phone' spellCheck='off' autoComplete='off' required />
                    </div>
                    <div>
                        <input className='form-input' onChange={e => setEmail(e.target.value)} type="text" placeholder='Optional' name='email' spellCheck='off' autoComplete='off' />
                    </div>
                    <div className='form-btn-wrapper'>
                        <button className='universal-btn'>Add contact</button>
                    </div>
                </form>
            </div>

            {info && (
                <div className='sss'>
                   { info.map((e, key) => (
                    <div className='ddd' key={key}>
                        <button className='delete-btn' onClick={() => setDel(e.user_id)}>&#10008;</button>
                        <span>name: {e.user_username}</span>
                        <span>phone: <a className='user-phone' href={`tel: ${e.user_phone}`}>{e.user_phone}</a></span>
                        <span>opt: {e.user_email || 'empty'}</span>
                    </div>
                    ))
                   }
                </div>
            )}
        </>
    )
}

export default Contacts