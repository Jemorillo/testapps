import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Users } from 'lucide-react-native';

const mockMatches = [
  {
    id: '1',
    homeTeam: 'Thunder FC',
    awayTeam: 'Lightning United',
    date: '2025-01-20',
    time: '15:00',
    location: 'Central Stadium',
    homeColor: '#EF4444',
    awayColor: '#3B82F6',
    status: 'upcoming',
  },
  {
    id: '2',
    homeTeam: 'Eagles FC',
    awayTeam: 'Wolves United',
    date: '2025-01-22',
    time: '18:00',
    location: 'West Park Field',
    homeColor: '#8B5CF6',
    awayColor: '#F59E0B',
    status: 'upcoming',
  },
];

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [matches, setMatches] = useState(mockMatches);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Soccer Manager</Text>
        <Text style={styles.headerSubtitle}>Upcoming Matches</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {matches.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No upcoming matches</Text>
              <Text style={styles.emptySubtitle}>
                Check back later for scheduled games
              </Text>
            </View>
          ) : (
            matches.map((match) => (
              <TouchableOpacity key={match.id} style={styles.matchCard}>
                <View style={styles.matchHeader}>
                  <Text style={styles.matchDate}>{formatDate(match.date)}</Text>
                  <View style={styles.matchTime}>
                    <Clock size={14} color="#6B7280" />
                    <Text style={styles.matchTimeText}>{match.time}</Text>
                  </View>
                </View>

                <View style={styles.teamsContainer}>
                  <View style={styles.team}>
                    <View
                      style={[styles.teamColor, { backgroundColor: match.homeColor }]}
                    />
                    <Text style={styles.teamName}>{match.homeTeam}</Text>
                  </View>
                  
                  <Text style={styles.vs}>VS</Text>
                  
                  <View style={styles.team}>
                    <View
                      style={[styles.teamColor, { backgroundColor: match.awayColor }]}
                    />
                    <Text style={styles.teamName}>{match.awayTeam}</Text>
                  </View>
                </View>

                <View style={styles.matchFooter}>
                  <View style={styles.location}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.locationText}>{match.location}</Text>
                  </View>
                  <View style={styles.status}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Upcoming</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  matchDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
  },
  matchTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchTimeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  vs: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  statusText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '500',
  },
});