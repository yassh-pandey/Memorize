import React, {useRef, useState} from 'react'
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Animated,
    Text,
    Easing
  } from 'react-native';
  import CircularProgress from "./CircularProgress"


function Tile({displayEmoji, tileKey}) {
    // const [getTileKey, ] = useState(tileKey);
    const tileBackgroundAnimatedValue = useRef(new Animated.Value(0)).current;
    const tileEmojiAnimatedValue = useRef(new Animated.Value(0)).current;
    const [isFaceUp, setIsFaceUpState] = useState(false);
    const [tileDisabled, setTileDisableState] = useState(false);
    const [tileElevation, setTileElevation] = useState(5);
    const tilePressed = (e)=>{
        setTileElevation(0);
        setTileDisableState(true);
        if(isFaceUp===false){
            Animated.sequence([
                Animated.timing(tileBackgroundAnimatedValue, 
                    {
                        toValue: 1,
                        duration: 250,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true
                    }),
                Animated.timing(tileEmojiAnimatedValue, 
                    {
                        toValue: 1,
                        duration: 250,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true
                    })
            ]).start(()=>{
                setIsFaceUpState(true);
            });
        }
        setTimeout(()=>{
            setTileElevation(5)
        }, 2200)
        setTimeout(() => {
            Animated.sequence([
                Animated.timing(tileEmojiAnimatedValue, 
                    {
                        toValue: 0,
                        duration: 250,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.quad)
                    }),
                Animated.timing(tileBackgroundAnimatedValue, 
                    {
                        toValue: 0,
                        duration: 250,
                        useNativeDriver: true,
                        easing: Easing.inOut(Easing.quad)
                    })
            ]).start(()=>{
                setIsFaceUpState(false);
                setTileDisableState(false);
            });
        }, 1800);
    };
    return (
        <View style={{
            ...TileStyles.ContainerView,
            elevation: tileElevation
        }}>
            <TouchableWithoutFeedback onPress={tilePressed} disabled={tileDisabled} >
            <Animated.View>
                <Animated.View style={{...TileStyles.FaceDown, 
                    transform: 
                        [
                            {
                                rotateY: tileBackgroundAnimatedValue.interpolate(
                                    {
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "90deg"]
                                    })
                            }
                        ]
                    }}>
                </Animated.View>
                <Animated.View style={{...TileStyles.FaceUp, 
                        transform: 
                        [
                            {
                                rotateY: tileEmojiAnimatedValue.interpolate(
                                    {
                                        inputRange: [0, 1],
                                        outputRange: ["-90deg", "0deg"]
                                    })
                            }
                        ]
                    }}>
                        {
                            isFaceUp
                            ?
                            <CircularProgress />
                            :
                            null
                        }
                        <Text style={TileStyles.Emoji}>
                            {displayEmoji}
                        </Text>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
        </View>
    )
}
const TileStyles = StyleSheet.create({
    ContainerView: {
        borderRadius: 10,
        elevation: 10
    },
    Emoji: {
        transform: [{scale: 4}],
        textAlign: "center",
        position: "absolute"
    },
    FaceDown: {
        width: 100,
        height: 100,
        backgroundColor: "#13E492",
        borderRadius: 10,
        position: "relative"
    },
    FaceUp: {
        width: 100,
        height: 100,
        position: "absolute",
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#183940",
        justifyContent: "center",
        alignItems: "center"
    },
  
});
export default Tile
