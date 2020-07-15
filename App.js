import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  Animated
} from 'react-native';
import Tile from './components/Tile';
import Score from './components/Score';
import GameEnds from './components/GameEnds';

const {width, height} = Dimensions.get('window');

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

  const [getDeckOfCardsState, ] = useState([...deckOfCards]);

  const [getActiveCards, setActiveCards] = useState([]);

  const [score, setScore] = useState(0);

  const [disableRemainingTiles, setDisableRemainingTiles] = useState(false);

  const [faceUpAnimationStartsForAnyTile , setFaceUpAnimationStartsForAnyTile] = useState(false);

  const [correctlyPredictedCards, setCorrectlyPredictedCards] = useState(0);

  const [gameEnds, setGameEnds] = useState(true);

  const addCardToActiveCards = (cardKey)=>{
    const pressedCard = getDeckOfCardsState.find((card)=>{
      return card.key === cardKey;
    });
    setActiveCards((currentActiveCards)=>[...currentActiveCards, pressedCard]);
  };

  const removeCardFromActiveCard = (cardKey)=>{
    setActiveCards((currentActiveCards)=>{
      return currentActiveCards.filter((card)=>{
        return card.key !== cardKey
      }); 
    });
  };

  const rotateFaceDown = [];
  deckOfCards.forEach(card=>{
    rotateFaceDown.push({key: card.key, faceDownSignal: false});
  });

  const [faceDownSignalArray, setFaceDownSignalArray] = useState(rotateFaceDown);

  useEffect(()=>{
    if(correctlyPredictedCards===14){
      //Game ends
      setGameEnds(true);
    }
  }, [correctlyPredictedCards])

  useEffect(()=>{
    if(getActiveCards.length===1){
      setDisableRemainingTiles(false);
    }
    if(getActiveCards.length===2 && getActiveCards[0].data === getActiveCards[1].data){
      setScore((currentScore)=>currentScore+6);
      setCorrectlyPredictedCards((currentState)=>currentState+2);
    }
    else if(getActiveCards.length===2 && getActiveCards[0].data !== getActiveCards[1].data){
      setScore((currentScore)=>currentScore-1);
    }
    if(getActiveCards.length===3){
      setDisableRemainingTiles(true);
      setFaceDownSignalArray(rotateFaceDown);
      const firstCardToClose = getActiveCards[0];
      const secondCardToClose = getActiveCards[1];
      const newFaceDownSignalArray = faceDownSignalArray.map(object=>{
        if(object.key === firstCardToClose.key || object.key === secondCardToClose.key){
          return {key: object.key, faceDownSignal: true};
        }
        else{
          return object;
        }
      });
      setFaceDownSignalArray(newFaceDownSignalArray);
    }
  }, [getActiveCards]);


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.AppContainer}>
        <View style={styles.AppContainer}>
            {
            gameEnds
            ?
            <GameEnds />
            :
            (
              <Animated.View
              style={{
                width: width
              }}
              >
                  <FlatList 
                  ListHeaderComponent={<Score score={score}/>}
                  ListFooterComponent={<View style={{flex: 1, height: 20, backgroundColor: "transparent"}}></View>}
                  data={getDeckOfCardsState}
                  numColumns={3}
                  contentContainerStyle={{justifyContent: "center",}}
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
                            <Tile displayEmoji={item.data} tileKey={item.key} addCardToActiveCards={addCardToActiveCards} 
                              removeCardFromActiveCard={removeCardFromActiveCard}
                              getActiveCards={getActiveCards}
                              setActiveCards={setActiveCards}
                              faceDownSignalArray={faceDownSignalArray}
                              disableRemainingTiles={disableRemainingTiles}
                              faceUpAnimationStartsForAnyTile={faceUpAnimationStartsForAnyTile}
                              setFaceUpAnimationStartsForAnyTile={setFaceUpAnimationStartsForAnyTile}
                            />
                          </View>
                        )
                      }
                    }
                  }
                />
              </Animated.View>
              )
            }
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
