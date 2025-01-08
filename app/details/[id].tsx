import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import useTaskActions from '~/hooks/useTaskActions';
import useTaskStore from '~/store/taskStore';
import { Task } from '~/types/task';


const TaskDetails = () => {

    const { id: taskIdParam } = useLocalSearchParams();
    const taskId = Array.isArray(taskIdParam) ? taskIdParam[0] : taskIdParam;

  const { tasks } = useTaskStore();
  const { addComment, uploadPhoto, isLoading } = useTaskActions();
  const [comment, setComment] = useState('');



 const task = useMemo(() => {
   return tasks.find((t: Task) => t.id === taskId);
 }, [tasks, taskId]);


  const handleAddComment = () => {
    if (comment.trim()) {
      addComment(taskId, comment); // add comment to task
      setComment('');
    } else {
      Alert.alert('Error', 'Comment cannot be empty.');
    }
  };



  const handleUploadPhoto = async () => {
    await uploadPhoto(taskId);
  };




  return (
    <ScrollView style={styles.container}>
   
      <Text style={styles.taskTitle}>{task?.title}</Text>
      <Text style={styles.taskStatus}>{task?.status}</Text>

      {/* here w display Comments */}
      <Text style={styles.sectionTitle}>Comments</Text>
      {task?.comments?.map((comment: string, index: number) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
      ))}

      {/* Start add Comment */}
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Add Comment" onPress={handleAddComment} disabled={isLoading} />

     
      <Text style={styles.sectionTitle}>Photos</Text>
      {task?.photos?.map((photo: string, index: number) => (
        <Image key={index} source={{ uri: photo }} style={styles.photo} />
      ))}

      {/* upload Photo */}
      <Button title="Upload Photo" onPress={handleUploadPhoto} disabled={isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskStatus: {
    fontSize: 16,
    color: 'green',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  commentContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    resizeMode: 'cover',
  },
});

export default TaskDetails;
