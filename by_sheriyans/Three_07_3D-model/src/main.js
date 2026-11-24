import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from "lil-gui"
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


const property={
  color:"#ff0000"
};
////////////////////////////////////////////////
const size={
  width:window.innerWidth,
  height:window.innerHeight
}
const diffLoader=new THREE.TextureLoader();
const diff=diffLoader.load('./textures/textures/dry_river_pebbles_diff_1k.jpg')

let mixer;

const gltfLoader=new GLTFLoader();
gltfLoader.load('./model.glb',
  (gltf)=>{
  const model =gltf.scene

  if(gltf.animations &&  gltf.animations.length){
    console.log(gltf.animations[0])

  mixer=new THREE.AnimationMixer(model);
  // const danceAction=mixer.clipAction(gltf.animations[0]);

  const deathAnimation=THREE.AnimationClip.findByName(gltf.animations,"Death")

  if(deathAnimation){
    const deathAction=mixer.clipAction(deathAnimation);

    deathAction.play();
  }

  // danceAction.play();
  }

  model.scale.set(0.5,0.5,0.5)  
  scene.add(model)  
  console.log("model loaded")

/////////////////////////////////////////////

const meshes=[];
model.traverse((obj)=>{
if(obj.isMesh){
  meshes.push(obj)
}})
///////////////////////
const firstmesh=model.getObjectByName('ArmL')
  

  if(!firstmesh.material) return;

  const materials=Array.isArray(firstmesh.material)? firstmesh.material:[firstmesh.material];

  materials.forEach((material)=>{
    material.map=diff;
    material.needsUpdate=true;

  })
},
  ()=>{
    console.log('model loading...')
  }, 
  ()=>{
  console.log('error.........')
  })




//scene------------------------------------------------------------
const scene = new THREE.Scene();

const timer = new THREE.Timer();


// 3d object ---mesh-------
/////////////////////////////////////////////
//geometry-------------------------------------

const geometry = new THREE.BoxGeometry(3,3,3);

//material -----------------------------------------------

const material=new THREE.MeshStandardMaterial({
map:diff,
}); 

const cube= new THREE.Mesh(geometry,material);

//////////--light--add--///////////////////////////////////////


const ambientlight=new THREE.AmbientLight(0xffffff, 20)
scene.add(ambientlight);

// const directional_light = new THREE.DirectionalLight(0xffffff, 4);
// directional_light.position.set(2, 2, -2);
// scene.add(directional_light);

// const directional_light_helper=new THREE.DirectionalLightHelper(directional_light,1);
// scene.add(directional_light_helper);
 

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

if(mixer){
  mixer.update(delta);
}

cube.rotation.x = delta*0.08;
cube.rotation.y = delta*0.03;
cube.rotation.z = delta*0.03;

  renderer.render(scene,camera);
  
  requestAnimationFrame(animate);
}
animate();



// Haan, maine poora main.js dekha. Texture lagane wala hissa overall sahi hai, lekin kuch baatein dhyaan dene layak hain:

// meshes[2] teesra mesh hai, kyunki array counting 0 se shuru hoti hai. Texture sirf usi mesh par lag rahi hai. Agar model mein teen se kam meshes mile, toh firstmesh undefined hoga aur firstmesh.material par error aayega.
// Aapne diff.colorSpace = THREE.SRGBColorSpace abhi code mein nahi likha. Diffuse/color texture ke rang sahi dikhane ke liye ise diffLoader.load(...) ke turant baad rakhna chahiye.
// cube banaya aur animate kiya ja raha hai, lekin scene.add(cube) nahi hai. Isliye cube render nahi hoga; model phir bhi alag se scene mein add ho raha hai.
// AmbientLight intensity 20 kaafi zyada ho sakti hai, jis se model bahut bright ya washed-out dikhe. Yeh appearance par depend karta hai.
// Maine koi code change nahi kiya, aur app run karke verify bhi nahi ki—yeh code dekhkar review hai.