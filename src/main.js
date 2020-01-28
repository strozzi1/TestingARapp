import {workbox} from 'workbox-window';
import {WebGLRenderer, Scene, PerspectiveCamera, PointLight} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

var renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new Scene();
var camera= new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000);
var cameraControls = new OrbitControls(camera, renderer.domElement);
cameraControls.update();

camera.position.z = 1500;

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

//TODO work on service worker
// firstUpdated() {
//    setTimeout(() => this._revealUi(), 500);
//
//    this._fetchAssets();
//
//    // Check that service workers are supported
//    if ('serviceWorker' in navigator) {
//      const wb = new Workbox('service-worker.js');
//      // Add an event listener to detect when the registered
//      // service worker has installed but is waiting to activate.
//      wb.addEventListener('waiting', (event) => {
//        this._swSnackbar.open();
//        this._swSnackbar.addEventListener('MDCSnackbar:closed', ev => {
//          if (ev.detail.reason === "reload") {
//            wb.addEventListener('controlling', (event) => {
//              window.location.reload();
//            });
//          }
//        });
//      });
//      wb.register();
//    }
//  }
