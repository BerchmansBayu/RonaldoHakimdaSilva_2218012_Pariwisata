import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { Element3, SearchNormal, HambergerMenu, Location, Star } from 'iconsax-react-native';
import { fontType } from './src/theme';
import colors from './src/theme/colors';
import { DestinationCard, ListDestinations } from './src/components';
import { destinations } from './src/data';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Budaya');
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Element3 color={colors.white()} variant="Linear" size={28} />
        <Text style={styles.title}>Explore Timor Leste</Text>
        <HambergerMenu color={colors.white()} size={28} />
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Cari tempat wisata"
          placeholderTextColor={colors.darkModeNavy(0.7)}
        />
        <Pressable style={styles.button}>
          <SearchNormal size={24} color={colors.white()} />
        </Pressable>
      </View>

      <View style={styles.categoryOptions}>
        <Text style={styles.categoryTitle}>Kategori Wisata</Text>
        <View style={styles.categoryButtons}>
          {['Pantai', 'Budaya', 'Alam'].map((category) => (
            <Pressable 
              key={category} 
              style={selectedCategory === category ? styles.selectedCategoryButton : styles.categoryButton}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={selectedCategory === category ? styles.selectedCategoryText : styles.categoryText}>
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ListDestinations category={selectedCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white() },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, paddingHorizontal: 20, backgroundColor: colors.oceanBlue(), elevation: 8 },
  title: { fontSize: 24, fontFamily: fontType['Pjs-ExtraBold'], color: colors.white() },
  searchBar: { flexDirection: 'row', margin: 16, alignItems: 'center', borderColor: colors.sand(0.4), borderWidth: 1, backgroundColor: colors.white(), borderRadius: 12, padding: 10 },
  input: { flex: 1, fontSize: 16, paddingHorizontal: 10, color: colors.darkModeNavy() },
  button: { backgroundColor: colors.sunsetOrange(), padding: 12, borderRadius: 10 },
  categoryOptions: { padding: 16 },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', color: colors.darkModeNavy() },
  categoryButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  categoryButton: { padding: 12, backgroundColor: colors.skyBlue(0.3), borderRadius: 10 },
  categoryText: { color: colors.darkModeNavy() },
  selectedCategoryButton: { padding: 12, backgroundColor: colors.oceanBlue(), borderRadius: 10 },
  selectedCategoryText: { color: colors.white() },
});