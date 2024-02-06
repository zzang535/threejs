import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import { Body, Box, Vec3 } from "cannon-es";
import dominoGlb from "../models/domino.glb";

export class Domino {
  constructor(info) {
    this.index = info.index;
    this.scene = info.scene;
    this.cannonWorld = info.cannonWorld;

    this.width = info.width || 0.6;
    this.height = info.width || 1;
    this.depth = info.width || 0.2;

    this.x = info.x || 0;
    this.y = info.y || 0.5;
    this.z = info.z || 0;

    this.rotationY = info.rotationY || 0;

    info.gltfLoader.load(dominoGlb, (glb) => {
      this.modelMesh = glb.scene.children[0];
      this.modelMesh.name = `${this.index}번 도미노`;
      this.modelMesh.castShadow = true;
      this.modelMesh.position.set(this.x, this.y, this.z);
      this.scene.add(this.modelMesh);

      this.setCannonBody();
    });
  }

  setCannonBody() {
    const shape = new Box(
      new Vec3(this.width / 2, this.height / 2, this.depth / 2)
    );

    this.cannonBody = new Body({
      mass: 1,
      position: new Vec3(this.x, this.y, this.z),
      shape,
    });

    this.cannonBody.quaternion.setFromAxisAngle(
      new Vec3(0, 1, 0), // y축
      this.rotationY
    );

    this.modelMesh.cannonBody = this.cannonBody; // mesh 에 cannonbody 를 넣어서 raycaster 에서 접근 가능하도록

    this.cannonWorld.addBody(this.cannonBody);
  }
}
