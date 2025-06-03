import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Location, Star } from 'iconsax-react-native';
import { fontType, colors } from '../theme';

const FavoriteCard = ({ destination }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={{ uri: destination.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{destination.name}</Text>
          <View style={styles.locationContainer}>
            <Location size={14} color={colors.grey(0.8)} />
            <Text style={styles.locationText}>{destination.location}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={16} color={colors.sunsetOrange()} variant="Bold" />
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white(),
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: colors.darkModeNavy(0.2),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.darkModeNavy(),
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.8),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.darkModeNavy(),
  },
});