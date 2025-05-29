import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles, colors } from '../styles/globalStyles';

const ANIMATION_DURATION = 300;

export default function BookingScreen({ route, navigation }) {
  const { barber, service } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  // Start animations on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleDateChange = useCallback((event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleTimeChange = useCallback((event, time) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (time) {
      setSelectedTime(time);
    }
  }, []);

  const formatDate = useCallback((date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const formatTime = useCallback((time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const handleBooking = useCallback(() => {
    const bookingData = {
      id: Date.now(),
      barber: barber.name,
      service: service.name,
      price: service.price,
      date: formatDate(selectedDate),
      time: formatTime(selectedTime),
      timestamp: new Date().toISOString(),
    };

    navigation.navigate('Success', { booking: bookingData });
  }, [barber.name, service.name, service.price, selectedDate, selectedTime, formatDate, formatTime, navigation]);

  const renderSummaryCard = () => (
    <Animated.View
      style={[
        styles.summaryCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <View style={styles.summaryAccent} />
      </View>
      
      <View style={styles.summaryContent}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Barber</Text>
          <Text style={styles.summaryValue}>{barber.name}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service</Text>
          <Text style={styles.summaryValue}>{service.name}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Duration</Text>
          <Text style={styles.summaryValue}>{service.duration}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={[styles.summaryRow, styles.priceRow]}>
          <Text style={styles.summaryLabel}>Total Price</Text>
          <Text style={styles.priceValue}>{service.price}</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderDateSection = () => (
    <Animated.View
      style={[
        styles.sectionCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Text style={styles.sectionTitle}>Select Date</Text>
      <Text style={styles.sectionSubtitle}>Choose your preferred appointment date</Text>
      
      <TouchableOpacity
        style={styles.dateTimeButton}
        onPress={() => setShowDatePicker(true)}
        activeOpacity={0.8}
      >
        <View style={styles.dateTimeContent}>
          <Text style={styles.dateTimeLabel}>📅</Text>
          <Text style={styles.dateTimeText}>{formatDate(selectedDate)}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </Animated.View>
  );

  const renderTimeSection = () => (
    <Animated.View
      style={[
        styles.sectionCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Text style={styles.sectionTitle}>Select Time</Text>
      <Text style={styles.sectionSubtitle}>Choose your preferred appointment time</Text>
      
      <TouchableOpacity
        style={styles.dateTimeButton}
        onPress={() => setShowTimePicker(true)}
        activeOpacity={0.8}
      >
        <View style={styles.dateTimeContent}>
          <Text style={styles.dateTimeLabel}>🕐</Text>
          <Text style={styles.dateTimeText}>{formatTime(selectedTime)}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </TouchableOpacity>
      
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </Animated.View>
  );

  const renderBookButton = () => (
    <Animated.View
      style={[
        styles.bookButtonContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBooking}
        activeOpacity={0.9}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
        <Text style={styles.bookButtonSubtext}>Book your appointment now</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {renderSummaryCard()}
        {renderDateSection()}
        {renderTimeSection()}
        {renderBookButton()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },

  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  summaryHeader: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  summaryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  summaryAccent: {
    width: 40,
    height: 3,
    backgroundColor: colors.white,
    borderRadius: 2,
    opacity: 0.8,
  },

  summaryContent: {
    padding: 24,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
    opacity: 0.5,
  },

  priceRow: {
    marginBottom: 0,
    paddingTop: 8,
  },

  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.3,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    fontWeight: '400',
  },

  dateTimeButton: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  dateTimeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },

  dateTimeLabel: {
    fontSize: 20,
    marginRight: 12,
  },

  dateTimeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  chevron: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: '300',
  },

  bookButtonContainer: {
    marginTop: 12,
  },

  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  bookButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  bookButtonSubtext: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    fontWeight: '400',
  },
});