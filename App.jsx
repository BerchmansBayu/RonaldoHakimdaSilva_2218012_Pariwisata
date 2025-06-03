import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { Element3, SearchNormal, HambergerMenu, Location, Star } from 'iconsax-react-native';
import { fontType } from './src/theme';
import colors from './src/theme/colors';

export default function App() {
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
          <Pressable style={styles.categoryButton}><Text style={styles.categoryText}>Pantai</Text></Pressable>
          <Pressable style={styles.selectedCategoryButton}><Text style={styles.selectedCategoryText}>Budaya</Text></Pressable>
          <Pressable style={styles.categoryButton}><Text style={styles.categoryText}>Alam</Text></Pressable>
        </View>
      </View>

      <ListDestinations />
    </View>
  );
}

// List of destinations
const ListDestinations = () => {
  return (
    <ScrollView>
      <View style={styles.itemVertical}>
        {[{
          name: 'Cristo Rei',
          location: 'Dili',
          rating: '4.8',
          image: 'https://i.pinimg.com/736x/59/83/8b/59838b7e4e8e3a2d7755a89e0e66d8a8.jpg'
        }, {
          name: 'Taman Nasional Nino Konis Santana',
          location: 'Tutuala',
          rating: '4.7',
          image: 'https://th.bing.com/th/id/OIP.KXmQJ1GpQ79V4GUFzPXa4QHaE8?rs=1&pid=ImgDetMain'
        }, {
          name: 'Pantai Jaco',
          location: 'Pulau Jaco',
          rating: '4.9',
          image: 'https://mediaim.expedia.com/destination/2/7a60ed8a2355a4acff2b0a9c19049161.jpg'
        }, {
          name: 'Atauro Island',
          location: 'Atauro',
          rating: '4.6',
          image: 'https://www.touristsecrets.com/wp-content/uploads/2023/10/what-to-do-on-atauro-island-timor-leste-1698495408.jpg'
        }].map((destination, index) => (
          <View key={index} style={styles.cardItem}>
            <Image
              style={styles.cardImage}
              source={{ uri: destination.image }} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{destination.name}</Text>
              <View style={styles.locationContainer}>
                <Location size={16} color={colors.oceanBlue()} />
                <Text style={styles.locationText}>{destination.location}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Star size={16} color={colors.sunsetOrange()} variant="Bold" />
                <Text style={styles.ratingText}>{destination.rating}</Text>
              </View>
              <Pressable style={styles.detailButton}>
                <Text style={styles.detailText}>Lihat Detail</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Style Definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.oceanBlue(),
    elevation: 8,
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
  itemVertical: {
    padding: 16,
  },
  cardItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: colors.white(),
    borderRadius: 10, 
    overflow: 'hidden',
    padding: 12, 
    alignItems: 'center', 
    shadowColor: colors.darkModeNavy(),
    elevation: 5, 
    borderLeftWidth: 4,
    borderLeftColor: colors.oceanBlue(),
  },
  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  cardContent: {
    padding: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkModeNavy(),
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.darkModeNavy(0.7),
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: colors.darkModeNavy(),
    marginLeft: 4,
    fontWeight: '500',
  },
  detailButton: {
    backgroundColor: colors.oceanBlue(),
    padding: 8,
    alignItems: 'center',
    marginTop: 6,
    borderRadius: 10,
  },
  detailText: {
    color: colors.white(),
    fontSize: 14,
    fontWeight: '500',
  },
});