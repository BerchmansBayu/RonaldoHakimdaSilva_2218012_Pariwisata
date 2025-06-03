import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import DestinationCard from './DestinationCard';
import { destinations } from '../data';
import { colors } from '../theme';

export default function ListDestinations({ category }) {
  return (
    <ScrollView>
      <View style={styles.itemVertical}>
        {destinations.filter(dest => dest.category === category).map((destination, index) => (
          <DestinationCard key={index} destination={destination} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemVertical: { 
    padding: 16,
  },
});