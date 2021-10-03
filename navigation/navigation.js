import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Landing from "../screens/landing";
import DetailDemandeDiagnostique from "../screens/detail-demande-diagostique";
import Rapport from "../screens/rapport";


const LandingNav = createStackNavigator(
  {
    Landing: Landing,
    DetailDemandeDiagnostique: DetailDemandeDiagnostique,
    Rapport: Rapport
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
