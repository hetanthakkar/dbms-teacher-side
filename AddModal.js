import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

const CourseForm = () => {
  const [courseName, setCourseName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!courseName || !duration || !category || !subCategory || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log({
      courseName,
      duration,
      category,
      subCategory,
      description,
    });
  Alert.alert('Success', 'Course successfully added!', [{ text: 'OK' }]);

    // You can add logic to submit the data to a server or perform other actions here
  };

  return (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0', flex: 1 , marginTop:'10%'}}>
      <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>Course Details</Text>

      <PaperTextInput
        label="Course Name"
        value={courseName}
        onChangeText={setCourseName}
        style={{ marginBottom: 10 }}
      />

      <PaperTextInput
        label="Duration (hours)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={{ marginBottom: 10 }}
      />

      <PaperTextInput label="Category" value={category} onChangeText={setCategory} style={{ marginBottom: 10 }} />

      <PaperTextInput label="Subcategory" value={subCategory} onChangeText={setSubCategory} style={{ marginBottom: 10 }} />

      <PaperTextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={{ marginBottom: 20 }}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {/* Add additional styling or components as needed */}
    </View>
  );
};

export default CourseForm;
