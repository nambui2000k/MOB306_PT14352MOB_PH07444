import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Home";
import { Detail } from "./Detail";
import { Add } from "./Add";
import { Edit } from "./Edit";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Danh sách truyện" }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: "Thông tin chi tiết" }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ title: "Thêm sách" }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{ title: "Chỉnh sửa thông tin" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
