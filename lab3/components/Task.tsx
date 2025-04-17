import {TaskType} from "@/store/types";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import TaskStatus from "@/components/TaskStatus";

export default function Task({ item }: { item: TaskType }) {
  return (
    <View style={[styles.taskItem, item.completed && styles.taskItemCompleted]}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <TaskStatus completed={item.completed}/>
      </View>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskItemCompleted: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 5,
    borderLeftColor: '#2ecc71',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  taskDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
})