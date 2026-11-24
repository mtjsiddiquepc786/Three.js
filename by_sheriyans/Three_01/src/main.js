import './style.css'
import * as THREE from 'three'


//scene
const scene = new THREE.Scene();

// 3d object - mesh

//geometry
const geometry = new THREE.BoxGeometry(1,1,1);

//material
const material=new THREE.MeshBasicMaterial({color:0xff0000});

const cube= new THREE.Mesh(geometry,material);

// cube.position.y=1;
// // cube.position.set(1,2,1);


// cube.scale.x=1.5;
// cube.scale.set(1,2,3);

// cube.rotation.z=Math.PI/4
// cube.rotation.set(3.14/6,3.14/5,3.14/7)
// cube.rotation.set(Math.PI/6,Math.PI/5,Math.PI/7)


scene.add(cube);

//camera
const camera=new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  100
);

camera.position.x=-1;
camera.position.y=1;
camera.position.z=5;

//renderes
const canvas=document.querySelector('#webgl');

const renderer=new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth,window.innerHeight);

//renderer on kardo
renderer.render(scene,camera);










