import './App.css'
import {Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Create from './components/Create'
import Navbar from './components/Navbar'
import Edit from './components/Edit'
import Delete from './components/Delete'


function App() {
  const myWidth = 220 // Corrected typo in variable name

  return (
    <div className="App">
      <Navbar drawerWidth={myWidth} content={
        <Routes>
          <Route path='' element={<Home />} /> {/* Render Home component on root path */}
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/delete/:id' element={<Delete />} />
        </Routes>
      } control={undefined} />
    </div>
  )
}

export default App
