import { Leva, useControls } from 'leva';
import { Environment, Html, OrbitControls, Text, useGLTF } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import  { Suspense, useRef } from 'react'
import { BoxGeometry, MeshBasicMaterial, TextureLoader } from 'three'

const Beta = () => {

const {x,y,z} = useControls("position",{
x:{value:0, min:-4, max:4, step:0.01},

y:{value:0, min:-4, max:4 ,step:0.01},
z:{value:0, min:-4, max:4 ,step:0.01},
})

return (
<>

<OrbitControls/>

<mesh position={[x,y,z]} >
    <boxGeometry/>
    <meshBasicMaterial/>
</mesh>

</>
)}

export default Beta