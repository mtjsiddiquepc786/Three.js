import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from "lil-gui"

const gui= new GUI();

const property={
  color:"#ff0000"
};

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

// const geometry = new THREE.TorusGeometry(30, 3, 16, 100 );

const geometryParameters = {
  radius: 10,
  tube: 3,
  radialSegments: 16,
  tubularSegments: 100
};

const geometry = new THREE.TorusGeometry(
  geometryParameters.radius,
  geometryParameters.tube,
  geometryParameters.radialSegments,
  geometryParameters.tubularSegments
);



//material ---------------------------------------------------------------------
const material=new THREE.MeshBasicMaterial({
color:0xff0000,
wireframe:true
});

const cube= new THREE.Mesh(geometry,material);

// gui.add(cube.position,"x").min(-3).max(3).step(0.01).name("position   X");
// gui.add(cube.position,"y").min(-3).max(3).step(0.01).name("position   Y");
// gui.add(cube.position,"z").min(-3).max(3).step(0.01).name("position   Z");

// gui.add(cube,'visible');

// gui.add(material,"wireframe");

// gui.addColor(property,"color").onChange(()=>{
//   material.color.set(property.color)
// });


const positionFolder=gui.addFolder("Position");
const rotationFolder=gui.addFolder("Rotation");


//radius--added--------------------------------------
const geometryFolder=gui.addFolder("geometry");


geometryFolder.add(geometryParameters,"radius").min(-4).max(30).step(0.1).onChange((radius)=>{
  cube.geometry.dispose();
  cube.geometry=new THREE.TorusGeometry(
    radius,
    geometryParameters.tube,
    geometryParameters.radialSegments,
    geometryParameters.tubularSegments
  );
});  

geometryFolder.add(geometryParameters,"tube").min(0).max(30).step(0.1).onChange((tube)=>{
  cube.geometry.dispose();
  cube.geometry=new THREE.TorusGeometry(
    geometryParameters.radius,
    tube,
    geometryParameters.radialSegments,
    geometryParameters.tubularSegments
  );
});  



positionFolder.add(cube.position,"x").min(-3).max(3).step(0.01).name("position   X");
positionFolder.add(cube.position,"y").min(-3).max(3).step(0.01).name("position   Y");
positionFolder.add(cube.position,"z").min(-3).max(3).step(0.01).name("position   Z");

rotationFolder.add(cube.rotation,"x").min(-3).max(3).step(0.01).name("position   X");
rotationFolder.add(cube.rotation,"y").min(-3).max(3).step(0.01).name("position   Y");
rotationFolder.add(cube.rotation,"z").min(-300).max(300).step(0.01).name("position   Z");

gui.add(cube,'visible');

gui.add(material,"wireframe");

gui.addColor(property,"color").onChange(()=>{
  material.color.set(property.color)
});


scene.add(cube);

/////////////////////////////////////////////


//camera-----------------------------------------------------------------
const camera=new THREE.PerspectiveCamera(
  75,
  size.width/size.height,
  0.1,
  100
);

camera.position.z=-10;
camera.lookAt(0,0,0)

//renderes-------------------------------------------------------------
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

//renderer on kardo-----------------------------------------------------------------
function animate(){
timer.update();
controls.update();

const delta = timer.getDelta();
cube.rotation.x += delta*0.1;
cube.rotation.y += delta*0.1;
cube.rotation.z += delta*0.01;

  renderer.render(scene,camera);
  
  requestAnimationFrame(animate);
}
animate();





