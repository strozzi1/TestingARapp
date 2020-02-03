import {Workbox} from 'workbox-window';
import {WebGLRenderer, Scene, PerspectiveCamera, PointLight, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

if ("serviceWorker" in navigator) {
  const wb = new Workbox('service-worker.js');
  wb.register();
}

var renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new Scene();
var camera= new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000);
var cameraControls = new OrbitControls(camera, renderer.domElement);
cameraControls.update();

camera.position.z = 100;

var light = new PointLight( 0xffffff, 1, 0, 0);
scene.add(light);

var modelObj;
var loader = new GLTFLoader();
loader.load(
  'models/Earth.glb',
  gltf => loadModel (gltf),
  xhr => onProgress(xhr),
  error => onError(error)
);

var loadModel = (gltf) => {
  modelObj = gltf.scene;
  modelObj.name = 'model';
  scene.add(modelObj);
};

var onProgress = (xhr) => {
  //console.log((xhr.loaded / xhr.total *100) + '% loaded');
};

var onError = (error) => {
  console.log(error);
}

var render = () => {
  requestAnimationFrame( render );
  cameraControls.update();
  renderer.render( scene, camera);
};

var geometry = new BoxGeometry( 10, 10, 10 );
var material = new MeshBasicMaterial( {color: 0x00ff00} );
var cube = new Mesh( geometry, material );
scene.add( cube );

console.log("HERE");
