import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";

const Splash = (props) => {
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
          <Text style={styles.forgot_button} onPress={()=> {props.changeView("ForgotPassword");}}>Forgot Password?</Text>
        </TouchableOpacity>
  
        <TouchableOpacity>
          <Text style={styles.signup_button} onPress={()=> {props.changeView("Signup");}}>Signup</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.loginBtn}  onPress={()=> {props.changeView("Home");}}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
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
        // fontFamily: "Roboto",
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
        marginBottom:10,
      },
      signup_button:{
        height: 30,
        marginBottom:30,
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
  });
  export default Splash;