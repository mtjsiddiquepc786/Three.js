import { Canvas } from "@react-three/fiber"
import Beta from "./components/Beta"
import { OrbitControls } from "@react-three/drei"

const App = () => {


  return (
    <div className="Container">
<Canvas>
<OrbitControls/>
<Beta/>
  
  </Canvas>
    </div>
  )}

export default App