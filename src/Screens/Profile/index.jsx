import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Setting2, Heart, Edit } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { profileData } from '../../data';
import { FavoriteCard } from '../../components';
import { fontType, colors } from '../../theme';

const formatNumber = number => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};

const Profile = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Setting2 color={colors.white()} variant="Linear" size={24} />
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
        }}>
        <View style={styles.profileSection}>
          <Image source={{ uri: profileData.profilePict }} style={styles.profilePic} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.memberSince}>
              Member since {profileData.memberSince}
            </Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.tripsPlanned}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {formatNumber(profileData.following)}
            </Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {formatNumber(profileData.followers)}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <View style={styles.favoritesSection}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color={colors.sunsetOrange()} variant="Bold" />
            <Text style={styles.sectionTitle}>Favorite Places</Text>
          </View>
          
          {profileData.favoritePlaces.map((place, index) => (
            <FavoriteCard key={index} destination={place} />
          ))}
        </View>
      </ScrollView>
      
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddForm')}>
        <Edit color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

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
    paddingHorizontal: 24,
    backgroundColor: colors.oceanBlue(),
    elevation: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.darkModeNavy(),
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.skyBlue(0.1),
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.darkModeNavy(),
  },
  statLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
    marginTop: 4,
  },
  editButton: {
    backgroundColor: colors.oceanBlue(),
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  editButtonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 16,
  },
  favoritesSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.darkModeNavy(),
    marginLeft: 8,
  },
  floatingButton: {
    backgroundColor: colors.oceanBlue(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 10,
    shadowColor: colors.oceanBlue(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});