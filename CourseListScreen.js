import React, { useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddModal from './AddModal'
const CourseListScreen = ({navigation}) => {
  const [courses, setCourses] = useState([
    {
      id: '1',
      courseName: 'React Native Basics',
      duration: '10 hours',
      category: 'Mobile Development',
      subCategory: 'React Native',
      description: 'Learn the fundamentals of React Native development.',
    },
    {
      id: '2',
      courseName: 'React Native Basics 2',
      duration: '10 hours',
      category: 'Mobile Development',
      subCategory: 'React Native',
      description: 'Learn the fundamentals of React Native development.',
    },
    {
        id: '3',
        courseName: 'React Native Basics 2',
        duration: '10 hours',
        category: 'Mobile Development',
        subCategory: 'React Native',
        description: 'Learn the fundamentals of React Native development.',
      },
      {
        id: '4',
        courseName: 'React Native Basics 2',
        duration: '10 hours',
        category: 'Mobile Development',
        subCategory: 'React Native',
        description: 'Learn the fundamentals of React Native development.',
      },

    // Add more courses as needed
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddCourse = () => {
    // Validate input fields
    if (!newCourseName || !newDuration || !newCategory || !newSubCategory || !newDescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Generate a new unique ID (for simplicity, you may use a more robust method)
    const newCourseId = (Math.random() * 100000).toString();

    // Create a new course object
    const newCourse = {
      id: newCourseId,
      courseName: newCourseName,
      duration: newDuration,
      category: newCategory,
      subCategory: newSubCategory,
      description: newDescription,
    };

    // Update the state with the new course
    setCourses((prevCourses) => [...prevCourses, newCourse]);

    // Close the modal
    toggleModal();
  };


  const handleEdit=(id)=>{
    setModalVisible(!isModalVisible);
  }

  const handleDelete = (courseId) => {
    // Show a confirmation alert before deleting
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this course?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => confirmDelete(courseId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  

  const confirmDelete = (courseId) => {
    // Implement the actual delete functionality based on the courseId
    // For simplicity, let's just remove the course from the state
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
  };

  
  const renderCourseCard = ({ item }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.courseName}</Text>
      <Text>{`Duration: ${item.duration}`}</Text>
      <Text>{`Category: ${item.category}`}</Text>
      <Text>{`Subcategory: ${item.subCategory}`}</Text>
      <Text>{`Description: ${item.description}`}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEdit(item.id)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0', flex: 1 }}>
      <View style={{flex:0.92,}}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseCard}
        style={{ flex: 1 }}
      />

      {/* Modal for adding a new course */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          {/* Semi-transparent background overlay */}
          <View style={styles.overlay} />

          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Add New Course</Text>

            <TextInput
              placeholder="Course Name"
              style={styles.input}
              onChangeText={setNewCourseName}
            />
            <TextInput
              placeholder="Duration"
              style={styles.input}
              onChangeText={setNewDuration}
            />
            <TextInput
              placeholder="Category"
              style={styles.input}
              onChangeText={setNewCategory}
            />
            <TextInput
              placeholder="Subcategory"
              style={styles.input}
              onChangeText={setNewSubCategory}
            />
            <TextInput
              placeholder="Description"
              style={styles.input}
              multiline
              onChangeText={setNewDescription}
            />

            <Button title="Add Course" onPress={handleAddCourse} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      </View>
      <View style={{flex:0.08,justifyContent:'space-around',alignItems:'center',marginTop:20,flexDirection:'row'}}>
      <TouchableOpacity style={{backgroundColor:'#24a0ed',paddingHorizontal:20,borderRadius:20,padding:8}}>
      <Text style={{ fontSize: 15,  textAlign: 'center',color:'white' }}>Add Course</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ChatNavigator")} style={{backgroundColor:'#24a0ed',borderRadius:20,padding:8}}>
      <Text style={{ fontSize: 15,  textAlign: 'center',color:'white' }}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#24a0ed',borderRadius:20,padding:8}}>
      <Text style={{ fontSize: 15,  textAlign: 'center',color:'white' }}>Payments</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default CourseListScreen;
