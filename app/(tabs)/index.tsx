import React, { useMemo, useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTaskStore from '~/store/taskStore';
import TaskCard from '~/components/home/TaskCard';
import EmptyState from '~/components/home/EmptyState';
import StatsCard from '~/components/home/StatsCard';
import useTaskActions from '~/hooks/useTaskActions';
import { Task } from '~/types/task';
import TaskProgressChart from '~/components/charts/TaskProgressChart';


const DashboardScreen = () => {
  const { tasks } = useTaskStore();
  const {  endTask } = useTaskActions();
  const [filter, setFilter] = useState<'30days' | '90days' | 'lifetime'>('30days');

  // Memoized task filtering
  const completedTasks = useMemo(
    () => tasks.filter((task:Task) => task.status === 'Completed'),
    [tasks]
  );
  const pendingTasks = useMemo(
    () => tasks.filter((task: Task) => task.status === 'Pending'),
    [tasks]
  );
  const activeTasks = useMemo(
    () => tasks.filter((task: Task) => task.status === 'In Progress'),
    [tasks]
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


  // Memoized render functions
  const renderEmptyState = useCallback(() => <EmptyState />, []);
  const renderTaskCards = useCallback(
    () =>
      activeTasks.map((task: Task) => (
        <TaskCard key={task.id} task={task} onCompleteTask={handleEndTask} />
      )),
    [activeTasks]
  );



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <StatsCard
            emoji={require('~/assets/emoji-complated.png')}
            label="Completed Tasks"
            count={completedTasks.length}
            cardStyle="purple"
          />
          <StatsCard
            emoji={require('~/assets/emoji-timer.png')}
            label="Pending Tasks"
            count={pendingTasks.length}
            cardStyle="white"
          />
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Charts</Text>
            <View style={styles.taskCountBadge}>
              <Text style={styles.taskCountText}>{tasks?.length}</Text>
            </View>
          </View>
       
        </View>
        <TaskProgressChart />

        <View style={styles.taskSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Active Tasks</Text>
              <View style={styles.taskCountBadge}>
                <Text style={styles.taskCountText}>{activeTasks.length}</Text>
              </View>
            </View>
       
          </View>

          {activeTasks.length === 0 ? renderEmptyState() : renderTaskCards()}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  taskSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  taskCountBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  taskCountText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '500',
  },
});
