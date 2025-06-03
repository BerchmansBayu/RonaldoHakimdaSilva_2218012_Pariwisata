import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Location, Star, Like1, Edit, Trash } from 'iconsax-react-native';
import { fontType, colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

const FavoriteCard = ({ destination, onDelete }) => {
  const navigation = useNavigation();

  const handleDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this favorite?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete(destination?.id);
          }
        }
      ]
    );
  };

 const handleEdit = () => {
  navigation.navigate('EditForm', { id: destination.id });
};
  if (!destination) {
    return (
      <View style={[styles.cardContainer, styles.centered, { height: 100 }]}>
        <Text style={{ color: colors.grey() }}>Data not found</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.85}>
      <Image source={{ uri: destination.Image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle} numberOfLines={1}>{destination.Title}</Text>
          <View style={styles.locationRow}>
            <Location size={14} color={colors.grey(0.8)} />
            <Text style={styles.locationText}>
              {destination.Category?.name || '-'}
            </Text>
          </View>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {destination.Description}
          </Text>
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Like1 size={16} color={colors.oceanBlue()} variant="Bold" />
              <Text style={styles.likesText}>{destination.TotalLikes}</Text>
            </View>
            <View style={styles.infoBox}>
              <Star size={16} color={colors.sunsetOrange()} variant="Bold" />
              <Text style={styles.ratingText}>{destination.Rating}</Text>
            </View>
          </View>
        </View>
        {/* Edit & Delete Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleEdit}>
            <Edit size={20} color={colors.oceanBlue()} variant="Bold" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
            <Trash size={20} color={colors.red()} variant="Bold" />
          </TouchableOpacity>
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
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.darkModeNavy(0.12),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 100,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    backgroundColor: colors.grey(0.1),
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.darkModeNavy(),
    marginBottom: 4,
    maxWidth: '95%',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.8),
  },
  descriptionText: {
    fontSize: 13,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
    marginBottom: 10,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 2,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey(0.06),
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  likesText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.oceanBlue(),
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.sunsetOrange(),
  },
  actionRow: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 12,
    height: 60,
    gap: 8,
  },
  actionBtn: {
    padding: 4,
    borderRadius: 8,
  },
});