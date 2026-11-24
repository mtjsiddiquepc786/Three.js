import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { HDRLoader, RGBELoader } from 'three/examples/jsm/Addons.js';
import vertexShader from "./shaders/vertexShader.glsl";
import fragmentShader from "./shaders/fragmentShader.glsl"; 

const property={
  color:"#ff0000"
};

const size={
  width:window.innerWidth,
  height:window.innerHeight
}

const texture_loader= new THREE.TextureLoader();
texture_loader.load('https://images.unsplash.com/photo-1792803003219-42799afbe876?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  (texture)=>{material.uniforms.uTexture.value=texture}
)
//scene------------------------------------------------------------
const scene = new THREE.Scene();

const timer = new THREE.Timer();


// 3d object ---mesh-------

/////////////////////////////////////////////

//geometry-------------------------------------

const geometry = new THREE.PlaneGeometry(6,6,32,32);

//material ----------------------------------------------- 



const material=new THREE.ShaderMaterial({
vertexShader: vertexShader,
fragmentShader:fragmentShader, 
uniforms:{
  uTime:{value:0},
  uTexture:{vaue: ''},
}, 
side:THREE.DoubleSide,
}); 

const cube= new THREE.Mesh(geometry,material);
scene.add(cube)

//--light---------------------------------------------------


const ambientlight=new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientlight);


//camera-----------------------------------------------------------------

const camera=new THREE.PerspectiveCamera(
  75,
  size.width/size.height,
  0.1,
  100
);

camera.position.z=+7;
camera.lookAt(0,0,0)

//renderes-------------------------------------------------------------

const canvas=document.querySelector('#webgl');

const renderer=new THREE.WebGLRenderer({canvas});

renderer.setSize(size.width,size.height);


/////////////////---orbit- control--///////////////////////////////
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping=true;
controls.dampingFactor=0.03;


//resizing--/////////////////////////////////////////////////////////////////////////
window.addEventListener('resize',()=>{
  size.width=window.innerWidth;
  size.height=window.innerHeight;

  camera.aspect=size.width/size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width,size.height);
});
/////////////////////////////////////////////////////////////////////////////////////


//renderer on kardo-----------------------------------------------------------------
function animate(){
timer.update();
controls.update();

const delta = timer.getDelta();

if(material){
  material.uniforms.uTime.value+=delta*2;
}

cube.rotation.x = delta*0.08;
cube.rotation.y = delta*0.03;
cube.rotation.z = delta*0.03;

  renderer.render(scene,camera);
  
  requestAnimationFrame(animate);
}
animate();

