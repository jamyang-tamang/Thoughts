import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {SearchBar, ThemeProvider, Header, Card, Button, Icon, BottomSheet, ListItem, withTheme } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from 'react-native';
import Splash from "./Splash"
import Home from "./HomeScreen"
import Messages from "./Communication"
import Discussions from "./Discussions"

function MainView(props) {
  if(props.view == "Splash"){
    return <Splash changeView={props.changeView}/>
  }
  else if(props.view == "Home"){
    return (
        <Home changeView={props.changeView}/>
    );
  }
  else if(props.view == "Discussions"){
    return(
        <Discussions changeView={props.changeView}/>
    );
  }
  else if(props.view == "Messages"){
    return(
      <Messages changeView={props.changeView}/>
    );
  }
  else if(props.view == "ForgotPassword"){
    return(
      <ForgotPassword changeView={props.changeView}/>
    );
  }
  else if(props.view == "Signup"){
    return(
      <Signup changeView={props.changeView}/>
    );
  }
};

function ForgotPassword(props){
  return(
    <View style = {styles.listContainer}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="default"
      />
      <TouchableOpacity style={styles.interactBtn}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.interactBtn} onPress={()=> {props.changeView("Splash");}}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function Signup(props){
  return(
    <View style = {styles.listContainer}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="alphanumeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a password"
        keyboardType="alphanumeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Verify your password"
        keyboardType="alphanumeric"
      />
      <TouchableOpacity style={styles.interactBtn}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.interactBtn} onPress={()=> {props.changeView("Splash");}}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [view, changeView] = useState("Splash");
    return(
      <SafeAreaProvider>
          <MainView view={view} changeView={changeView}/>
          <StatusBar hidden />
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0ABAB5",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  Discussions:{
    marginTop: (Dimensions.get('window').height)/10,
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Roboto",
    color: "white",
    marginBottom: 15
  },
  searchBar: {
    flex: 2,
    width: (Dimensions.get('window').width)/4,
  },
  image: {
    marginBottom: 40,
    width: (Dimensions.get('window').width)/2,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#0ABAB5'
  },
  interactBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00FFEF",
  },
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
  item: {
    backgroundColor: 'pink',
    padding: 10,
    borderWidth: 2,
    margin: 10,
    fontSize: 18,
    height: 44,
    elevation: 30,
    justifyContent: 'center'
  },
  flastList:{
    marginTop: 10,
    marginBottom: 25,
  },
})