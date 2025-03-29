import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import routes from "./routes";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Suspense fallback={<h1 className="text-center mt-10">Loading...</h1>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </>
  )
}

export default App
