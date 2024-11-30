import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
    import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);


    camera.position.set(0, 1.5, 1.5);



    const spotLight1 = new THREE.SpotLight(0xFFFFFF,10);
    spotLight1.position.set(-832.53, 610.16, -228.70);
    spotLight1.rotation.set(THREE.MathUtils.degToRad(-6.54), THREE.MathUtils.degToRad(8.39), THREE.MathUtils.degToRad(-73.08));
    spotLight1.distance = 1795;
    spotLight1.angle = THREE.MathUtils.degToRad(47);
    spotLight1.penumbra = 1;
    spotLight1.decay = 10;
    scene.add(spotLight1);


    const spotLight2 = new THREE.SpotLight(0xFFFFFF,3);
    spotLight2.position.set(500, 200, 100);
    spotLight2.rotation.set(THREE.MathUtils.degToRad(-30), THREE.MathUtils.degToRad(20), THREE.MathUtils.degToRad(0));
    spotLight2.distance = 1500;
    spotLight2.angle = THREE.MathUtils.degToRad(30);
    spotLight2.penumbra = 0.9;
    spotLight2.decay = 10;
    scene.add(spotLight2);

    const spotLight3 = new THREE.SpotLight(0xFFFFFF,1);
    spotLight2.position.set(0, 13.55, 69.62);
    spotLight2.rotation.set(THREE.MathUtils.degToRad(-30), THREE.MathUtils.degToRad(20), THREE.MathUtils.degToRad(0));
    spotLight2.distance = 1500;
    spotLight2.angle = THREE.MathUtils.degToRad(30);
    spotLight2.penumbra = 0.9;
    spotLight2.decay =10;
    scene.add(spotLight3);


    let model, head;


    const loader = new GLTFLoader();
    loader.load(
        '3d/meee.glb', 
        (gltf) => {
            model = gltf.scene;
            scene.add(model)

            head = model.getObjectByName("Head");

        },
        undefined,
        (error) => {
            console.error('An error occurred while loading the model:', error);
        }
    );
    let mouseX = 0;
    let mouseY = 0;

    function handleMouseMove(event) {
        mouseX = (event.clientX / window.innerWidth) * 1 - 0.5;
        mouseY = -((event.clientY / window.innerHeight) * - 0.5);
    }

    function handleTouchMove(event) {
        event.preventDefault();

        const touch = event.touches[0];
        mouseX = (touch.clientX / window.innerWidth) * 1 - 0.5;
        mouseY = -((touch.clientY / window.innerHeight) * - 0.5);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    function animate() {
        requestAnimationFrame(animate);

        if (head) {
            head.rotation.y = mouseX * (Math.PI / 4);
            head.rotation.x = mouseY * (Math.PI / 8); 
        }
        renderer.render(scene, camera);
    }
 



    animate();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });