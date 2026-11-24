import { OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { DoubleSide } from "three";


const Beta = () => {

    const materialRef=useRef(null);

    useFrame((state,delta)=>{
        if(materialRef.current){
        
        materialRef.current.uniforms.uTime.value+=delta;}
        })

return (
<>
<OrbitControls/>

<mesh scale={3}>

<planeGeometry  args={[1,1,64,30]}/>
<shaderMaterial 
side={DoubleSide}
ref={materialRef}
uniforms={{uTime:{value:0}}}
vertexShader={`

    uniform float uTime;

    void main(){
    vec3 pos=position;
    pos.z=sin(pos.x*10.0+uTime)*0.5;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
    }`}

    fragmentShader={`
        void main(){
        gl_FragColor=vec4(0.0,1.0,1.0,1.0);
        }`}

/>
</mesh>
</>
)}
export default Beta