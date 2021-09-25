import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Landing from "../screens/landing";
import DetailDemandeDiagnostique from "../screens/detail-demande-diagostique";


const LandingNav = createStackNavigator(
  {
    Landing: Landing,
    DetailDemandeDiagnostique: DetailDemandeDiagnostique
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);


export default createAppContainer(LandingNav);
