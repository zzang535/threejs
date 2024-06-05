import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { useEffect, useRef } from "react";

import { House } from "../utils/House";

// ----- 주제: 스크롤에 따라 움직이는 3D 페이지
// ScrollPage

export default function VariousColorParticle() {
  const rendererRef = useRef(null); // 랜더러 참조

  useEffect(() => {
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    rendererRef.current.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1.5;
    camera.position.z = 4;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Light - spot light
    const ambientLight = new THREE.AmbientLight("white", 2);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight("white", 50);
    spotLight.position.set(5, 5, 5);
    spotLight.castShadow = true; // shadow set
    spotLight.shadow.mapSize.width = 1024; // shadow quaility
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 200;
    scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    const gltfLoader = new GLTFLoader();

    // Mesh
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: "white" })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true; // 나에게 그림자 그려짐
    scene.add(floorMesh);

    // house 5개 만들기
    const houses = [];
    houses.push(
      new House({
        height: 2,
        gltfLoader: gltfLoader,
        scene: scene,
        x: 0,
        z: 0,
      })
    );

    // Draw
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();

      controls.update();
      spotLightHelper.update(); // SpotLightHelper 업데이트

      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    // 버튼
    window.addEventListener("resize", setSize);

    draw();
  }, []);

  return (
    <>
      <div
        className="three-canvas fixed left-0 top-0 border-8 border-blue-500"
        ref={rendererRef}
      ></div>
      <div className="sections relative z-10">
        <section className="section h-screen p-20">
          <h2 className="text-10vmin">01</h2>
        </section>
        <section className="section h-screen  p-20">
          <h2 className="text-10vmin">02</h2>
        </section>
        <section className="section h-screen  p-20">
          <h2 className="text-10vmin">03</h2>
        </section>
        <section className="section h-screen p-20">
          <h2 className="text-10vmin">04</h2>
        </section>
        <section className="section h-screen p-20">
          <h2 className="text-10vmin">05</h2>
        </section>
      </div>
    </>
  );
}
