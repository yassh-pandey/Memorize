import React, {useRef, useEffect} from 'react'
import {View, Animated, StyleSheet} from 'react-native'

function GameEnds() {
    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(()=>{

    })
    return (
        <Animated.View
            style={{
                ...GameEndsStyles.parentContainer
            }}
        >

        </Animated.View>
    )
}
const GameEndsStyles = StyleSheet.create({
    parentContainer: {
        width: 300,
        height: 300, 
        backgroundColor: "#212621",
        borderRadius: 40
    }
});
export default GameEnds

