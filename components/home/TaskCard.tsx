import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '~/types/task';
import { formatTime } from '~/utils';
import { useOpenGoogleMaps } from '~/hooks/useOpenGoogleMaps';

type TaskCardProps = {
  task: Task;
  onCompleteTask: (id: string) => void; 
};

const TaskCard = ({ task, onCompleteTask }: TaskCardProps) => {

 

  return (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Image source={require('~/assets/profile.jpg')} style={styles.avatarImage} />
          </View>
          <Text style={styles.userName}>Yassine</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>In Progress</Text>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <Text style={styles.timeText}>
          {formatTime(task.startTime)} - {formatTime(task.endTime)}
        </Text>
      </View>

      <Text style={styles.taskTitle}>{task.title}</Text>

      {/* <View style={styles.taskLocation}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.locationText}>Youcode</Text>
      </View> */}

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.completeButton]}
          onPress={() => onCompleteTask(task.id)}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>

        {task.startLocation && (
          <TouchableOpacity
            style={[styles.actionButton, styles.mapButton]}
            onPress={() => useOpenGoogleMaps(task)}>
            <Ionicons name="map-outline" size={16} color="#1976D2" />
            <Text style={styles.mapText}>Map</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default memo(TaskCard);

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  timeText: {
    color: '#666',
    fontSize: 14,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  taskLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  mapButton: {
    backgroundColor: '#E3F2FD',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  mapText: {
    color: '#1976D2',
  },
});
