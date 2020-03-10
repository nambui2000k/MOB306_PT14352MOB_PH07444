import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";

import InfoStory from "./Story/info-story";

export function Home({ route, navigation }) {
  const [storys, setStorys] = useState([]);
  const fetchSubjects = () => {
    return fetch(API, {})
      .then(response => response.json())
      .then(responseJson => {
        {
          setStorys(responseJson);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  if (String(route.params) != "undefined") {
    const { data } = route.params;
    const newStory = data;
    let check = 0;
    let positionEdit;
    for (let i = 0; i < storys.length; i++) {
      if (String(data.id) == String(storys[i].id)) {
        check++;
        positionEdit = i;
      }
    }
    if (check == 0) {
      storys.push(newStory);
    } else {
      storys[positionEdit] = newStory;
    }
    check = 0;
  }

  const deleteStory = (id) => {
    const newStory = storys.filter(item => item.id != id);
    setStorys(newStory);
  };

  const API = "https://5e6659002aea440016afbd71.mockapi.io/api/storys";

  const urlLogo =
    "https://upload.wikimedia.org/wikipedia/vi/8/80/FPT_New_Logo.png";

  const [userNameInput, setName] = useState("");
  const [ageInput, setAge] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [errorUserName, setErrorUserName] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const handleDeleteStory = (nameStory, id) => {
    deleteStory(id);
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then()
      .catch(error => console.log(error));
  };
  const itentDetail = item => {
    navigation.navigate("Detail", { item: item });
  };
  const itentEdit = item => {
    navigation.navigate("Edit", { data: item });
  };

  const checkValidate = () => {
    Keyboard.dismiss();
    if (userNameInput.toString() == "") {
      setErrorUserName("Vui lòng không để trống tên người dùng");
      return;
    } else {
      setErrorUserName("");
    }
    if (ageInput == "") {
      setErrorAge("Vui lòng không để trống tuổi người dùng");
      return;
    } else {
      setErrorAge("");
    }

    if (isNaN(ageInput.toString())) {
      setErrorAge("Sai định dạng tuổi");
      return;
    } else {
      setErrorAge("");
    }
    if (parseInt(ageInput.toString()) < 18) {
      setErrorAge("Tuổi phải từ 18 tuổi trở lên");
      return;
    } else {
      setErrorAge("");
    }
    setShowModal(false);
  };
  return (
    <ImageBackground
      source={require("./Image/bgr_blur.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <Text style={styles.userName}>Xin chào, {userNameInput}</Text>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Add");
            }}
            style={[styles.buttonAdd]}
          >
            <Text style={[styles.text]}>Thêm truyện</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.flatlist}
          data={storys}
          renderItem={({ item }) => (
            <InfoStory
              item={item}
              handleDelete={handleDeleteStory}
              itent={itentDetail}
              itentEt={itentEdit}
            />
          )}
          keyExtractor={(item, index) => index}
        />

        <Modal visible={showModal}>
          <ImageBackground
            source={require("./Image/bgr_blur.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <KeyboardAvoidingView behavior="position">
              <View style={styles.containerImageLogo}>
                <Image style={styles.image} source={{ uri: urlLogo }} />
              </View>
              <View style={styles.modal}>
                <OutlinedTextField
                  errorColor="#FF0000"
                  placeholderTextColor="#fff"
                  baseColor="#fff"
                  textColor="#fff"
                  returnKeyType={"next"}
                  error={errorUserName}
                  onChangeText={userNameInput => setName(userNameInput)}
                  label="Họ và tên"
                />
                <OutlinedTextField
                  errorColor="#FF0000"
                  baseColor="#fff"
                  textColor="#fff"
                  placeholderTextColor="#fff"
                  returnKeyType={"next"}
                  error={errorAge}
                  keyboardType="phone-pad"
                  onChangeText={ageInput => setAge(ageInput)}
                  label="Tuổi"
                />

                <View style={styles.containerButton}>
                  <TouchableOpacity
                    disabled={false}
                    onPress={() => checkValidate()}
                    style={[styles.button]}
                  >
                    <Text style={[styles.text]}>Vào đọc truyện</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 210,
    display: "flex",
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2AC062",
    shadowColor: "#2AC062",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },
  buttonAdd: {
    width: 210,
    display: "flex",
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF00FF",
    shadowColor: "#FF00FF",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#FFFFFF"
  },
  modal: {
    padding: 30
  },
  containerButton: {
    margin: "5%",
    alignContent: "center",
    alignItems: "center"
  },
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: "contain"
  },
  containerImageLogo: {
    marginTop: "15%",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%"
  },
  userName: {
    padding: "2%",
    marginLeft: "2%",
    fontSize: 20,
    color: "rgba(255,255,255,0.8)"
  },
  flatlist: {
    height: "70%"
  }
});
