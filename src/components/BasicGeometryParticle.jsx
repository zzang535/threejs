import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef } from "react";

// ----- 주제: 기본 Geometry 파티클

export default function BasicGeometryParticle() {
  const rendererRef = useRef(null); // 랜더러 참조

  useEffect(() => {
    // Renderer
    // const canvas = document.querySelector("#three-canvas");
    const renderer = new THREE.WebGLRenderer({
      // ref 로 랜더링시에는 canvas 직접 넣을 필요 없음
      // canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    rendererRef.current.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

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

    // Light
    const ambientLight = new THREE.AmbientLight("white", 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("white", 1);
    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Mesh
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: false, // 기본값 true
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();

      controls.update();

      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener("resize", setSize);

    draw();
  }, []);

  return <div ref={rendererRef}></div>;
}
