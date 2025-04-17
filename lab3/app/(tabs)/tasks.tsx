import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useGameContext } from '@/store/context';
import Task from "@/components/Task";
import TasksProgress from "@/components/TasksProgress";

export default function TasksScreen() {
  const { tasks } = useGameContext();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
      </View>

      <TasksProgress/>

      <FlatList
        data={tasks}
        renderItem={({item}) => <Task item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 15,
  },
});
