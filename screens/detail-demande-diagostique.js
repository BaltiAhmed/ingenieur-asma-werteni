import React, { useEffect, useCallback, useState, Dimensions } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Button,
} from "react-native";
import { Card, CardItem, Body } from "native-base";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DetailDemandeDiagnostique = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const id = props.navigation.getParam("id");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.42.17:5000/api/demande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.demande);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.42.17:5000/api/demande/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.demande);
    };
    sendRequest();
  }, []);
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list && (
          <View>
            <Image
              source={{ uri: `http://192.168.42.17:5000/${list.image}` }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text>{list.type}</Text>
              <Text>{list.couleur}</Text>
            </View>
            <Card>
              <CardItem header>
                <Text>{list.feuille}</Text>
                <Text>{list.maladie}</Text>
                <Text>{list.blee}</Text>
                <Text>{list.sympthome}</Text>
              </CardItem>
              <CardItem></CardItem>
              <CardItem footer>
                <View style={styles.details}></View>
              </CardItem>
            </Card>
            <Button
              title="Envoyer un rapport"
              onPress={() => {
                props.navigation.navigate({
                  routeName: "Rapport",
                  params: {
                    id: list._id,
                  },
                });
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

DetailDemandeDiagnostique.navigationOptions = {
  headerTitle: "Detail",
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  map: {
    width: "100%",
    height: 265,
  },
});

export default DetailDemandeDiagnostique;
