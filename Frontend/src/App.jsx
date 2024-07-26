import { useState } from 'react'
import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './Components/Homepage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
       {/* <div className="container"> */}
           <Routes>
           <Route path="/" element={<Homepage />} />
         </Routes> 
       {/* </div> */}
      </Router>

 </>
  )
}

export default App
