import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ImageBackground
} from "react-native";
import {
  OutlinedTextField
} from "react-native-material-textfield";
import SwitchSelector from "react-native-switch-selector";

export function Add({ navigation }) {
  const options = [
    { label: "Đầy", value: true },
    { label: "Chưa đầy", value: false }
  ];
  const [nameStory, setNameStory] = useState("");
  const [imageStory, setImageStory] = useState("");
  const [typeStory, setTypeStory] = useState("");
  const [totalChaptersStory, setTotalChaptersStory] = useState("");
  const [statusStory, setStatusStory] = useState(true);

  const [errNameStory, setErrNameStory] = useState("");
  const [errImageStory, setErrImageStory] = useState("");
  const [errTypeStory, setErrTypeStory] = useState("");
  const [errTotalChaptersStory, setErrTotalChaptersStory] = useState("");

  const API = "https://5e6659002aea440016afbd71.mockapi.io/api/storys";
  const editStory = () => {
    Keyboard.dismiss();
    if (nameStory.toString() == "") {
      setErrNameStory("Vui lòng không để trống tên truyện");
      return;
    } else {
      setErrNameStory("");
    }

    if (imageStory.toString() == "") {
      setErrImageStory("Vui lòng không để trống đường dẫn ảnh");
      return;
    } else {
      setErrImageStory("");
    }

    if (typeStory.toString() == "") {
      setErrTypeStory("Vui lòng không để trống thể loại");
      return;
    } else {
      setErrTypeStory("");
    }
    if (totalChaptersStory == "") {
      setErrTotalChaptersStory("Vui lòng không để trống số chương");
      return;
    } else {
      setErrTotalChaptersStory("");
    }

    if (isNaN(totalChaptersStory.toString())) {
      setErrTotalChaptersStory("Sai định dạng số");
      return;
    } else {
      setErrTotalChaptersStory("");
    }

    const story = {
      name: nameStory,
      category: typeStory,
      total_chapters: totalChaptersStory,
      is_full: statusStory,
      image: imageStory
    };
    fetch(`${API}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(story)
    })
      .then(response => response.json())
      .then(responseJson => {
        navigation.navigate("Home", { data: responseJson });
      })
      .catch(error => console.log(`ERROR: ${error}`));
  };

  return (
    <ImageBackground
      source={require("./Image/bgr_blur.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.modal}>
        <OutlinedTextField
          error={errNameStory}
          errorColor="#FF0000"
          placeholderTextColor="#fff"
          baseColor="#fff"
          textColor="#fff"
          returnKeyType={"next"}
          onChangeText={nameStory => setNameStory(nameStory)}
          label="Tên truyện"
        />
        <OutlinedTextField
          error={errImageStory}
          errorColor="#FF0000"
          baseColor="#fff"
          textColor="#fff"
          placeholderTextColor="#fff"
          returnKeyType={"next"}
          onChangeText={imageStory => setImageStory(imageStory)}
          label="Đường dẫn ảnh"
        />
        <OutlinedTextField
          error={errTypeStory}
          errorColor="#FF0000"
          baseColor="#fff"
          textColor="#fff"
          placeholderTextColor="#fff"
          returnKeyType={"next"}
          onChangeText={typeStory => setTypeStory(typeStory)}
          label="Thể loại"
        />
        <OutlinedTextField
          error={errTotalChaptersStory}
          errorColor="#FF0000"
          baseColor="#fff"
          textColor="#fff"
          placeholderTextColor="#fff"
          returnKeyType={"next"}
          onChangeText={totalChaptersStory =>
            setTotalChaptersStory(totalChaptersStory)
          }
          label="Số chương"
        />
        <View>
          <Text style={styles.textStatus}>Trạng thái:</Text>
          <SwitchSelector
            options={options}
            buttonColor="#FF99FF"
            initial={0}
            onPress={value => {
              setStatusStory(value);
            }}
          />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            disabled={false}
            onPress={() => editStory()}
            style={[styles.button]}
          >
            <Text style={[styles.text]}>Thêm truyện</Text>
          </TouchableOpacity>
        </View>
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
  textStatus: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5
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
    // marginTop:'25%'
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
    // height:30,
    fontSize: 20,
    color: "rgba(255,255,255,0.8)"
  },
  flatlist: {
    height: "90%"
  }
});
