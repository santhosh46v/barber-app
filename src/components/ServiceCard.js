import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export default function ServiceCard({ service, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.price}>{service.price}</Text>
      </View>
      <Text style={styles.duration}>Duration: {service.duration}</Text>
      <Text style={styles.description}>{service.description}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
  },
  duration: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});