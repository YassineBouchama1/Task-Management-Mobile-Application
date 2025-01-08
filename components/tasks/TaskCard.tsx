import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Task, TaskStatus } from '~/types/task';
import { formatDuration, formatTime } from '~/utils';
import { useElapsedTime } from '~/hooks/useElapsedTime';
import { useOpenGoogleMaps } from '~/hooks/useopenGoogleMaps';

interface TaskCardProps {
  task: Task;
  onStartTask: (id: string) => void;
  onEndTask: (id: string) => void;
  isLoading: boolean;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'Completed':
      return { background: '#E8F5E9', text: '#2E7D32' };
    case 'In Progress':
      return { background: '#E3F2FD', text: '#1976D2' };
    case 'Pending':
      return { background: '#FFF3E0', text: '#E65100' };
  }
};

const TaskCard = memo(({ task, onStartTask, onEndTask, isLoading }: TaskCardProps) => {
  const { elapsedTime, isNearDeadline } = useElapsedTime({
    startTime: task.startTime,
    endTime: task.endTime,
    estimatedTime: task.estimatedCompletionTime,
  });

  const estimatedTime = task.estimatedCompletionTime
    ? formatDuration(task.estimatedCompletionTime)
    : 'N/A';



  return (
    <View style={styles.taskCard}>
      <Link
        href={{
          pathname: '/details/[id]',
          params: { id: task.id },
        }}
        style={styles.taskContent}>
        <View>
          <Text style={styles.taskTitle}>{task.title}</Text>
          {task.startTime && (
            <View style={styles.dateContainer}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.dateText}>Started: {formatTime(task.startTime)}</Text>
            </View>
          )}
          {task.endTime && (
            <View style={styles.dateContainer}>
              <Ionicons name="checkmark-circle-outline" size={14} color="#666" />
              <Text style={styles.dateText}>Ended: {formatTime(task.endTime)}</Text>
            </View>
          )}
          <View style={styles.timeInfoContainer}>
            <Text style={styles.timeInfo}>Estimated: {estimatedTime}</Text>
            {elapsedTime > 0 && (
              <Text style={[styles.timeInfo, isNearDeadline && styles.warningText]}>
                Elapsed: {formatDuration(elapsedTime)}
              </Text>
            )}
          </View>
        </View>
      </Link>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: getStatusColor(task.status).background },
          ]}>
          <Text style={[styles.statusText, { color: getStatusColor(task.status).text }]}>
            {task.status}
          </Text>
        </TouchableOpacity>

        {task.status === 'In Progress' && (
          <TouchableOpacity
            onPress={() => onEndTask(task.id)}
            disabled={isLoading}
            style={styles.actionButton}>
            <Text style={styles.actionButtonText}>End Task</Text>
          </TouchableOpacity>
        )}

        {task.status === 'Pending' && (
          <TouchableOpacity
            onPress={() => onStartTask(task.id)}
            disabled={isLoading}
            style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Start Task</Text>
          </TouchableOpacity>
        )}

        {/* Map Button */}
        {(task.status === 'Completed' || task.status === 'In Progress') && (
          <TouchableOpacity onPress={()=>useOpenGoogleMaps(task)} style={styles.mapButton}>
            <Ionicons name="map-outline" size={16} color="#1976D2" />
            <Text style={styles.mapButtonText}>Map</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

TaskCard.displayName = 'TaskCard';

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskContent: {
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1976D2',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  timeInfoContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  timeInfo: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  warningText: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButton: {
    marginLeft: 8,
    padding: 8,
  },
  actionButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  mapButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TaskCard;
