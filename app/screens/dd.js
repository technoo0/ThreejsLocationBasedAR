import Expo from "expo";
import React, { Component, useRef, useState } from "react";
import {
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import ExpoTHREE from "expo-three";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import useStore from "../../state";

import { useEffect } from "react/cjs/react.development";
import { Button, View } from "react-native";
let camera = new PerspectiveCamera(75, 0.4, 0.01, 1000);
let scene = new Scene();

export default function App() {
  camera.position.z = 5;

  const phoneAngle = useStore((state) => state.Phonedegree);
  const phoneCompassAngle = useStore((state) => state.PhoneCompass);

  useEffect(() => {
    camera.rotation.x = phoneAngle;
    camera.rotation.y = phoneCompassAngle;
    // console.log(phoneCompassAngle);
  }, [phoneAngle, phoneCompassAngle]);

  _onGLContextCreate = async (gl) => {
    // 1. Scene
    camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.01,
      1000
    );

    // 3. Renderer
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    cube.position.z = -5;
    scene.add(cube);

    // camera.position.z = 5;

    //scene.add(cube);

    const render = () => {
      requestAnimationFrame(render);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };
  return <GLView style={{ flex: 1 }} onContextCreate={_onGLContextCreate} />;
}
