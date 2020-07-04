import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Score({score}) {

    return (
        <View style={{
            ...ScoreStylesheet.parentContainer
        }}>
        <Text style={{
            textAlign: "center", 
            fontSize: 18,
            fontWeight: "bold",
            padding: 5
        }}>
            Score:
        </Text>
        <View style={{
            ...ScoreStylesheet.scoreDisplay
        }}>
            <Text style={{
                ...ScoreStylesheet.scoreText
            }}>
                {score}
            </Text>
        </View>
        </View>
    )
}

const ScoreStylesheet = StyleSheet.create({
    parentContainer: {
        width: 100,
        margin: 10,
        marginLeft: 20
    },
    scoreDisplay: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#021859",
        alignItems: "center",
        justifyContent: "center", 
        borderRadius: 10,
    },
    scoreText: {
        color: "white"
    }

});
export default memo(Score);
