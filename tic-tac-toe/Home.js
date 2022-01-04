import React from 'react';
import { StyleSheet, SafeAreaView, Image, Text, Pressable } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('./assets/img/cover.png')} style={styles.cover}></Image>
        <Text style={styles.title}>Rules</Text>
        <Text style={styles.text}>
            The object of Tic-Tac-Toe is to get three in a row. You play on a three by three game board. The first player is known as X and the second is O.
            Players alternate placing Xs and Os on the game board until either opponent has three in a row or all nine squares are filled.
            X always goes first, and in the event that no one has three in a row, the stalemate is called a cat game.
        </Text>
        <Text style={styles.title}>Features</Text>
        <Text style={styles.text}>
            When a player wins the game the squares that contain the three in a row will be colored in lightgreen.
            When the outcome of the game is a stalemate all squares will be colored in lightyellow.
            There is a history feature thanks to which you can go back to any previously made move and change it.
            You can choose to order the history either in ascending or descending order.
            Each move shows its exact position in the format '(column, row)'.
            The currently selected history item's text will become bold as long as it is selected.
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Tic-Tac-Toe')}><Text style={styles.buttonTitle}>Start Game</Text></Pressable>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    cover: {
        width: 200,
        height: 284,
        marginTop: 20
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginTop: 20,
        marginBottom: 20
    },

    text: {
        textAlign: 'center',
        width: 480,
        height: 100,
        marginBottom: 10
    },

    button: {
        padding: 10,
        marginTop: 60,
        backgroundColor: 'grey',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTitle: {
        color: 'white',
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none"
      }
});