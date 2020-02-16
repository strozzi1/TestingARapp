import {Workbox} from 'workbox-window';
import {WebGLRenderer, Scene, PerspectiveCamera, PointLight, BoxGeometry, MeshBasicMaterial, Mesh, Vector3, Raycaster} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


if ("serviceWorker" in navigator) {
  const wb = new Workbox('service-worker.js');
  wb.register();
}

//Scene amd Camera
var scene = new Scene();
scene.background = null;

//var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 100000);
var camera = new PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.matrixAutoUpdate = false;
scene.add(camera);

var renderer = new WebGLRenderer({antialias: true});

//scene.matrixAutoUpdate = false; //Alexis has it on the camera
renderer.autoClear = false; //needed?


//Renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new BoxGeometry( 10, 10, 10 );
var green = new MeshBasicMaterial( {color: 0x00ff00} ); //Green
var yellow = new MeshBasicMaterial( {color: 0xffff00} ); //Yellow
var cube = new Mesh( geometry, green );
scene.add( cube );

// var modelObj;
// var loader = new GLTFLoader();
// loader.load(
//   'models/Earth.glb',
//   gltf => loadModel (gltf),
//   xhr => onProgress(xhr),
//   error => onError(error)
// );
//
// var loadModel = (gltf) => {
//   modelObj = gltf.scene;
//   modelObj.name = 'model';
//   scene.add(modelObj);
// };
//
// var onProgress = (xhr) => {
//   //console.log((xhr.loaded / xhr.total *100) + '% loaded');
// };
//
// var onError = (error) => {
//   console.log(error);
// }


  let xrButton = document.getElementById('xr-button');
  let xrSession = null;
  let xrRefSpace = null;
  let xrViewSpace = null;
  var xrHitTestSource;
  var arActivated = false;

  // WebGL scene globals.
  let gl = null;

  //Inital function that starts AR off. Establishes AR to button with eventlistener
  function initXR() {
    if (navigator.xr) {
      xrButton.addEventListener('click', toggleAR);
      //navigator.xr.addEventListener('devicechange', checkSupportedState);
      //checkSupportedState();
    }
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

      xrSession.requestReferenceSpace('viewer').then((refSpace) => {
        xrViewSpace = refSpace;
        xrSession.requestHitTestSource({ space: xrViewSpace }).then((hitTestSource) => {
          xrHitTestSource = hitTestSource;
        });
      });

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
    console.log(xrFrame);

    if (!xrFrame || !xrSession || !arActivated){
      // if (!xrFrame){
      //   console.log("XRFRAME FAIL");
      // }
      //
      // if (!xrSession){
      //   console.log("XRSESSION FAIL");
      // }
      //
      // if (!arActivated){
      //   console.log("oups XD");
      // }
      return;
    }

    let pose = xrFrame.getViewerPose(xrRefSpace);
    if (!pose){
      //console.log("No pose");
      xrSession.requestAnimationFrame(renderXR);
      return;
    } //else {
    //   console.log("pose");
    // }

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
        cube.visible = true; //needed?
        let hitMatrix = new Matrix4();
        hitMatrix.fromArray(hitResult.hitMatrix);
        cube.position.setFromMatrixPosition(hitMatrix);

      } else {
        //console.log(results);
      }
    });

    //Did get it to show up
    // if (xrHitTestSource && pose){
    //   console.log("new Way");
    //   let hitTestResults = xrFrame.getHitTestResults(xrHitTestSource);
    //   if (hitTestResults.length > 0){
    //     console.log("> 0");
    //     let testPose = hitTestResults[0].getPose(xrRefSpace);
    //     cube.visible = true;
    //     cube.matrix = testPose.transform.matrix;
    //   }
    // }


    let xrLayer = xrSession.renderState.baseLayer;
    renderer.setFramebuffer(xrLayer.framebuffer); //bindFramebuffer

    for (let xrView of pose.views){
      let viewport = xrLayer.getViewport(xrView);
      renderView(xrView, viewport);
    }

    xrSession.requestAnimationFrame(renderXR);
  }

  function renderView(xrView, viewport){
    //console.log("RenderView function");
    renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
    const viewMatrix = xrView.transform.inverse.matrix;

    //camera
    camera.projectionMatrix.fromArray(xrView.projectionMatrix);
    camera.matrix.fromArray(viewMatrix).getInverse(camera.matrix);
    camera.updateMatrixWorld(true);

    renderer.render(scene, camera)
  }

  // function requestHitTest(ray){
  //   xrSession.requestHitTest(ray, xrRefSpace).then((results) => {
  //     if (results.length) {
  //       console.log("raycast good");
  //       let hitResult = results[0];
  //       cube.visible = true; //needed?
  //       let hitMatrix = new Matrix4();
  //       hitMatrix.fromArray(hitResult.hitMatrix);
  //       cube.position.setFromMatrixPosition(hitMatrix);
  //
  //     } else {
  //       console.log(results);
  //     }
  //   }).catch((error) => {console.log("Hit Test Failed: " + error)});
  // }

  //Check if AR is supported on the device
  function checkSupportedState() {
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      if (supported) {
        // xrButton.innerHTML = 'Enter AR';
        console.log("AR READY!");
      } else {
        // xrButton.innerHTML = 'AR not found';
        console.log("AR unavailable");
      }

      // xrButton.disabled = !supported;
    });
  }

  initXR();
