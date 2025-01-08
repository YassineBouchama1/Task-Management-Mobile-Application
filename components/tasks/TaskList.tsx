import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTaskStore from '~/store/taskStore';
import useTaskActions from '~/hooks/useTaskActions';
import { Task } from '~/types/task';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks, filter, setFilter } = useTaskStore();
  const { startTask, endTask, isLoading } = useTaskActions();

  const filteredTasks = useMemo(() => {
    return filter === 'All' ? tasks : tasks.filter((task: Task) => task.status === filter);
  }, [tasks, filter]);

  const handleStartTask = useCallback(
    (taskId: string) => {
      Alert.alert('Start Task', 'Are you sure you want to start this task?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => startTask(taskId) },
      ]);
    },
    [startTask]
  );

  const handleEndTask = useCallback(
    (taskId: string) => {
      Alert.alert('End Task', 'Are you sure you want to end this task?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End', onPress: () => endTask(taskId) },
      ]);
    },
    [endTask]
  );

  const renderTask = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        task={item}
        onStartTask={handleStartTask}
        onEndTask={handleEndTask}
        isLoading={isLoading}
      />
    ),
    [handleStartTask, handleEndTask, isLoading]
  );

const filterOptions = useMemo(() => ['All', 'Pending', 'In Progress', 'Completed'] as const, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task List</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#666" />
        </View>
      </View>

      <View style={styles.filterContainer}>
        {filterOptions.map((filterOption) => (
          <TouchableOpacity key={filterOption} onPress={() => setFilter(filterOption)}>
            <Text style={filter === filterOption ? styles.activeFilter : styles.filter}>
              {filterOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={useCallback((item:Task) => item.id, [])}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filter: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 4,
  },
  activeFilter: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    paddingVertical: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#1976D2',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
});

export default TaskList;
