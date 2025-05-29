import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/globalStyles';

export default function BarberCard({ barber, onPress }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites') || '[]';
      const favoritesArray = JSON.parse(favorites);
      
      if (isFavorite) {
        const updatedFavorites = favoritesArray.filter(id => id !== barber.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        favoritesArray.push(barber.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      }
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <Image source={{ uri: barber.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{barber.name}</Text>
          <Text style={styles.experience}>Experience: {barber.experience}</Text>
          <Text style={styles.rating}>★ {barber.rating}</Text>
          <Text style={styles.specialties}>
            {barber.specialties.join(' • ')}
          </Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Text style={[styles.heart, { color: isFavorite ? colors.accent : colors.textLight }]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: colors.accent,
    marginBottom: 4,
  },
  specialties: {
    fontSize: 12,
    color: colors.textLight,
  },
  favoriteButton: {
    padding: 8,
  },
  heart: {
    fontSize: 24,
  },
});