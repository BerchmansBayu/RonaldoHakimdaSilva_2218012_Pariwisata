import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Location, Star } from 'iconsax-react-native';
import { fontType, colors } from '../theme';

export default function DestinationCard({ destination }) {
  return (
    <View style={styles.cardItem}>
      <Image style={styles.cardImage} source={{ uri: destination.image }} />
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
  );
}

const styles = StyleSheet.create({
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
  cardImage: { width: 110, height: 110, borderRadius: 12 },
  cardContent: { padding: 12, flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.darkModeNavy(), marginBottom: 6 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  locationText: { fontSize: 14, color: colors.darkModeNavy(0.7), marginLeft: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ratingText: { fontSize: 14, color: colors.darkModeNavy(), marginLeft: 4, fontWeight: '500' },
  detailButton: { backgroundColor: colors.oceanBlue(), padding: 8, alignItems: 'center', marginTop: 6, borderRadius: 10 },
  detailText: { color: colors.white(), fontSize: 14, fontWeight: '500' },
});
