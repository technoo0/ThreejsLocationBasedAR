import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import compass from "../screens/compass";
const screens = {
  Home: {
    screen: HomeScreen,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
