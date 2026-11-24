import React from 'react'

const Beta = () => {
return (

<>
<mesh //position={[1,1,0]}
        //rotation={[1,2,0]}
        // scale={[1,2,3]} 
>
{/* //<boxGeometry //args={[2,3,4]} /> */}
<sphereGeometry args={[1,30,16]} />

<meshBasicMaterial color={'#0070ff'}/>

</mesh>
</>
)}

export default Beta