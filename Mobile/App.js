import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {SearchBar, ThemeProvider, Header, Card, Button, Icon, BottomSheet, ListItem, withTheme } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from 'react-native';
import { grey } from "ansi-colors";


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
};

function Splash(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Thoughts</Text>
      <Image style={styles.image} source={require('./assets/logo.jpg')} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}  onPress={()=> {props.changeView("Home");}}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

function Home(props){
  return(
    <View>
      <TouchableOpacity style={styles.navBtnLeft}  onPress={()=> {props.changeView("Discussions");}}>
        <Text style={styles.loginText}>Discussions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtnRight}  onPress={()=> {props.changeView("Messages");}}>
        <Text style={styles.loginText}>DMs</Text>
      </TouchableOpacity>
      <View style={styles.toolBar}  onPress={()=> {props.changeView("Home");}}>
      </View>
    </View>
  );
}

function Discussions(props){
  return(
    <View>
      <TouchableOpacity style={styles.navBtnLeft} onPress={()=> {props.changeView("Home");}}>
        <Text style={styles.loginText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtnRight}  onPress={()=> {props.changeView("Messages");}}>
        <Text style={styles.loginText}>DMs</Text>
      </TouchableOpacity>
      <DiscussionTab />
    </View>
  );
}

function DiscussionTab(props){
  return(
      <Pressable
    onPress={() => {
  }}
      style={({ pressed }) => [
        styles.item,
        {
          backgroundColor: pressed
            ? 'white'
            : 'pink'
        },
      ]}
    >

        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? 'Open ' + props.item.name : props.item.name}
          </Text>
        )}

      </Pressable>
  );
}

function Discussion(props){
  return(
    <View>
    </View>
    );
}

function Messages(props){
  const[search, updateSearch] = useState("");
  return(
    <View>
      <TouchableOpacity style={styles.navBtnLeft}  onPress={()=> {props.changeView("Discussions");}}>
        <Text style={styles.loginText}>Discussions</Text>
      </TouchableOpacity>
      <SearchBar placeholder="Search" onChangeText={this, updateSearch} value={search}/>
      <TouchableOpacity style={styles.navBtnRight}  onPress={()=> {props.changeView("Home");}}>
        <Text style={styles.loginText}>Home</Text>
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

  title:{
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "white",
    marginBottom: 15
  },

  image: {
    marginBottom: 40,
    width: (Dimensions.get('window').width)/2,
  },

  inputView: {
    backgroundColor: "#A9DCE3",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
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

  toolBar: {
    position: 'absolute',
    height: 60,
    left: 0, 
    top: Dimensions.get('window').height - 60,
    width: Dimensions.get('window').width, 
    backgroundColor: 'grey',
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
})