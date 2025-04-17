import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useGameContext} from "@/store/context";

export default function TasksProgress() {
  const { tasks } = useGameContext();

  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = Math.round((completedTasks / tasks.length) * 100);

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>
        Progress: {completedTasks}/{tasks.length} ({completionPercentage}%)
      </Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${completionPercentage}%` }
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    padding: 15,
    backgroundColor: '#2980b9',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
  },
})