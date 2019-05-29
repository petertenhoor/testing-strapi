import React from "react";
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";

const Loader = () => (
    <View style={styles.loaderContainer}>

        <ActivityIndicator size="large" color="#d34f48"/>

        <Text style={styles.loaderText}>
            Loading..
        </Text>

    </View>
)

const styles = StyleSheet.create({
    loaderContainer: {
        backgroundColor: "#f4f4f4",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    loaderText: {
        fontSize: 12,
        marginTop: 10,
    }
})

export default Loader;
