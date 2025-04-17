import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useGameContext} from "@/store/context";

export default function ScoreSection() {
  const {score} = useGameContext();

  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreLabel}>Score:</Text>
      <Text style={styles.scoreValue}>{score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2980b9',
  },
  scoreLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
})