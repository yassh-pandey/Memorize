import React,{useEffect, useRef, useState} from 'react'
import {View, StyleSheet, Animated, Easing} from 'react-native'
function CircularProgress() {
   
    const progress = useRef(new Animated.Value(0)).current;
    const secondaryProgress = useRef(new Animated.Value(50)).current;
    const [halfProgressDone, setHalfProgressDone] = useState(false);

    useEffect(()=>{
        Animated.timing(progress,
            {
                toValue: 50,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.quad)
            }).start(()=>{
                setHalfProgressDone(true);
            });
    }, [])

    useEffect(()=>{
        if(halfProgressDone===true){
            Animated.timing(secondaryProgress,
                {
                    toValue: 100,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad)
                }).start();
        }
    }, [halfProgressDone])
    return (
        <>
            <View style={{
                ...CircularProgressStyles.MainContainer
                }}>
                    <Animated.View style={{
                        ...CircularProgressStyles.baseOverlayCircle,
                        transform: [
                            {rotateZ: progress.interpolate({
                                inputRange: [0, 50],
                                outputRange: ["-135deg", "45deg"]
                            })}
                        ]
                    }}>
                    </Animated.View>
                    {
                        halfProgressDone
                        ?
                        (
                            <Animated.View style={{
                                ...CircularProgressStyles.baseOverlayCircle,
                                
                                transform: [
                                    {rotateZ: secondaryProgress.interpolate({
                                        inputRange: [50, 100],
                                        outputRange: ["45deg", "225deg"],
                                    })}
                                ]
                            }}>
                            </Animated.View>
                        )
                        :
                        (
                            <View style={{
                                ...CircularProgressStyles.secondaryOverlayCircle
                            }}>
                            </View>
                        )
                    }
            </View>
        </>
    )
}
const CircularProgressStyles = StyleSheet.create({
    MainContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#EEEEEE",
        borderWidth: 20,
        borderColor: "#EEEEEE",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
    },
    baseOverlayCircle: {
        position: "absolute",
        width: 80,
        height: 80,
        backgroundColor: "transparent",
        borderWidth: 20,
        borderRightColor: "pink",
        borderLeftColor: "transparent",
        borderTopColor: "pink",
        borderBottomColor: "transparent",
        borderRadius: 40,
        transform: [
            {rotateZ: "45deg"}
        ]
        
    },
    secondaryOverlayCircle: {
        position: "absolute",
        width: 80,
        height: 80,
        backgroundColor: "transparent",
        borderWidth: 20,
        borderRightColor: "#EEEEEE",
        borderLeftColor: "transparent",
        borderTopColor: "#EEEEEE",
        borderBottomColor: "transparent",
        borderRadius: 40,
        transform: [
            {rotateZ: "-135deg"}
        ]
    }
})
export default CircularProgress
