import React, { useState, useEffect } from "react";
import { Image, View, Text, Dimensions } from "react-native";

import { Magnetometer } from "expo-sensors";
import useStore from "../../state";
export default App = () => {
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(z, x) >= 0) {
        angle = Math.atan2(z, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(z, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };
  const MyConvert = (degree) => {
    return degree > 180 ? degree - 360 : degree;
  };
  useEffect(() => {
    console.log("degree is", _degree(magnetometer));
    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
      return (
        ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    };
    const newNum = Number(_degree(magnetometer)).map(0, 360, -180, 180);

    useStore.setState({
      PhoneCompass: (newNum * Math.PI) / 180,
    });
  }, [magnetometer]);

  return null;
};
