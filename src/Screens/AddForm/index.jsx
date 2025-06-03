import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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

  const handleChange = (key, value) => {
    setDestinationData({
      ...destinationData,
      [key]: value,
    });
  };

  const [image, setImage] = useState('');
  const [highlight, setHighlight] = useState('');

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

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.title}>Add New Destination</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
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

        <View style={[textInput.borderDashed, {minHeight: 150}]}>
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
<Text
  style={{
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  }}>
  Category
</Text>
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
<Text
  style={{
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  }}>
  Highlights
</Text>
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
</ScrollView>

<View style={styles.bottomBar}>
<TouchableOpacity style={styles.button} onPress={() => {}}>
<Text style={styles.buttonLabel}>Upload</Text>
</TouchableOpacity>
</View>
</View>
);
};

export default AddForm;

// StyleSheet (lanjutan atau sesuaikan)
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
elevation: 8,
paddingTop: 8,
paddingBottom: 4,
},
title: {
fontFamily: fontType['Pjs-Bold'],
fontSize: 16,
color: colors.black(),
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
