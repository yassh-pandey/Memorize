import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions
} from 'react-native';
import Tile from './components/Tile';
import CircularProgress from './components/CircularProgress';

const emojiArray = ["🙀", "👻", "👽", "💩", "☠️", "🤖", "😹"];


const App = () => {
  const FisherYates_Shuffel = (array)=>{
    let i = array.length;
    while(--i>0){
      //Generate a random number between 0 and index i 
      const randomIndex = Math.floor((Math.random()*(i+1)));
      const temp = array[randomIndex];
      array[randomIndex] = array[i];
      array[i] = temp;
    }
    return array; 
  }
  let deckOfCards = FisherYates_Shuffel(emojiArray);
  deckOfCards = FisherYates_Shuffel([...emojiArray, ...deckOfCards]);
  deckOfCards = deckOfCards.map((card, index)=>{
    return(
      {
        data: card,
        key: `item${index}`
      }
    )
  })
  deckOfCards = [...deckOfCards, {data: "", key: `item${deckOfCards.length}`}];
  const [getDeckOfCardsState, setDeckOfCardsState] = useState([...deckOfCards]);
  // console.log(getDeckOfCardsState);
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.AppContainer}>
        <FlatList 
          data={getDeckOfCardsState}
          numColumns={3}
          contentContainerStyle={{justifyContent: "center", flex: 1}}
          renderItem={
            ({item, index})=>{
              if(index===getDeckOfCardsState.length-1){
                return(
                  <View style={{flex: 1, alignItems: "center", margin: 10}}>
                    <View style={{width: 100, height: 100, backgroundColor: "transparent"}}>
                    </View>
                  </View>
                )
              }
              else{
                return(
                  <View style={{flex: 1, alignItems: "center", margin: 10}}>
                    <Tile displayEmoji={item.data} />
                  </View>
                )
              }
            }
          }
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE"
  }
});

export default App;
