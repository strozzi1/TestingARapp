import {Workbox} from 'workbox-window';
import {WebGLRenderer, Scene, PerspectiveCamera, PointLight, BoxGeometry, MeshBasicMaterial, Mesh, Vector3} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


if ("serviceWorker" in navigator) {
  const wb = new Workbox('service-worker.js');
  wb.register();
}

//Scene amd Camera
var scene = new Scene();
scene.background = null;

var camera= new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 100000);
var renderer = new WebGLRenderer({antialias: true});

//camera
function createCamera() {
    // this._settings = MainApplication.CAMERA_SETTINGS;
    // this._camera = new PerspectiveCamera(
    //     this._settings.viewAngle,
    //     this._aspect,
    //     this._settings.near,
    //     this._settings.far
    // );
    // // Disable autoupdating because these values will be coming from WebXR.
    // this._camera.matrixAutoUpdate = false;
}

scene.matrixAutoUpdate = false; //Alexis has it on the camera
renderer.autoClear = false;


//Renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new BoxGeometry( 100, 100, 100 );
var green = new MeshBasicMaterial( {color: 0x00ff00} ); //Green
var yellow = new MeshBasicMaterial( {color: 0xffff00} ); //Yellow

var cube = new Mesh( geometry, green );

scene.add( cube );

camera.position.z = 1000;

var render = () => {
  requestAnimationFrame( render );

  renderer.render( scene, camera);
};



//RENDER
// renderView(xrView, viewport) {
//     this._renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
//     const viewMatrix = xrView.transform.inverse.matrix;
//     // Update the camera matrices.
//     this._camera.projectionMatrix.fromArray(xrView.projectionMatrix);
//     this._camera.matrix.fromArray(viewMatrix).getInverse(this._camera.matrix);
//     this._camera.updateMatrixWorld(true);
//
//     this._renderer.render(this._scene, this._camera);
//   }




// var light = new PointLight( 0xfffee8, 10, 0, 0 );
// light.position.z = 1500;
// scene.add(light);


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


//TESTING CODE:
  let xrButton = document.getElementById('xr-button');
  let xrSession = null;
  let xrRefSpace = null;

  // WebGL scene globals.
  let gl = null;

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

  //Inital function that starts AR off. Establishes AR to button with eventlistener
  function initXR() {

    //Nessisary?
    // if (!window.isSecureContext) {
    //   let message = "WebXR unavailable due to insecure context";
    //   // document.getElementById("warning-zone").innerText = message;
    //   console.log(message);
    // }
    //
    if (navigator.xr) {
      xrButton.addEventListener('click', onButtonClicked);
      navigator.xr.addEventListener('devicechange', checkSupportedState);
      checkSupportedState();
    }
  }

  function onButtonClicked() {
    if (!xrSession) {
        // Ask for an optional DOM Overlay, see https://immersive-web.github.io/dom-overlays/
        // Use BODY as the root element.

        console.log("AR Start");

        navigator.xr.requestSession('immersive-ar'
        // , {
        //     optionalFeatures: ['dom-overlay'],
        //     domOverlay: {root: document.body}
        // }
      ).then(onSessionStarted, onRequestSessionError);
    } else {
      //xrSession.end();
      console.log("AR ENDED");
    }
  }

  async function onSessionStarted(session) {
    console.log("AR session started");
    xrSession = session;

    session.requestReferenceSpace('local');

    let gl = renderer.getContext();
    await gl.makeXRCompatible();
    let layer = new XRWebGLLayer(session, gl);
    session.updateRenderState({ baseLayer: layer });

    let xrLayer = session.renderState.baseLayer;
    renderer.setFramebuffer(xrLayer.framebuffer);

    //Pose goes here

    session.requestAnimationFrame(onXRFrame);


    // xrButton.innerHTML = 'Exit AR';

    // Show which type of DOM Overlay got enabled (if any)
    // document.getElementById('session-info').innerHTML = 'DOM Overlay type: ' + session.domOverlayState.type;
    //
    // session.addEventListener('end', onSessionEnded);
    // let canvas = document.createElement('canvas');
    //
    // gl = canvas.getContext('webgl', {
    //   xrCompatible: true
    // });
    // session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });
    // session.requestReferenceSpace('local').then((refSpace) => {
    //   xrRefSpace = refSpace;
    //   session.requestAnimationFrame(onXRFrame);
    // });
  }

  function onRequestSessionError(ex) {
    alert("Failed to start immersive AR session.");
    console.error(ex.message);
  }

      // function onEndSession(session) {
      //   session.end();
      // }
      //
      // function onSessionEnded(event) {
      //   xrSession = null;
      //   xrButton.innerHTML = 'Enter AR';
      //   document.getElementById('session-info').innerHTML = '';
      //   gl = null;
      // }

  function onXRFrame(t, frame) {
    //let session = frame.session;
    let xrLayer = session.renderState.baseLayer;
    renderer.setFramebuffer(xrLayer.framebuffer);
    session.requestAnimationFrame(onXRFrame);
        // let pose = frame.getViewerPose(xrRefSpace);
        //

  }

      initXR();

// render();
