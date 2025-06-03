import React, { useState, useRef } from 'react';
import {Animated,StyleSheet,Text,TextInput,View,Pressable,} from 'react-native';
import {Element3,SearchNormal,HambergerMenu,
} from 'iconsax-react-native';
import { fontType } from '../../theme';
import { colors } from '../../theme';
import { ListDestinations } from '../../components';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Budaya');
  const navigation = useNavigation();
  
  // Animasi
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 60); // tinggi header = 60
  const headerY = diffClampY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  // Function untuk navigasi ke halaman Search
  const handleSearchPress = () => {
    navigation.navigate('SearchPage');
  };

  return (
    <View style={styles.container}>
      {/* Header dengan animasi */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <Element3 color={colors.white()} variant="Linear" size={28} />
        <Text style={styles.title}>Explore Timor Leste</Text>
        <HambergerMenu color={colors.white()} size={28} />
      </Animated.View>

      {/* Konten dengan scroll animasi */}
      {/* Search Bar - Dikeluarkan dari ScrollView untuk menghindari bug animasi */}
      <View style={[styles.searchBar, { marginTop: 72 }]}>
        <TextInput
          style={styles.input}
          placeholder="Cari tempat wisata"
          placeholderTextColor={colors.darkModeNavy(0.7)}
          onFocus={handleSearchPress} // Juga navigasi saat user fokus ke input
        />
        <Pressable style={styles.button} onPress={handleSearchPress}>
          <SearchNormal size={24} color={colors.white()} />
        </Pressable>
      </View>
      
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.categoryOptions}>
          <Text style={styles.categoryTitle}>Kategori Wisata</Text>
          <View style={styles.categoryButtons}>
            {['Pantai', 'Budaya', 'Alam'].map((category) => (
              <Pressable
                key={category}
                style={
                  selectedCategory === category
                    ? styles.selectedCategoryButton
                    : styles.categoryButton
                }
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={
                    selectedCategory === category
                      ? styles.selectedCategoryText
                      : styles.categoryText
                  }
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <ListDestinations category={selectedCategory} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white() },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.oceanBlue(),
    elevation: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  searchBar: {
    flexDirection: 'row',
    margin: 16,
    alignItems: 'center',
    borderColor: colors.sand(0.4),
    borderWidth: 1,
    backgroundColor: colors.white(),
    borderRadius: 12,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: colors.darkModeNavy(),
  },
  button: {
    backgroundColor: colors.sunsetOrange(),
    padding: 12,
    borderRadius: 10,
  },
  categoryOptions: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkModeNavy(),
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  categoryButton: {
    padding: 12,
    backgroundColor: colors.skyBlue(0.3),
    borderRadius: 10,
  },
  categoryText: {
    color: colors.darkModeNavy(),
  },
  selectedCategoryButton: {
    padding: 12,
    backgroundColor: colors.oceanBlue(),
    borderRadius: 10,
  },
  selectedCategoryText: {
    color: colors.white(),
  },
});