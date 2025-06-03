import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { SearchBar } from '../../components';
import { fontType, colors } from '../../theme';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
      </View>
      
      {/* This will be the content area where search results would appear */}
      <View style={styles.contentArea}>
        {searchPhrase ? (
          <Text style={styles.resultsText}>
            Showing results for "{searchPhrase}"
          </Text>
        ) : (
          <Text style={styles.placeholderText}>
            Search for destinations, experiences, or cultural attractions
          </Text>
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: colors.white(),
  },
  contentArea: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 16,
    color: colors.grey(0.7),
    textAlign: 'center',
  },
  resultsText: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 18,
    color: colors.darkModeNavy(),
    marginTop: 20,
  }
});