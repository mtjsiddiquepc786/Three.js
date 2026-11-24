import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

const Beta = () => {

const cubeRef  = useRef(null)

useFrame((state,delta)=>{
  
  cubeRef.current.rotation.z+=delta;
  
})
  return (
    <>
<ambientLight intensity={1.5} color={"white"} />
<mesh   ref={cubeRef}  >
<OrbitControls/>
<boxGeometry/>
<meshBasicMaterial color={'red'}/>





<ambientLight intensity={0.2} color={"white"} />
<directionalLight  intensity={2.5} position={[2,2,3]} color={"white"} />

<mesh   ref={cubeRef}  >
<OrbitControls/>
<boxGeometry/>
<meshStandardMaterial color={'red'}/>

</mesh>
</mesh>


    </>
  )
}

export default Beta