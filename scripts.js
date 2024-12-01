import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 1.5, 1.5);

// Adding Directional Light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF,3); // Color: FFFFFF, Intensity: 1
directionalLight.position.set(-7.11,4.57, 93.91); // Position: x=-7.11, y=59.03, z=51.67

// Shadow settings
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2000; // Shadow map resolution
directionalLight.shadow.mapSize.height = 2000;
directionalLight.shadow.radius = 1; // Shadow blur effect

// Shadow camera boundaries (for better shadow accuracy)
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;

// Add light to the scene
scene.add(directionalLight);

// Load 3D Model
let model, head;
const loader = new GLTFLoader();
loader.load(
    '3d/harry.glb',
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        head = model.getObjectByName("Head"); // Adjust to match the name of your head object
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);

// Mouse and Touch Handlers
let mouseX = 0;
let mouseY = 0;

function handleMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 1 - 0.5;
    mouseY = -((event.clientY / window.innerHeight) * -0.5);
}

function handleTouchMove(event) {
    event.preventDefault();

    const touch = event.touches[0];
    mouseX = (touch.clientX / window.innerWidth) * 1 - 0.5;
    mouseY = -((touch.clientY / window.innerHeight) * -0.5);
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('touchmove', handleTouchMove, { passive: false });

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    if (head) {
        head.rotation.y = mouseX * (Math.PI / 4);
        head.rotation.x = mouseY * (Math.PI / 8);
    }

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
