import { useLocalSearchParams, router } from 'expo-router';
import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import useTaskActions from '~/hooks/useTaskActions';
import useTaskStore from '~/store/taskStore';
import { Task } from '~/types/task';

const TaskDetails = () => {
  // Extract task ID from URL params
  const { id: taskIdParam } = useLocalSearchParams();
  const taskId = Array.isArray(taskIdParam) ? taskIdParam[0] : taskIdParam;

  // Fetch tasks from the store and task actions
  const { tasks } = useTaskStore();
  const { addComment, uploadPhoto, isLoading } = useTaskActions();
  const [comment, setComment] = useState('');

  // Memoize the task to avoid unnecessary recalculations
  const task = useMemo(() => tasks.find((t: Task) => t.id === taskId), [tasks, taskId]);

  // Memoized function to handle adding a comment
  const handleAddComment = useCallback(() => {
    if (comment.trim()) {
      addComment(taskId, comment); // Add comment to the task
      setComment(''); // Clear the input field
    } else {
      Alert.alert('Error', 'Comment cannot be empty.');
    }
  }, [comment, taskId, addComment]);

  // Memoized function to handle uploading a photo
  const handleUploadPhoto = useCallback(async () => {
    await uploadPhoto(taskId);
  }, [taskId, uploadPhoto]);


 const navigateToCamera = () => {
   router.push({
     pathname: '/camera',
     params: { taskId }, // Pass the taskId to the CameraCapture page
   });
 };

  // Display loading indicator if data is being fetched or processed
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Task Title and Status */}
      <Text style={styles.taskTitle}>{task?.title}</Text>
      <Text style={styles.taskStatus}>{task?.status}</Text>

      {/* Comments Section */}
      <Text style={styles.sectionTitle}>Comments</Text>
      {task?.comments?.map((comment: string, index: number) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
      ))}

      {/* Add Comment Section */}
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={comment}
        onChangeText={setComment}
        placeholderTextColor="#999"
      />
      <Button title="Add Comment" onPress={handleAddComment} disabled={isLoading} />

      {/* Photos Section */}
      <Text style={styles.sectionTitle}>Photos</Text>
      {task?.photos?.map((photo: string, index: number) => (
        <Image key={index} source={{ uri: photo }} style={styles.photo} />
      ))}

      {/* Upload Photo Button */}
      <Button title="Upload Photo" onPress={handleUploadPhoto} disabled={isLoading} />
      <Button title="Take Photo" onPress={navigateToCamera} disabled={isLoading} />
    </ScrollView>
  );
};

// Modern and clean styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  taskStatus: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  commentContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#333',
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default TaskDetails;