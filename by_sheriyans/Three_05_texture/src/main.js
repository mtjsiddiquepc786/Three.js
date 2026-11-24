import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from "lil-gui"
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'

const property={
  color:"#ff0000"
};

// const loadManager=new THREE.LoadingManager();
//   loadManager.onLoad=()=>{ console.log("loaded")}

const diff_loader = new THREE.TextureLoader();
const rough_loader=new EXRLoader();
const norm_loader=new EXRLoader();
const ds_loader=new EXRLoader();
const ao_loader=new EXRLoader();
const arm_loader=new THREE.TextureLoader();

const texture= diff_loader.load('/dry_river/textures/dry_river_pebbles_diff_1k.jpg',
  // ()=>{console.log("loaded")},
  // ()=>{console.log("progress")},
  // ()=>{console.log("error")}
)
const rough=rough_loader.load('/dry_river/textures/dry_river_pebbles_rough_1k.exr')

const normal=norm_loader.load('/dry_river/textures/dry_river_pebbles_nor_gl_1k.exr')

const ds=ds_loader.load('/dry_river/textures/dry_river_pebbles_disp_1k.exr')

const ao=ao_loader.load('/dry_river/textures/dry_river_pebbles_ao_1k.exr')

const arm=arm_loader.load('/dry_river/textures/dry_river_pebbles_arm_1k.jpg')

texture.colorSpace=THREE.SRGBColorSpace;

const size={
  width:window.innerWidth,
  height:window.innerHeight
}

//scene------------------------------------------------------------
const scene = new THREE.Scene();

const timer = new THREE.Timer();


// 3d object - mesh-------------------------------------------------------------
/////////////////////////////////////////////
//geometry-----------------------------------------------

const geometry = new THREE.BoxGeometry(3,3,3);

//material ---------------------------------------------------------------------
//const material=new THREE.MeshStandardMaterial({
const material=new THREE.MeshStandardMaterial({
map:texture,
roughnessMap:arm,  //rough
normalMap:normal,

displacementMap:ds,
displacementScale:0.02,

aoMap:ao,  //arm
metalnessMap:arm,
metalness:0,
// wireframe:true
}); 

const cube= new THREE.Mesh(geometry,material);

///////////////////--light--add--////////////////////////////////////////

scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const light = new THREE.DirectionalLight(0xffffff, 6);
light.position.set(2, 5, -10);
scene.add(light);

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
cube.rotation.x -= delta*0.08;
cube.rotation.y -= delta*0.03;
cube.rotation.z -= delta*0.03;

  renderer.render(scene,camera);
  
  requestAnimationFrame(animate);
}
animate();




//  AO ke liye geometry mein `uv2` coordinates bhi chahiye. uv2 kya hota hai 