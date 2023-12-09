import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, Button, Modal, TextInput,Picker } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddModal from './AddModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PickerIOS } from '@react-native-picker/picker';
const CourseListScreen = ({navigation}) => {
  // const [courses, setCourses] = useState([
  //   {
  //     id: '1',
  //     courseName: 'React Native Basics',
  //     duration: '10 hours',
  //     category: 'Mobile Development',
  //     subCategory: 'React Native',
  //     description: 'Learn the fundamentals of React Native development.',
  //   },
  //   {
  //     id: '2',
  //     courseName: 'React Native Basics 2',
  //     duration: '10 hours',
  //     category: 'Mobile Development',
  //     subCategory: 'React Native',
  //     description: 'Learn the fundamentals of React Native development.',
  //   },
  //   {
  //       id: '3',
  //       courseName: 'React Native Basics 2',
  //       duration: '10 hours',
  //       category: 'Mobile Development',
  //       subCategory: 'React Native',
  //       description: 'Learn the fundamentals of React Native development.',
  //     },
  //     {
  //       id: '4',
  //       courseName: 'React Native Basics 2',
  //       duration: '10 hours',
  //       category: 'Mobile Development',
  //       subCategory: 'React Native',
  //       description: 'Learn the fundamentals of React Native development.',
  //     },

  //   // Add more courses as needed
  // ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [categories, setCategories] = useState([]);

  const [courses, setCourses] = useState([]);

  const fetchCourses=async()=>{
    let res = await fetch('http://127.0.0.1:5000/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    let id=AsyncStorage.getItem("user_id")
    if (res.ok) {
      const data = await res.text();
      let courses=JSON.parse(data).courses
      courses.filter((course)=>course?.teacher_id==id)
      // setCourses(courses)
    }
  }

  const fetchCategories=async()=>{
    let res = await fetch('http://127.0.0.1:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    categories=await res.text()
    categories=JSON.parse(categories).categories
    console.log("ciourse",categories)

    setCategories(categories)
  }
  useEffect(()=>{
    fetchCourses()
    fetchCategories()
  },[])
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddCourse = async() => {
    // Validate input fields
    if (!newCourseName || !newDuration || !newCategory || !newSubCategory || !newDescription) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    else{

      // check if the current category exist -> if exist grab its id
      // check if the current subcategory exist-> if exist grab its id
      // add 
      let res = await fetch('http://127.0.0.1:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    categories=await res.text()
    categories=JSON.parse(categories).categories
    found=categories.filter(cat=>cat.name==newCategory)
    console.log("lasdnf",found[0]?.cat_id)
    if (found.length>0){
      let res1 = await fetch(`http://127.0.0.1:5000/categories/${found[0]?.cat_id}/subcategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      sub=await res1.text()
      sub=JSON.parse(sub)?.subcategories
      subFound=sub.filter(sub=>sub.name==newSubCategory)
      if(subFound?.length>0){
        let res = await fetch('http://127.0.0.1:5000/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            subcat_id : subFound[0]?.subcat_id,
            price : 6,
            description : newDescription,
            content : newCourseName,
            ratings : 0,
            number_of_lessons : newDuration,
            teacher_id : 1
          }),
        });   
      }

      // add subcat to the category

      
      console.log("subw",subFound)
    }
      
    //   console.log(subFound)
    // }
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
      <View style={{flex:0.92}}>
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
        <PickerIOS
        selectedValue={categories[0]}
        onValueChange={(itemValue) => handleCategoryChange(itemValue)}
      >
        <PickerIOS.Item label="Select Category" value="" />
        {categories.map((category, index) => (
          <PickerIOS.Item key={index} label={category} value={category} />
        ))}
      </PickerIOS>
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

<TouchableOpacity onPress={handleAddCourse} style={{backgroundColor:'#24a0ed',paddingHorizontal:20,borderRadius:20,padding:8}}>
      <Text style={{ fontSize: 15,  textAlign: 'center',color:'white' }}>Add Course</Text>
        </TouchableOpacity>         
           <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      </View>
      <View style={{flex:0.08,justifyContent:'space-around',alignItems:'center',marginTop:20,flexDirection:'row'}}>
      <TouchableOpacity onPress={toggleModal} style={{backgroundColor:'#24a0ed',paddingHorizontal:20,borderRadius:20,padding:8}}>
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
