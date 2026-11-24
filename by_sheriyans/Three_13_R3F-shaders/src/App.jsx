import React from 'react'
import Beta from './components/Beta'
import { Canvas } from '@react-three/fiber'

const App = () => {
  return (
  <div className='container'>

  <Canvas>

  <Beta/>
  
  </Canvas>

  
    </div>
  )
}

export default App