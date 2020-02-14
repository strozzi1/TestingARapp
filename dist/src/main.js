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
var camera= new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 100000);
var renderer = new WebGLRenderer({antialias: true});

//Renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new BoxGeometry( 100, 100, 100 );
var material = new MeshBasicMaterial( {color: 0x00ff00} );
var cube = new Mesh( geometry, material );

scene.add( cube );

camera.position.z = 1000;

var render = () => {
  requestAnimationFrame( render );

  renderer.render( scene, camera);
};

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

  checkSupportedState();
      // function initXR() {
      //   if (!window.isSecureContext) {
      //     let message = "WebXR unavailable due to insecure context";
      //     document.getElementById("warning-zone").innerText = message;
      //   }
      //
      //   if (navigator.xr) {
      //     xrButton.addEventListener('click', onButtonClicked);
      //     navigator.xr.addEventListener('devicechange', checkSupportedState);
      //     checkSupportedState();
      //   }
      // }
      //
      // function onButtonClicked() {
      //   if (!xrSession) {
      //       // Ask for an optional DOM Overlay, see https://immersive-web.github.io/dom-overlays/
      //       // Use BODY as the root element.
      //       navigator.xr.requestSession('immersive-ar', {
      //           optionalFeatures: ['dom-overlay'],
      //           domOverlay: {root: document.body}
      //       }).then(onSessionStarted, onRequestSessionError);
      //   } else {
      //     xrSession.end();
      //   }
      // }
      //
      // function onSessionStarted(session) {
      //   xrSession = session;
      //   xrButton.innerHTML = 'Exit AR';
      //
      //   // Show which type of DOM Overlay got enabled (if any)
      //   document.getElementById('session-info').innerHTML = 'DOM Overlay type: ' + session.domOverlayState.type;
      //
      //   session.addEventListener('end', onSessionEnded);
      //   let canvas = document.createElement('canvas');
      //   gl = canvas.getContext('webgl', {
      //     xrCompatible: true
      //   });
      //   session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl) });
      //   session.requestReferenceSpace('local').then((refSpace) => {
      //     xrRefSpace = refSpace;
      //     session.requestAnimationFrame(onXRFrame);
      //   });
      // }
      //
      // function onRequestSessionError(ex) {
      //   alert("Failed to start immersive AR session.");
      //   console.error(ex.message);
      // }
      //
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
      //
      // function onXRFrame(t, frame) {
      //   let session = frame.session;
      //   session.requestAnimationFrame(onXRFrame);
      //   let pose = frame.getViewerPose(xrRefSpace);
      //
      //   if (pose) {
      //     gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);
      //
      //     // Update the clear color so that we can observe the color in the
      //     // headset changing over time. Use a scissor rectangle to keep the AR
      //     // scene visible.
      //     const width = session.renderState.baseLayer.framebufferWidth;
      //     const height = session.renderState.baseLayer.framebufferHeight;
      //     gl.enable(gl.SCISSOR_TEST);
      //     gl.scissor(width / 4, height / 4, width / 2, height / 2);
      //     let time = Date.now();
      //     gl.clearColor(Math.cos(time / 2000), Math.cos(time / 4000), Math.cos(time / 6000), 0.5);
      //     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      //   }
      // }
      //
      // initXR();



render();
