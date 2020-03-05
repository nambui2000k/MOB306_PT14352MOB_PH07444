import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './Home';
import {Detail} from './Detail'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Danh sách truyện'}}
        />
        <Stack.Screen 
        name="Detail" 
        component={Detail}
        options={{title: 'Thông tin chi tiết'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


