import { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { useData } from '../../Context/Context'


function SignUp() {

    const [data, setData, url] = useData()

    const usernameRef = useRef('')
    const passwordRef = useRef('')
    
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    
    const [submit, setSubmit] = useState(false)
    const [err, setErr] = useState()
    const [succes, setSucces] = useState()

    const [path, setPathname] = useState()

    useEffect(() => {
        if (submit && username && password) {

            ;(async () => {
                const res = await fetch(`${url}/signup`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    })
                })

                const { mass, succes, json } = await res.json()
                setErr(mass)
                setSucces(succes)
                setData(json)
            })()

            setSubmit(false)
        }

    }, [submit, username, password, setErr, setData, url])

    if (succes && data) {
        return <Redirect to={'/contacts'}/>
    }

    if (path === '/') {
        return <Redirect to = {'/'} />
    }

    return (
        <>
            <button className='universal-btn' onClick={() => setPathname('/')}>Home</button>
            <h1 className='title'>Sign up for free !!!</h1>
            <div className='container-form'>
                    {err}
                <div className='form-wrapper'>
                    <form 
                        className='forma'
                        onSubmit={ e => {
                        e.preventDefault()
                        setSubmit(true)
                        
                    }}
                    >
                        <label htmlFor="user">
                            <input ref={usernameRef} className='form-input' id='user' type="text" spellCheck='off' autoComplete='off' placeholder='Username' required/>
                        </label>
                        <label htmlFor="pass">
                            <input ref={passwordRef} className='form-input' id='pass' type="text" spellCheck='off' autoComplete='off' placeholder='Password' required/>
                        </label>
                        <button className='universal-btn'>SignUp</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp