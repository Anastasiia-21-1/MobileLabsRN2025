import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import GameObject from '@/components/GameObject';
import Header from "@/components/Header";
import ScoreSection from "@/components/ScoreSection";

export default function GameScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto"/>
      <Header/>
      <ScoreSection/>

      <View style={styles.gameContainer}>
        <GameObject/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
