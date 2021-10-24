import React, { useState, useEffect } from "react";
import { View, Text,FlatList,TouchableOpacity, Pressable } from 'react-native';
import { globalStyles } from '../styles/global';

let userAddUpdated = true;
let categoryUpdated = true;
let dataPosting = "";

//Category screen part
export default function CategoryScreen({ route,navigation }) {
    let { userParam } = route.params;
    var displayUsername = userParam;
    const [movies, setMovies] = useState([]);

      useEffect(() => {
        if(userAddUpdated){
        userAddUpdated = false;
          const url = "http://10.0.2.2:8080/rest/categoryservice/addjsonfish/"+userParam;
          const fetchiData = async () => {
              try {
                  const response = await fetch(url);
                  const json = await response.json();
                  console.log("test123");
              } catch (error) {
                  console.log("error", error);
              }
          };
          fetchiData();
        }
      }, []);

            useEffect(() => {
            if(categoryUpdated){
            const url = "http://10.0.2.2:8080/rest/categoryservice/getAll";
            const fetchiData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setMovies(json);
                    console.log("test123");
                } catch (error) {
                    console.log("error", error);
                }
                categoryUpdated = false;
                dataPosting = movies;
            };
            fetchiData();
        }
        }, []);

    return (
      <View style={{ flex: 1}}>
        <View style={{ flex: 1}}>
          <View style={globalStyles.userStats}>
            <Text style={globalStyles.userStatsText1}>{displayUsername}</Text>
          </View>
        </View>
        <View style={globalStyles.categoryTitles}>
          <View style={globalStyles.screen}>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={movies}
              renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DisplayComment', {
                  otherParam: item.id,
                  pcategory: item.category,
                  pusername: displayUsername,
                })}>
              <View style={globalStyles.categoryItem}>
                <Text style={globalStyles.buttonText}>{item.category}</Text>
              </View>
              </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}> 
          <Pressable style={globalStyles.button} onPress={() => {
            navigation.navigate('UserScreen', {
              otherParam: 'anything you want here',
            });
          }}>
            <Text style={globalStyles.buttonText}>Back to User-screen</Text>
          </Pressable>
        </View>
      </View>
    );
  }