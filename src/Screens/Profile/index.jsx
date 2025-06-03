import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Setting2, Heart, Edit } from 'iconsax-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FavoriteCard } from '../../components';
import { fontType, colors } from '../../theme';
import { profileData } from '../../data';
import firestore from '@react-native-firebase/firestore';

// Helper untuk format angka
const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/.0$/, '') + 'K';
  }
  return number?.toString() || '0';
};

const Profile = () => {
  const navigation = useNavigation();

  // State untuk data profile dan favorite
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);
  const [error, setError] = useState(null);

  // Animasi header
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 60);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  // Fetch profile & favorite dari Firestore
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ambil data profile dari local (atau Firestore jika sudah ada)
      setProfile(profileData);

      // Ambil favorite places user dari Firestore
      const favSnapshot = await firestore().collection('destinations').get();
      const favList = favSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavorites(favList);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  // Hapus favorite dari Firestore
  const handleDeleteFavorite = useCallback(async (id) => {
    setFavLoading(true);
    try {
      await firestore().collection('destinations').doc(id).delete();
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      Alert.alert('Error', 'Failed to delete favorite');
    } finally {
      setFavLoading(false);
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.oceanBlue()} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.red() }}>{error}</Text>
        <TouchableOpacity onPress={fetchProfile} style={{ marginTop: 16 }}>
          <Text style={{ color: colors.oceanBlue() }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header animasi */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Setting2 color={colors.white()} variant="Linear" size={24} />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 72,
          paddingBottom: 100,
        }}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: profile?.profilePict }} style={styles.profilePic} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.name}</Text>
            <Text style={styles.memberSince}>
              Member since {profile?.memberSince}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile?.tripsPlanned}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {formatNumber(profile?.following)}
            </Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {formatNumber(profile?.followers)}
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Favorite Places */}
        <View style={styles.favoritesSection}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color={colors.sunsetOrange()} variant="Bold" />
            <Text style={styles.sectionTitle}>Favorite Places</Text>
          </View>

          {favLoading && (
            <ActivityIndicator size="small" color={colors.oceanBlue()} style={{ marginBottom: 10 }} />
          )}

          {favorites.length === 0 ? (
            <Text style={{ color: colors.grey(0.7), textAlign: 'center', marginTop: 10 }}>
              No favorite places yet.
            </Text>
          ) : (
            favorites.map((place) => (
              <FavoriteCard
                key={place.id}
                destination={place}
                onDelete={handleDeleteFavorite}
              />
            ))
          )}
        </View>
      </Animated.ScrollView>

      {/* Tombol tambah favorite */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddForm')}
      >
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
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
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
    zIndex: 1000,
  },
});