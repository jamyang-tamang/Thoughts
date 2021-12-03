import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Dimensions, FlatList } from "react-native";
import {SearchBar} from 'react-native-elements';

const Messages = (props) => {
    const[search, updateSearch] = useState("");
    return(
      <View style = {styles.listContainer}>
        <TouchableOpacity style={styles.navBtnLeft}  onPress={()=> {props.changeView("Discussions");}}>
          <Text>Discussions</Text>
        </TouchableOpacity>
        {/* <View style={styles.searchBar}> */}
          <SearchBar placeholder="Search" onChangeText={this, updateSearch} value={search}/>
        {/* </View> */}
        <TouchableOpacity style={styles.navBtnRight}  onPress={()=> {props.changeView("Home");}}>
          <Text>Home</Text>
        </TouchableOpacity>
        <View style={styles.messagesContainer}>
          <View style={styles.messages}>
            <Text styles={styles.labels}>Messages</Text>
            <FlatList
              data={[
                {name: 'Sample Message', key: '0'},
                {name: 'Sample Message', key: '1'},
                {name: 'Sample Message', key: '2'},
                {name: 'Sample Message', key:'3'},
                {name: 'Sample Message', key:'4'},
                {name: 'Sample Message', key:'5'},
                {name: 'Sample Message', key:'604'},
                {name: 'Sample Message', key:'605'},
                {name: 'Sample Message', key:'606'}, 
                {name: 'Sample Message', key:'607'}, 
                {name: 'Sample Message', key:'608'},
                {name: 'Sample Message', key:'80'}
              ]}
              renderItem={({item}) => <ItemTab item={item}></ItemTab>}
            />
          </View>
          <View style={styles.rooms}>
          <Text styles={styles.labels}>Rooms</Text>
            <FlatList
              data={[
                {name: 'Sample Room', key: '0'},
                {name: 'Sample Room', key: '1'},
                {name: 'Sample Room', key: '2'},
                {name: 'Sample Room', key: '3'},
                {name: 'Sample Room', key: '4'},
                {name: 'Sample Room', key: '5'},
                {name: 'Sample Room', key:'604'},
                {name: 'Sample Room', key:'605'},
                {name: 'Sample Room', key:'606'}, 
                {name: 'Sample Room', key:'607'}, 
                {name: 'Sample Room', key:'608'},
                {name: 'Sample Room', key:'80'}
              ]}
              renderItem={({item}) => <ItemTab item={item}></ItemTab>}
            />
          </View>
        </View>
      </View>
    )
}

const ItemTab = (props) => {
    return(
    <Pressable
        onPress={() => {}}
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
            {pressed ? 'Go to ' + props.item.name : props.item.name}
            </Text>
        )}
    </Pressable>
    )
}

//Inprogress
const Message = (props) => {
    return(
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.navBtnLeft} onPress={()=> {props.changeView("Messages");}}>
          <Text style={styles.loginText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtnRight}  onPress={()=> {props.changeView("Home");}}>
          <Text style={styles.loginText}>Home</Text>
        </TouchableOpacity>
      </View>
      );
  }

const Rooms = (props) =>{
    return(
        <View style={styles.listContainer}>
        <TouchableOpacity style={styles.navBtnLeft} onPress={()=> {props.changeView("Home");}}>
            <Text style={styles.loginText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtnRight}  onPress={()=> {props.changeView("Messages");}}>
            <Text style={styles.loginText}>DMs</Text>
        </TouchableOpacity>
        </View>
        );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: '#0ABAB5'
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
    messagesContainer:{
        flexDirection: "row",
        flex: 3,
        marginTop: (Dimensions.get('window').height)/10,
        },
    messages: {
        flex: 1,
        width: (Dimensions.get('window').width)/2,
    },
    labels:{
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
    },
    rooms: {
        flex: 1,
        width: (Dimensions.get('window').width)/2,
    },
})

export default Messages;