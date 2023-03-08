// In App.js in a new project

import * as React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import type { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createSharedElementStackNavigator, SharedElement } from 'react-navigation-shared-element';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideInUp, ZoomIn } from 'react-native-reanimated';

type RootStackParamList = {
  Home: undefined;
  Details: {
    data: {
      label: string;
      img: string;
      id: number;
    };
  };
};

const listData = [
  { id: 1, label: 'item 1', img: 'https://picsum.photos/id/237/500/300' },
  { id: 2, label: 'item 2', img: 'https://picsum.photos/id/238/500/300' },
  { id: 3, label: 'item 3', img: 'https://picsum.photos/id/239/500/300' },
];
function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <FlatList
      data={listData}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { data: item })}>
            <View style={{ paddingVertical: 10, borderWidth: 1, alignItems: 'center' }}>
              <SharedElement id={String(item.id)}>
                {/* <View style={{ height: 150, aspectRatio: 5 / 3, backgroundColor: 'pink' }}/> */}
                <Image source={{ uri: item.img }} style={{ height: 150, aspectRatio: 5 / 3, resizeMode: 'cover' }} />
              </SharedElement>
              <Animated.Text entering={FadeIn} exiting={FadeOut} style={{ marginVertical: 10, fontWeight: 'bold', textAlign: 'center' }}>
                {item.label}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
}

function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const data = route.params.data;
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <SharedElement id={String(data.id)}>
        <Image source={{ uri: data.img }} style={{ width: '100%', aspectRatio: 5 / 3, resizeMode: 'cover' }} />
      </SharedElement>
      <Animated.Text entering={FadeIn.duration(1000)} style={{ marginVertical: 10, fontWeight: 'bold', textAlign: 'center' }}>
        {data.label}
      </Animated.Text>
    </View>
  );
}

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createSharedElementStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailScreen} sharedElements={(route) => [String(route.params.data.id)]} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
