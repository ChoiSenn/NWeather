import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{flex:1}}> 
      <View style={{flex:1, backgroundColor:"tomato"}}></View>
      <View style={{flex:1, backgroundColor:"teal"}}></View>
      <View style={{flex:1, backgroundColor:"orange"}}></View>
    </View>
  );
}