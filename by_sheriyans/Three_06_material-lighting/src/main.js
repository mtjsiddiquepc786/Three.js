import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from "lil-gui"


const property={
  color:"#ff0000"
};

////////////////////////////////////////////////
// const textureLoader=new THREE.TextureLoader();
// const matcapTexture = textureLoader.load('./image.png');

const size={
  width:window.innerWidth,
  height:window.innerHeight
}

//scene------------------------------------------------------------
const scene = new THREE.Scene();

const timer = new THREE.Timer();


// 3d object ---mesh-------
/////////////////////////////////////////////
//geometry-------------------------------------

const geometry = new THREE.BoxGeometry(3,3,3);

//material -----------------------------------------------

const material=new THREE.MeshStandardMaterial({
color:0xffff
}); 

const cube= new THREE.Mesh(geometry,material);

//////////--light--add--///////////////////////////////////////


const ambientlight=new THREE.AmbientLight(0xffffff, 0.08)
scene.add(ambientlight);
////////////////////////////////////////////////////
// const directional_light = new THREE.DirectionalLight(0xffffff, 6);
// directional_light.position.set(9, 9, -10);
// scene.add(directional_light);

// const directional_light_helper=new THREE.DirectionalLightHelper(directional_light,1);
// scene.add(directional_light_helper);

//////////////////////////////////////////////////////
// const pointlight = new THREE.PointLight(0xffffff,90, 6);
// pointlight.position.set(3,3,-3);
// scene.add(pointlight);

// const light_helper=new THREE.PointLightHelper(pointlight,1);
// scene.add(light_helper);
////////////////////////////////////////////////////
// const spotlight = new THREE.SpotLight(0xffffff,90, 6,Math.PI/9,0.1,2);
// spotlight.position.set(3,3,-3);
// scene.add(spotlight);

// spotlight.target.position.set(0,0,0);
// scene.add(spotlight.target)

// const light_helper=new THREE.SpotLightHelper(spotlight,0.2);
// scene.add(light_helper);
///////////////////////////////////////////////////////
const hemispherelight = new THREE.HemisphereLight(0x2222ff,0x22ff22,9);

scene.add(hemispherelight);

const light_helper=new THREE.HemisphereLightHelper(hemispherelight,4);
scene.add(light_helper);

scene.add(cube);

//////////////////////////////////////////////////////////////////////////

//camera-----------------------------------------------------------------

const camera=new THREE.PerspectiveCamera(
  75,
  size.width/size.height,
  0.1,
  100
);

camera.position.z=-7;
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
cube.rotation.x = delta*0.08;
cube.rotation.y = delta*0.03;
cube.rotation.z = delta*0.03;

  renderer.render(scene,camera);
  
  requestAnimationFrame(animate);
}
animate();




//  AO ke liye geometry mein `uv2` coordinates bhi chahiye. uv2 kya hota hai 