import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>Seoul</Text>
      </View>
      <ScrollView 
        pagingEnabled 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#D2D7F2",
  },
  city:{
    flex: 1.2,
    justifyContent: "center",
    alignItems:"center",
  },
  cityname:{
    color: "#3C4DA2",
    fontSize: 28,
    fontWeight: "500",
  },
  weather:{
    
  },
  day:{
    alignItems:"center",
    width: SCREEN_WIDTH, 
  },
  temp:{
    fontSize: 158,
    color: "#3C4DA2",
    marginTop: 50,
  },
  description:{
    fontSize: 40,
    color: "#3C4DA2",
    marginTop: -30,
  },
});