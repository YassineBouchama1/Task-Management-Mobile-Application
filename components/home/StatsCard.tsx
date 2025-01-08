import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type StatsCardProps = {
  emoji: any;
  label: string;
  count: number;
  cardStyle: 'purple' | 'white';
};

const StatsCard = ({ emoji, label, count, cardStyle }: StatsCardProps) => {
  return (
    <View style={[styles.statsCard, cardStyle === 'purple' ? styles.purpleCard : styles.whiteCard]}>
      <Image source={emoji} style={styles.emoji} />
      <Text style={[styles.statsLabel, cardStyle === 'white' && { color: '#F4A261' }]}>
        {label}
      </Text>
      <Text style={[styles.statsNumber, cardStyle === 'white' && { color: 'gray' }]}>{count}</Text>
    </View>
  );
};

export default memo(StatsCard);

const styles = StyleSheet.create({
  statsCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  purpleCard: {
    minHeight: 220,
    backgroundColor: '#7C3AED',
  },
  whiteCard: {
    minHeight: 220,
    backgroundColor: '#FFFFFF',
  },
  emoji: {
    height: 50,
    width: 50,
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  statsNumber: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
