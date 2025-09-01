import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Users } from 'lucide-react-native';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  homeColor: string;
  awayColor: string;
  status: 'upcoming' | 'completed';
  score?: { home: number; away: number };
}

interface MatchCardProps {
  match: Match;
  onPress?: () => void;
}

export default function MatchCard({ match, onPress }: MatchCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(match.date)}</Text>
        <View
          style={[
            styles.statusBadge,
            match.status === 'completed' ? styles.completedBadge : styles.upcomingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              match.status === 'completed' ? styles.completedText : styles.upcomingText,
            ]}
          >
            {match.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          <View style={[styles.teamColor, { backgroundColor: match.homeColor }]} />
          <Text style={styles.teamName}>{match.homeTeam}</Text>
        </View>

        <View style={styles.scoreContainer}>
          {match.score ? (
            <Text style={styles.score}>
              {match.score.home} - {match.score.away}
            </Text>
          ) : (
            <Text style={styles.vs}>VS</Text>
          )}
        </View>

        <View style={styles.team}>
          <View style={[styles.teamColor, { backgroundColor: match.awayColor }]} />
          <Text style={styles.teamName}>{match.awayTeam}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.detail}>
          <Clock size={14} color="#6B7280" />
          <Text style={styles.detailText}>{match.time}</Text>
        </View>
        <View style={styles.detail}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.detailText}>{match.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  upcomingBadge: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  completedText: {
    color: '#166534',
  },
  upcomingText: {
    color: '#92400E',
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
  scoreContainer: {
    marginHorizontal: 16,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  vs: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
});