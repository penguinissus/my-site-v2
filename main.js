import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

//npx vite build

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene =  new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 0.1, 1000);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);

// const renderer = new THREE.WebGLRenderer();
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
    antialias: true
});

function main() {
    renderer.setSize(WIDTH*0.7, HEIGHT*0.7);
    //this adds the thing to the body
    document.body.appendChild(renderer.domElement);

    scene.add(cube);

    //add french horn
    // {
    //     const objLoader = new OBJLoader();
    //     objLoader.load('/models/frenchHorn.obj', (root) => {
    //         scene.add(root);
    //     });
    // }

    camera.position.z = 5;

    renderer.setAnimationLoop(animate);
}

function animate() {
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

main();