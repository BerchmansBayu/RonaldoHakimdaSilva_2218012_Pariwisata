import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Location, Star, Heart } from 'iconsax-react-native';
import { fontType, colors } from '../theme';

const DestinationCard = ({ destination }) => {
  const [isFavorite, setIsFavorite] = useState(destination.isFavorite || false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: destination.image }} style={styles.cardImage} />
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite}
      >
        <Heart
          size={24}
          color={isFavorite ? colors.red() : colors.white()}
          variant={isFavorite ? "Bold" : "Linear"}
        />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{destination.name}</Text>
        <View style={styles.locationContainer}>
          <Location size={16} color={colors.darkModeNavy(0.7)} variant="Linear" />
          <Text style={styles.locationText}>{destination.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" variant="Bold" />
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
      </View>
    </View>
  );
};

export default DestinationCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white(),
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.darkModeNavy(0.3),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.darkModeNavy(0.3),
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.darkModeNavy(),
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.darkModeNavy(0.7),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.darkModeNavy(),
  },
});