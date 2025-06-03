import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import axios from 'axios';

const EditForm = () => {
  const dataCategory = [
    { id: 1, name: 'Pantai' },
    { id: 2, name: 'Budaya' },
    { id: 3, name: 'Alam' }
  ];

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // id dari blog yang akan diedit

  // State untuk data yang akan diedit
  const [destinationData, setDestinationData] = useState({
    Title: '',
    Category: {},
    Description: '',
    Image: '',
    TotalLikes: 0,
    Rating: 0,
  });

  // Ambil data blog berdasarkan id saat komponen mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://6839347f6561b8d882af5e2b.mockapi.io/api/blog/${id}`);
        setDestinationData(res.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (key, value) => {
    setDestinationData({
      ...destinationData,
      [key]: value,
    });
  };

  // ANIMATED (sama seperti AddForm)
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);

  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
    extrapolate: 'clamp',
  });

  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
    extrapolate: 'clamp',
  });

  // Fungsi update data ke REST API
  const handleUpdate = async () => {
    if (
      !destinationData.Title ||
      !destinationData.Description ||
      !destinationData.Image ||
      !destinationData.Category.id
    ) {
      Alert.alert('Warning', 'Please fill all fields!');
      return;
    }

    try {
      await axios.put(
        `https://6839347f6561b8d882af5e2b.mockapi.io/api/blog/${id}`,
        destinationData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      Alert.alert('Success', 'Blog updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Edit Form</Text>
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
          paddingTop: 62,
          paddingBottom: 80,
        }}
      >
        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Title"
            value={destinationData.Title}
            onChangeText={text => handleChange('Title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>

        <View style={[textInput.borderDashed, { minHeight: 100 }]}>
          <TextInput
            placeholder="Description"
            value={destinationData.Description}
            onChangeText={text => handleChange('Description', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>

        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Image URL"
            value={destinationData.Image}
            onChangeText={text => handleChange('Image', text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.content}
          />
        </View>

        <View style={textInput.borderDashed}>
          <Text style={styles.label}>Category</Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === destinationData.Category.id
                  ? colors.oceanBlue()
                  : colors.grey(0.08);
              const color =
                item.id === destinationData.Category.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('Category', { id: item.id, name: item.name })
                  }
                  style={[category.item, { backgroundColor: bgColor }]}>
                  <Text style={[category.name, { color: color }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Total Likes"
            value={destinationData.TotalLikes?.toString() || '0'}
            onChangeText={text => handleChange('TotalLikes', Number(text) || 0)}
            placeholderTextColor={colors.grey(0.6)}
            keyboardType="numeric"
            style={textInput.content}
          />
        </View>

        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Rating"
            value={destinationData.Rating?.toString() || '0'}
            onChangeText={text => handleChange('Rating', Number(text) || 0)}
            placeholderTextColor={colors.grey(0.6)}
            keyboardType="numeric"
            style={textInput.content}
          />
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditForm;

// Styles sama seperti AddForm
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: colors.white(),
    elevation: 8,
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
  },
  label: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.oceanBlue(),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
});

const textInput = StyleSheet.create({
  borderDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.grey(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
});

const category = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  },
});