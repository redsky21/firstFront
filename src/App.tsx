import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [firstState, setFirstState] = useState<string>()
    let a = "오니?"
    useEffect(() => {
        setFirstState('가냐')
    }, [])

    return (
        <div className="row-wrapper">
        <div className="name">
          <span>계산기1</span>
        </div>
        <input className="display" />
        <div className="row">
          <button >9</button>
          <button >8</button>
          <button >7</button>
          <button >*</button>
        </div>
        <div className="row">
          <button >6</button>
          <button >5</button>
          <button >4</button>
          <button >+</button>
        </div>
        <div className="row">
          <button >3</button>
          <button >2</button>
          <button >1</button>
          <button >-</button>
        </div>
        <div className="row">
          <button >0</button>
          <button >.</button>
          <button >=</button>
          <button >/</button>
        </div>
        <div>
          <button
            className="clear-button"
          >
            Clear
          </button>
        </div>
      </div>
    )
}

export default App
