// components/TaskList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router'; // Import Link from expo-router
import useTaskStore from '~/store/taskStore';
import useTaskActions from '~/hooks/useTaskActions';


const TaskList = () => {
  const { tasks, filter, setFilter } = useTaskStore();
  const { startTask, endTask, isLoading } = useTaskActions();

  const filteredTasks = filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  const handleStartTask = (taskId: string) => {
    Alert.alert('Start Task', 'Are you sure you want to start this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Start', onPress: () => startTask(taskId) },
    ]);
  };

  const handleEndTask = (taskId: string) => {
    Alert.alert('End Task', 'Are you sure you want to end this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'End', onPress: () => endTask(taskId) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('All')}>
          <Text style={filter === 'All' ? styles.activeFilter : styles.filter}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Pending')}>
          <Text style={filter === 'Pending' ? styles.activeFilter : styles.filter}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('In Progress')}>
          <Text style={filter === 'In Progress' ? styles.activeFilter : styles.filter}>
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Completed')}>
          <Text style={filter === 'Completed' ? styles.activeFilter : styles.filter}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Link
              href={{
                pathname: '/details/[id]',
                params: { id: item.id }, // Pass task ID as a parameter
              }}>
              <Text style={styles.taskTitle}>{item.title}</Text>
            </Link>
            <Text style={styles.taskStatus}>{item.status}</Text>
            {item.status === 'In Progress' && (
              <TouchableOpacity onPress={() => handleEndTask(item.id)} disabled={isLoading}>
                <Text style={styles.actionButton}>End Task</Text>
              </TouchableOpacity>
            )}
            {item.status === 'Pending' && (
              <TouchableOpacity onPress={() => handleStartTask(item.id)} disabled={isLoading}>
                <Text style={styles.actionButton}>Start Task</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filter: {
    fontSize: 16,
    color: '#666',
  },
  activeFilter: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue', // Make it look like a link
  },
  taskStatus: {
    fontSize: 14,
    color: 'green',
  },
  actionButton: {
    color: 'blue',
    fontSize: 14,
  },
});

export default TaskList;
