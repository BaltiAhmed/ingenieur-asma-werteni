import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Picker,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  CheckBox,
  Button,
} from "react-native";
import { Textarea, Input } from "native-base";
import IconEntypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import mime from "mime";
import { Authcontext } from "../context/auth-context";

const Rapport = (props) => {
  const [nom, setNom] = useState();
  const [cause, setCause] = useState();
  const [description, setDescription] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValue1, setSelectedValue1] = useState();

  const auth = useContext(Authcontext);

  const id = props.navigation.getParam("id");
  const submit = async () => {
    let response = await fetch("http://192.168.42.17:5000/api/reponce/ajout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: nom,
        cause: cause,
        description: description,
        traitementId1: selectedValue,
        traitementId2: selectedValue1,
        demandeId: id,
      }),
    });

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);

      throw new Error(responsedata.message);
    }

    let responsedata = await response.json();
    Alert.alert(
      "Message",
      "votre demande est enregistrer, vous recevez une réponce bientot",
      [{ text: "fermer" }]
    );
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.42.17:5000/api/traitement`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.traitement);
    };
    sendRequest();
  }, []);

  console.log(list);

  return (
    <View>
      <ScrollView>
        <View style={{ marginRight: 20 }}>
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Nom
            </Text>

            <Input
              placeholder="Nom"
              value={nom}
              onChangeText={(text) => {
                setNom(text);
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Cause
            </Text>

            <Input
              placeholder="Cause"
              value={cause}
              onChangeText={(text) => {
                setCause(text);
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Description
            </Text>

            <Textarea
              rowSpan={5}
              bordered
              placeholder="Description"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Traitement 1
            </Text>

            {list && (
              <Picker
                selectedValue={selectedValue}
                style={{ height: 60, width: 250, marginLeft: "0%" }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                {list.map((row) => (
                  <Picker.Item label={row.description} value={row._id} />
                ))}
              </Picker>
            )}
          </View>

          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Traitement 2
            </Text>

            {list && (
              <Picker
                selectedValue={selectedValue1}
                style={{ height: 60, width: 250, marginLeft: "0%" }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue1(itemValue)
                }
              >
                {list.map((row) => (
                  <Picker.Item label={row.description} value={row._id} />
                ))}
              </Picker>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Envoyer"
            color="#0086c3"
            onPress={() => {
              submit();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

Rapport.navigationOptions = {
  headerTitle: "Rapport de diagnostique",
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default Rapport;
