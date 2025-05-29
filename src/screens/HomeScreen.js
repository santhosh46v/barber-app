import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import BarberCard from '../components/BarberCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { barbers } from '../data/mockData';
import { globalStyles, colors } from '../styles/globalStyles';

const ANIMATION_DURATION = 300;

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [barbersList, setBarbersList] = useState([]);
  const [headerOpacity] = useState(new Animated.Value(0));
  const [listOpacity] = useState(new Animated.Value(0));

  // Load barbers data
  useEffect(() => {
    setTimeout(() => {
      setBarbersList(barbers);
      setLoading(false);
    }, 1000);
  }, []);

  // Start animations after loading
  const startAnimations = useCallback(() => {
    Animated.stagger(150, [
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, listOpacity]);

  useEffect(() => {
    if (!loading && barbersList.length > 0) {
      startAnimations();
    }
  }, [loading, barbersList.length, startAnimations]);

  const handleBarberPress = useCallback((barber) => {
    navigation.navigate('Services', { barber });
  }, [navigation]);

  const renderBarberItem = useCallback(({ item, index }) => (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          opacity: listOpacity,
          transform: [{
            translateY: listOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            })
          }]
        }
      ]}
    >
      <BarberCard
        barber={item}
        onPress={() => handleBarberPress(item)}
        style={[
          styles.barberCard,
          index === barbersList.length - 1 && styles.lastCard
        ]}
      />
    </Animated.View>
  ), [listOpacity, handleBarberPress, barbersList.length]);

  const renderHeader = () => (
    <Animated.View 
      style={[
        styles.headerContainer,
        { opacity: headerOpacity }
      ]}
    >
      <View style={styles.headerContent}>
        <Text style={[globalStyles.header, styles.mainTitle]}>
          Choose Your Barber
        </Text>
        <Text style={styles.subtitle}>
          Find the perfect barber for your unique style
        </Text>
        <View style={styles.headerAccent} />
      </View>
    </Animated.View>
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
      
      {renderHeader()}
      
      <Animated.View style={[styles.listWrapper, { opacity: listOpacity }]}>
        <FlatList
          data={barbersList}
          keyExtractor={(item) => `barber-${item.id}`}
          renderItem={renderBarberItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
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

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
    backgroundColor: colors.background,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  headerContent: {
    alignItems: 'center',
  },

  mainTitle: {
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 8,
    color: colors.textPrimary,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0.3,
  },

  headerAccent: {
    width: 60,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: 16,
  },

  listWrapper: {
    flex: 1,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },

  cardWrapper: {
    marginBottom: 12,
  },

  barberCard: {
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  lastCard: {
    marginBottom: 0,
  },
});