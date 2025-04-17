import {StyleSheet, Text, View} from "react-native";
import React from "react";

interface TaskStatusProps {
  completed: boolean
}

export default function TaskStatus({completed}: TaskStatusProps) {
  return (
    <View style={[styles.statusBadge, completed ? styles.completedBadge : styles.pendingBadge]}>
      <Text style={styles.statusText}>
        {completed ? 'Completed' : 'Pending'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: '#e8f5e9',
  },
  pendingBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
})