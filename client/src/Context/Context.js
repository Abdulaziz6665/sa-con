import { createContext, useState, useContext } from 'react'

const context = createContext()

function Provider ({children}) {

    const [data, setData] = useState(null)

    return (
        <context.Provider value={{data, setData}}>
            {children}
        </context.Provider>
    )
}

function useData () {
    const {protocol, hostname, port} = window.location
    const urlToFetch = `${protocol}//${hostname}${port ? ':5000' : null}`
    
    const { data, setData } = useContext(context)

    return [data, setData, urlToFetch]
}


export {Provider, useData}
    
