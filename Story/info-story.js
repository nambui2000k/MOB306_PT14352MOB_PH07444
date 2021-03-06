import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";

export default function infoStory({
  item,
  handleDelete,
  itent,
  itentEt,
}) {
  const intentDetail = (item, itent) => {
    {
      itent(item);
    }
  };

  const intentEdit = (item, itentEt) => {
    {
      itentEt(item);
    }
  };

  const alertDelete = (name, handleDelete, id) => {
    return Alert.alert(
      "Xóa truyện",
      `Bạn có muốn xóa ${name} không?`,
      [
        {
          text: "Có",
          onPress: () => {
            handleDelete(name, id);
          }
        },
        {
          text: "Không",
          onPress: () => {}
        }
      ],
      { cancleable: false }
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          intentDetail(item, itent);
        }}
      >
        <View style={styles.image}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.container_content}>
          <Text style={styles.title_content}>{`Tên: ${item.name}`}</Text>
          <Text
            style={styles.detail_content}
          >{`Thể loại: ${item.category}`}</Text>
          <Text
            style={styles.detail_content}
          >{`Số tập: ${item.total_chapters}`}</Text>
          <Text style={styles.detail_content}>{`Trạng thái: ${
            item.is_full ? "Đầy" : "Chưa đầy"
          }`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            intentEdit(item, itentEt);
          }}
        >
          <Image
            style={styles.img_button_edit}
            source={require("../Image/edit.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alertDelete(item.name, handleDelete, item.id);
          }}
        >
          <Image
            style={styles.image_button_delete}
            source={require("../Image/delete.png")}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "2%",
    borderRadius: 10,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
    flexDirection: "row",
    margin: "1%"
  },
  image: {
    borderRadius: 35,
    width: 70,
    height: 70
  },
  container_image: {
    width: "10%"
  },
  container_content: {
    marginLeft: 10,
    width: "55%"
  },
  container_button: {
    width: "30%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  detail_content: {
    fontSize: 10,
    color: "#fff",
    width: "90%",
    height: 15
  },
  image_button: {
    width: 25,
    height: 25
  },
  title_content: {
    color: "#FFFF00",
    fontSize: 18,
    width: "95%",
    height: 27,
    fontWeight: "bold"
  },
  image_button_delete: {
    width: 30,
    height: 30,
    marginTop: "70%",
    paddingRight: "10%"
  },
  img_button_edit: {
    width: 30,
    height: 30,
    marginTop: "70%",
    paddingRight: "10%"
  }
});
