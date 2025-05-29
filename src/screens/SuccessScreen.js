import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

export default function SuccessScreen({ route, navigation }) {
  const { booking } = route.params;

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.successCard}>
        <Text style={styles.checkmark}>✓</Text>
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successMessage}>
          Your appointment has been successfully booked.
        </Text>

        <View style={styles.bookingDetails}>
          <Text style={styles.detailsTitle}>Appointment Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Barber:</Text>
            <Text style={styles.detailValue}>{booking.barber}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service:</Text>
            <Text style={styles.detailValue}>{booking.service}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{booking.date}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{booking.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={[styles.detailValue, styles.price]}>{booking.price}</Text>
          </View>
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={handleBackToHome}>
          <Text style={globalStyles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  checkmark: {
    fontSize: 60,
    color: colors.success,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  bookingDetails: {
    width: '100%',
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.textLight,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  price: {
    color: colors.accent,
    fontSize: 18,
  },
});