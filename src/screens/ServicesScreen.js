import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ServiceCard from '../components/ServiceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { services } from '../data/mockData';
import { globalStyles, colors } from '../styles/globalStyles';

const ANIMATION_DURATION = 300;

export default function ServicesScreen({ route, navigation }) {
  const { barber } = route.params;
  const [loading, setLoading] = useState(true);
  const [barberServices, setBarberServices] = useState([]);
  const [headerOpacity] = useState(new Animated.Value(0));
  const [listOpacity] = useState(new Animated.Value(0));
  const [barberInfoScale] = useState(new Animated.Value(0.95));

  // Load services for selected barber
  useEffect(() => {
    setTimeout(() => {
      const filteredServices = services.filter(service => service.barberId === barber.id);
      setBarberServices(filteredServices);
      setLoading(false);
    }, 500);
  }, [barber.id]);

  // Start animations after loading
  const startAnimations = useCallback(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(barberInfoScale, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, barberInfoScale, listOpacity]);

  useEffect(() => {
    if (!loading) {
      startAnimations();
    }
  }, [loading, startAnimations]);

  const handleServicePress = useCallback((service) => {
    navigation.navigate('Booking', { barber, service });
  }, [navigation, barber]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderServiceItem = useCallback(({ item, index }) => (
    <Animated.View
      style={[
        styles.serviceWrapper,
        {
          opacity: listOpacity,
          transform: [{
            translateY: listOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })
          }]
        }
      ]}
    >
      <ServiceCard
        service={item}
        onPress={() => handleServicePress(item)}
        style={[
          styles.serviceCard,
          index === barberServices.length - 1 && styles.lastServiceCard
        ]}
      />
    </Animated.View>
  ), [listOpacity, handleServicePress, barberServices.length]);

  const renderBarberInfo = () => (
    <Animated.View
      style={[
        styles.barberInfoContainer,
        {
          opacity: headerOpacity,
          transform: [{ scale: barberInfoScale }]
        }
      ]}
    >
      <View style={styles.barberInfo}>
        <View style={styles.barberImageContainer}>
          <Image 
            source={{ uri: barber.image }} 
            style={styles.barberImage}
            resizeMode="cover"
          />
          <View style={styles.onlineIndicator} />
        </View>
        
        <View style={styles.barberDetails}>
          <Text style={styles.barberName}>{barber.name}</Text>
          <Text style={styles.barberExperience}>{barber.experience}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>{barber.rating}</Text>
            </View>
            <View style={styles.specialtyBadge}>
              <Text style={styles.specialtyText}>Specialist</Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderSectionHeader = () => (
    <Animated.View 
      style={[
        styles.sectionHeaderContainer,
        { opacity: headerOpacity }
      ]}
    >
      <Text style={styles.servicesTitle}>Available Services</Text>
      <Text style={styles.servicesSubtitle}>
        Choose from {barberServices.length} professional services
      </Text>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No services available</Text>
      <Text style={styles.emptySubtext}>Please check back later</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {renderBarberInfo()}
      {renderSectionHeader()}
      
      <Animated.View style={[styles.listWrapper, { opacity: listOpacity }]}>
        <FlatList
          data={barberServices}
          keyExtractor={(item) => `service-${item.id}`}
          renderItem={renderServiceItem}
          contentContainerStyle={[
            styles.listContainer,
            barberServices.length === 0 && styles.emptyListContainer
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          bounces={true}
          scrollEventThrottle={16}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  barberInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    marginTop: 20
  },

  barberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  barberImageContainer: {
    position: 'relative',
    marginRight: 16,
  },

  barberImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: colors.white,
  },

  barberDetails: {
    flex: 1,
  },

  barberName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.3,
  },

  barberExperience: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 12,
    fontWeight: '500',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  starIcon: {
    fontSize: 16,
    color: colors.accent,
    marginRight: 4,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },

  specialtyBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  specialtyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  sectionHeaderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  servicesTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
    letterSpacing: 0.3,
  },

  servicesSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '400',
  },

  listWrapper: {
    flex: 1,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },

  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  serviceWrapper: {
    marginBottom: 12,
  },

  serviceCard: {
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  lastServiceCard: {
    marginBottom: 0,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },

  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '400',
  },
});