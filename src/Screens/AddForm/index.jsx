import React, { useState, useRef } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Animated,} from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';

const AddForm = () => {
  const dataCategory = [
    { id: 1, name: 'Pantai' },
    { id: 2, name: 'Budaya' },
    { id: 3, name: 'Alam' }
  ];

  const [destinationData, setDestinationData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    category: {},
    rating: 0,
    reviews: 0,
    highlights: []
  });

  const [image, setImage] = useState('');
  const [highlight, setHighlight] = useState('');
  const navigation = useNavigation();

  const handleChange = (key, value) => {
    setDestinationData({
      ...destinationData,
      [key]: value,
    });
  };

  const addHighlight = () => {
    if (highlight.trim() !== '') {
      const updatedHighlights = [...destinationData.highlights, highlight.trim()];
      setDestinationData({
        ...destinationData,
        highlights: updatedHighlights
      });
      setHighlight('');
    }
  };

  const removeHighlight = (index) => {
    const updatedHighlights = [...destinationData.highlights];
    updatedHighlights.splice(index, 1);
    setDestinationData({
      ...destinationData,
      highlights: updatedHighlights
    });
  };

  // ANIMATED
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Add New Destination</Text>
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
            placeholder="Destination Name"
            value={destinationData.name}
            onChangeText={text => handleChange('name', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>

        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Location"
            value={destinationData.location}
            onChangeText={text => handleChange('location', text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.content}
          />
        </View>

        <View style={[textInput.borderDashed, { minHeight: 150 }]}>
          <TextInput
            placeholder="Description"
            value={destinationData.description}
            onChangeText={text => handleChange('description', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>

        <View style={textInput.borderDashed}>
          <TextInput
            placeholder="Price"
            value={destinationData.price}
            onChangeText={text => handleChange('price', text)}
            placeholderTextColor={colors.grey(0.6)}
            keyboardType="numeric"
            style={textInput.content}
          />
        </View>

        <View style={[textInput.borderDashed]}>
          <TextInput
            placeholder="Image URL"
            value={image}
            onChangeText={text => setImage(text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.content}
          />
        </View>

        <View style={[textInput.borderDashed]}>
          <Text style={styles.label}>Category</Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === destinationData.category.id
                  ? colors.oceanBlue()
                  : colors.grey(0.08);
              const color =
                item.id === destinationData.category.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', { id: item.id, name: item.name })
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

        <View style={[textInput.borderDashed]}>
          <Text style={styles.label}>Highlights</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TextInput
              placeholder="Add highlight"
              value={highlight}
              onChangeText={text => setHighlight(text)}
              placeholderTextColor={colors.grey(0.6)}
              style={[textInput.content, { flex: 1 }]}
            />
            <TouchableOpacity onPress={addHighlight} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          {destinationData.highlights.map((item, index) => (
            <View key={index} style={styles.highlightItem}>
              <Text style={styles.highlightText}>{item}</Text>
              <TouchableOpacity onPress={() => removeHighlight(index)}>
                <Text style={{ color: colors.red() }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AddForm;

// Styles
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
  addButton: {
    backgroundColor: colors.palmGreen(),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  addButtonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    backgroundColor: colors.grey(0.1),
    padding: 10,
    borderRadius: 8,
  },
  highlightText: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 12,
    color: colors.black(),
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
