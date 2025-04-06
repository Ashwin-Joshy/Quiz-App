import { Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import routes from "./routes";
function App() {

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
