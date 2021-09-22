import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import DD from "./dd";
import PhoneDegree from "./PhoneDegree";
import Compass from "./compass";
import { Camera } from "expo-camera";
export default function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [myimage, setmyimage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const myCamera = useRef(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const Snap = async () => {
    if (myCamera.current) {
      let photo = await myCamera.current.takePictureAsync();
      setmyimage(photo);
      navigation.navigate("ReviewImg", { imSrc: photo });
      console.log(photo);
    }
  };

  const handelpress = () => {
    console.log("hello");
  };
  return (
    <View style={styles.container}>
      <Camera ref={myCamera} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <DD />
          <PhoneDegree />
          <Compass />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  imcont: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  im: {
    width: "100%",
    height: "100%",
  },
  button: { flex: 0.1, alignSelf: "flex-end", alignItems: "center" },
  text: { fontSize: 18, color: "white" },
  button2: {
    maxHeight: 5,
  },
});
