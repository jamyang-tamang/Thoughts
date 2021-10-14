import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, Header, Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Dimensions
} from "react-native";

function MainView(props) {
  // There is a state for the view which exists in the app wraper at like 440, which gets passed into MainView

  if(props.view == "Login"){
    return <Login changeView={props.changeView}/>
  }
  else if(props.view == "Home"){
    return (
        <Home/>
    );
  }
};

// import auth from '@react-native-firebase/auth'
// export default function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );

function Login(props){
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        >SPP</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          // onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          // onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} 
        onPress={() => {props.changeView("Home")}}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signup_button}>Sign up!</Text>
      </TouchableOpacity>

    </View>
  );
}

function Home(props){
  return (
      <View>
        <MapView
          style={styles.map}
         // style={{ flex: 1 }}
         // provider={PROVIDER_GOOGLE}
         // showsUserLocation
         // initialRegion={{
         // latitude: 37.78825,
         // longitude: -122.4324,
         // latitudeDelta: 0.0922,
         // longitudeDelta: 0.0421}}
      />
      </View>
    );
}
// }

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title:{
    marginBottom: 50
  },

  inputView: {
    backgroundColor: "cyan",
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

   signup_button: {
    height: 30,
    marginTop: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "grey",
  },
});

export default function AppWrapper(){
  const [view, changeView] = useState("Login");
  return(
    <SafeAreaProvider>
      <ThemeProvider useDark={false}>
      <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'SPP', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', onPress: ()=> {changeView("Login")}  , color: '#fff' }}
        />
        <MainView view={view} changeView={changeView}/>
        <StatusBar style="auto"/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}