import {Workbox} from 'workbox-window';
import {AmbientLight, AnimationMixer, Box3, CircleGeometry, Clock, CubeTextureLoader,
        DirectionalLight, DoubleSide, Euler, GammaEncoding, Math as ThreeMath,
        Matrix4, Mesh, MeshBasicMaterial, Object3D, PerspectiveCamera,
        PCFSoftShadowMap, PlaneBufferGeometry, PlaneGeometry,
        PMREMGenerator, Raycaster, RingGeometry, Scene, ShadowMaterial,
        sRGBEncoding, TextureLoader, Vector3, WebGLRenderer, BoxGeometry} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//Service Worker
if ("serviceWorker" in navigator) {
  const wb = new Workbox('service-worker.js');
  wb.register();
}

//variables
var cube;
var modelObj;

let xrButton = document.getElementById('xr-button');
let xrSession = null;
let xrRefSpace = null;

var arActivated = false;
var reticle;
// WebGL scene globals.
let gl = null;


//Scene amd Camera
var scene = new Scene();
scene.background = null;

//var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 100000);
var camera = new PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.matrixAutoUpdate = false;
scene.add(camera);

var renderer = new WebGLRenderer({antialias: true});
renderer.autoClear = false; //needed?

//Renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//Inital function that starts AR off. Establishes AR to button with eventlistener
function init() {

  //Load in Models
  //TODO new function for adding models
  var geometry = new BoxGeometry( 0.01, 0.01, 0.01 );
  var green = new MeshBasicMaterial( {color: 0x00ff00} ); //Green
  var yellow = new MeshBasicMaterial( {color: 0xffff00} ); //Yellow
  cube = new Mesh( geometry, yellow );


  var loader = new GLTFLoader();
  loader.load(
    'models/Earth.glb',
    gltf => loadModel (gltf),
    xhr => onProgress(xhr),
    error => onError(error)
  );


  if (navigator.xr) {
    checkSupportedState();
  }
}

function loadModel(gltf) {
  modelObj = gltf.scene;
  modelObj.name = 'model';
  // scene.add(modelObj);
}

function onProgress(xhr) {
  //console.log((xhr.loaded / xhr.total *100) + '% loaded');
}

function onError(error) {
  console.log(error);
}

//Check if AR is supported on the device
function checkSupportedState() {
  navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
    if (supported) {
      // xrButton.innerHTML = 'Enter AR';

      //TODO: EventListeners for AR
      xrButton.addEventListener('click', toggleAR);
      console.log("AR READY!");
    } else {

      // xrButton.innerHTML = 'AR not found';
      console.log("AR unavailable");
    }
  });
}

  async function toggleAR(){
    if (arActivated){
      console.log("AR is already activated");
      return; //TODO: Would close down the XR
    }
    return activateAR();
  }

  async function activateAR(){
    try{
      xrSession = await navigator.xr.requestSession('immersive-ar');
      xrRefSpace = await xrSession.requestReferenceSpace('local');


      //TODO: handle select

      let gl = renderer.getContext();
      await gl.makeXRCompatible();
      let layer = new XRWebGLLayer(xrSession, gl);
      xrSession.updateRenderState({ baseLayer: layer });

      //TODO 'end' eventlistener

      xrSession.requestAnimationFrame(renderXR);
      arActivated = true;


    } catch (error){
      console.log("Catch: "+ error);
    }
  }

  function renderXR(timestamp, xrFrame){

    if (!xrFrame || !xrSession || !arActivated){
      return;
    }

    let pose = xrFrame.getViewerPose(xrRefSpace);
    if (!pose){
      xrSession.requestAnimationFrame(renderXR);
      return;
    }

    if (!reticle)
      createReticle();

    const x=0;
    const y=0;
    let raycaster = new Raycaster();
    raycaster.setFromCamera({ x, y }, camera);

    let rayOrigin = raycaster.ray.origin;
    let rayDirection = raycaster.ray.direction;
    let ray = new XRRay({x : rayOrigin.x, y : rayOrigin.y, z : rayOrigin.z},
      {x : rayDirection.x, y : rayDirection.y, z : rayDirection.z});

    //TODO: test whether object exists
    //requestHitTest(ray);
    xrSession.requestHitTest(ray, xrRefSpace).then((results) => {
      if (results.length) {
        console.log("raycast good");
        let hitResult = results[0];
        reticle.visible = true;
        let hitMatrix = new Matrix4();
        hitMatrix.fromArray(hitResult.hitMatrix);
        reticle.position.setFromMatrixPosition(hitMatrix);
        //lookAtOnY(reticle, camera, null); //needed

      } else {
        console.log("Keep looking");
        reticle.visible = false;
      }
    });

    let xrLayer = xrSession.renderState.baseLayer;
    renderer.setFramebuffer(xrLayer.framebuffer);

    for (let xrView of pose.views){
      let viewport = xrLayer.getViewport(xrView);
      renderView(xrView, viewport);
    }

    xrSession.requestAnimationFrame(renderXR);
  }

  function renderView(xrView, viewport){
    renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
    const viewMatrix = xrView.transform.inverse.matrix;

    //camera
    camera.projectionMatrix.fromArray(xrView.projectionMatrix);
    camera.matrix.fromArray(viewMatrix).getInverse(camera.matrix);
    camera.updateMatrixWorld(true);

    renderer.render(scene, camera)
  }

  function createReticle(){
    if (reticle){
      return;
    }

    reticle = new Object3D();

    let ringGeometry = new RingGeometry(0.01, 0.011, 24, 1);
    let material = new MeshBasicMaterial({ color: 0x34d2eb });
    ringGeometry.applyMatrix(new Matrix4().makeRotationX(ThreeMath.degToRad(-90)));
    let circle = new Mesh(ringGeometry, material);
    circle.position.y = 0.03;

    //TODO: box to be atop retical
    cube.position.y = 1;

    reticle.add(circle);
    reticle.add(cube);
    reticle.name = 'reticle';
    scene.add(reticle)
  }

  //Levels out the redical? NEEDED?
  function lookAtOnY(looker, target, origin) {
    const targetPos = new Vector3().setFromMatrixPosition(target.matrixWorld);

    const angle = Math.atan2(targetPos.x - looker.position.x, targetPos.z - looker.position.z);
    looker.rotation.set(0, angle, 0);
    if (origin !== null) {
      origin.applyEuler(new Euler(0, angle, 0));
    }
  }


  init();
