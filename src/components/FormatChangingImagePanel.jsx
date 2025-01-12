import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

import { useEffect, useRef } from "react";

import { ImagePanel } from "../utils/ImagePanel";

// ----- 주제: 형태가 바뀌는 이미지 패널 만들기
// FormatChangingImagePanel

export default function VariousColorParticle() {
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
    const PlaneGeometry = new THREE.PlaneGeometry(0.3, 0.3);

    const textureLoader = new THREE.TextureLoader();

    // Points
    const sphereGeomery = new THREE.SphereGeometry(1, 8, 8);
    const spherePositionArray = sphereGeomery.attributes.position.array;
    const randomPositionArray = [];

    for (let i = 0; i < spherePositionArray.length; i++) {
      randomPositionArray.push((Math.random() - 0.5) * 10);
    }

    // 여러개의 plane mesh 생성
    const imagePanels = [];
    let imagePanel;
    for (let i = 0; i < spherePositionArray.length; i += 3) {
      imagePanel = new ImagePanel({
        textureLoader,
        scene,
        geometry: PlaneGeometry,
        // imagePath: `../assets/randomImages`,
        x: spherePositionArray[i],
        y: spherePositionArray[i + 1],
        z: spherePositionArray[i + 2],
      });

      imagePanels.push(imagePanel);
    }

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

    function setShape(e) {
      let array;
      const type = e.target.dataset.type;
      switch (type) {
        case "random":
          console.log("random");
          array = randomPositionArray;
          break;
        case "sphere":
          console.log("sphere");
          array = spherePositionArray;
          break;
      }

      for (let i = 0; i < imagePanels.length; i++) {
        gsap.to(
          imagePanels[i].mesh.position, // which object
          {
            duration: 2, // time
            x: array[i * 3],
            y: array[i * 3 + 1],
            z: array[i * 3 + 2],
          }
        );

        // 회전
        if (type === "random") {
          gsap.to(
            imagePanels[i].mesh.rotation, // which object
            {
              duration: 2, // time
              x: 0,
              y: 0,
              z: 0,
            }
          );
        } else if (type === "sphere") {
          gsap.to(
            imagePanels[i].mesh.rotation, // which object
            {
              duration: 2, // time
              x: imagePanels[i].sphereRotationX,
              y: imagePanels[i].sphereRotationY,
              z: imagePanels[i].sphereRotationZ,
            }
          );
        }
      }
    }

    // 버튼
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btns");

    const randomBtn = document.createElement("button");
    randomBtn.dataset.type = "random";
    randomBtn.style.cssText = "position: absolute; left: 20px; top: 20px;";
    randomBtn.innerHTML = "Random";
    btnWrapper.append(randomBtn);

    const sphereBtn = document.createElement("button");
    sphereBtn.dataset.type = "sphere";
    sphereBtn.style.cssText = "position: absolute; left: 20px; top: 50px;";
    sphereBtn.innerHTML = "Sphere";
    btnWrapper.append(sphereBtn);

    document.body.append(btnWrapper);

    // 이벤트
    btnWrapper.addEventListener("click", setShape);
    window.addEventListener("resize", setSize);

    draw();

    return () => {
      // 이벤트 리스너 제거
      btnWrapper.removeEventListener("click", setShape);
      window.removeEventListener("resize", setSize);

      // 버튼 제거
      document.body.removeChild(btnWrapper);
    };
  }, []);

  return <div ref={rendererRef}></div>;
}
