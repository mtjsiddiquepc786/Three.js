import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const size={
  width:window.innerWidth,
  height:window.innerHeight
}

//scene
const scene = new THREE.Scene();
// const clock = new THREE.Clock();
const timer = new THREE.Timer();


// 3d object - mesh
/////////////////////////////////////////////
//geometry

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
// const geometry = new THREE.BufferGeometry();

// const count =50;

// const positionArray=new Float32Array(count*3*3);

// for(let i=0; i<count*3*3; i++){
//   positionArray[i]=(Math.random()-0.5)*4
// }

// geometry.setAttribute("position", new THREE.BufferAttribute(positionArray,3));

//material
const material=new THREE.MeshBasicMaterial({
color:0xff0000,
wireframe:true
});

const cube= new THREE.Mesh(geometry,material);

scene.add(cube);
// cube.position.x=1
/////////////////////////////////////////////


//camera
const camera=new THREE.PerspectiveCamera(
  75,
  size.width/size.height,
  0.1,
  100
);

camera.position.z=-10;
camera.lookAt(0,0,0)

//renderes
const canvas=document.querySelector('#webgl');

const renderer=new THREE.WebGLRenderer({canvas});

renderer.setSize(size.width,size.height);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping=true;
controls.dampingFactorfactor=0.1;



///////////////////////////////////////
window.addEventListener('resize',()=>{
  size.width=window.innerWidth;
  size.height=window.innerHeight;

  camera.aspect=size.width/size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width,size.height);
});
//////////////////////////////////////////

//renderer on kardo
function animate(){
timer.update();
controls.update();

const delta = timer.getDelta();
cube.rotation.x += delta*0.01;
cube.rotation.y += delta*0.1;
cube.rotation.z = delta*1;

  renderer.render(scene,camera);
  
  requestAnimationFrame(animate);
}
animate();








