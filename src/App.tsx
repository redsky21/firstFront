import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
    const [firstState, setFirstState] = useState<string>()
    let a = "오니?"
    useEffect(() => {
        setFirstState('가냐')
    }, [])

    return (
        <div className="App">
            <h1>사냥을 시작해볼까</h1>
            <h2>{a}</h2>
            <h2>{firstState}</h2>
            <button onClick={()=>{setFirstState('바이')}}>안녕</button>
        </div>
    )
}

export default App
