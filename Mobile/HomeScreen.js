import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import Canvas from "react-native-canvas";

const HomeScreen = (props) => {
    return(
      <View>
        <TouchableOpacity style={styles.navBtnLeft}  onPress={()=> {props.changeView("Discussions");}}>
          <Text>Discussions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtnRight}  onPress={()=> {props.changeView("Messages");}}>
          <Text>DMs</Text>
        </TouchableOpacity>
        <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Canvas/>
        </View>
      </View>
        <View style={styles.toolBar}  onPress={()=> {props.changeView("Home");}}>
        </View>
      </View>   
    );
}

const styles = StyleSheet.create({
  navBtnLeft: {
    width: "25%",
    borderBottomRightRadius: 5,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#00FFEF",
  },
  navBtnRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: "25%",
    borderBottomLeftRadius: 5,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    backgroundColor: "#00FFEF",
  },
  toolBar: {
    position: 'absolute',
    height: 60,
    left: 0, 
    top: Dimensions.get('window').height - 60,
    width: Dimensions.get('window').width, 
    backgroundColor: 'grey',
  },
});

export default HomeScreen;