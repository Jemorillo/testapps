import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, MapPin, Clock, Star, Trophy, ThumbsUp, Crown } from 'lucide-react-native';

const mockMatches = [
  {
    id: '1',
    homeTeam: 'Thunder FC',
    awayTeam: 'Lightning United',
    date: '2025-01-15',
    time: '15:00',
    location: 'Central Stadium',
    homeColor: '#EF4444',
    awayColor: '#3B82F6',
    status: 'completed',
    score: { home: 2, away: 1 },
    votes: {
      manOfTheMatch: 'John Smith',
      bestGoal: 'Mike Johnson',
      fairPlay: 'Thunder FC',
    },
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

export default function Matches() {
  const [matches, setMatches] = useState(mockMatches);
  const [modalVisible, setModalVisible] = useState(false);
  const [voteModalVisible, setVoteModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isAdmin] = useState(true);
  const [newMatch, setNewMatch] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    location: '',
  });

  const handleCreateMatch = () => {
    if (!newMatch.homeTeam || !newMatch.awayTeam || !newMatch.date) return;

    const match = {
      id: Date.now().toString(),
      ...newMatch,
      homeColor: '#22C55E',
      awayColor: '#3B82F6',
      status: 'upcoming',
    };

    setMatches([...matches, match]);
    setNewMatch({ homeTeam: '', awayTeam: '', date: '', time: '', location: '' });
    setModalVisible(false);
  };

  const openVoteModal = (match) => {
    setSelectedMatch(match);
    setVoteModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        {isAdmin && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {matches.map((match) => (
            <TouchableOpacity
              key={match.id}
              style={styles.matchCard}
              onPress={() => match.status === 'completed' && openVoteModal(match)}
            >
              <View style={styles.matchStatus}>
                <Text style={styles.matchDate}>{formatDate(match.date)}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    match.status === 'completed'
                      ? styles.completedBadge
                      : styles.upcomingBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      match.status === 'completed'
                        ? styles.completedText
                        : styles.upcomingText,
                    ]}
                  >
                    {match.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.teamsContainer}>
                <View style={styles.team}>
                  <View
                    style={[styles.teamColor, { backgroundColor: match.homeColor }]}
                  />
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
                  <View
                    style={[styles.teamColor, { backgroundColor: match.awayColor }]}
                  />
                  <Text style={styles.teamName}>{match.awayTeam}</Text>
                </View>
              </View>

              <View style={styles.matchDetails}>
                <View style={styles.detailItem}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{match.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{match.location}</Text>
                </View>
              </View>

              {match.status === 'completed' && match.votes && (
                <View style={styles.votesSection}>
                  <View style={styles.voteItem}>
                    <Crown size={14} color="#F59E0B" />
                    <Text style={styles.voteText}>
                      Man of the Match: {match.votes.manOfTheMatch}
                    </Text>
                  </View>
                </View>
              )}

              {match.status === 'completed' && (
                <Text style={styles.tapToVote}>Tap to view voting results</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Create Match Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Schedule New Match</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Home Team</Text>
              <TextInput
                style={styles.input}
                placeholder="Select home team"
                value={newMatch.homeTeam}
                onChangeText={(text) => setNewMatch({ ...newMatch, homeTeam: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Away Team</Text>
              <TextInput
                style={styles.input}
                placeholder="Select away team"
                value={newMatch.awayTeam}
                onChangeText={(text) => setNewMatch({ ...newMatch, awayTeam: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={newMatch.date}
                onChangeText={(text) => setNewMatch({ ...newMatch, date: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={newMatch.time}
                onChangeText={(text) => setNewMatch({ ...newMatch, time: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Stadium or field name"
                value={newMatch.location}
                onChangeText={(text) => setNewMatch({ ...newMatch, location: text })}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={handleCreateMatch}
              >
                <Text style={styles.createButtonText}>Schedule Match</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Voting Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={voteModalVisible}
        onRequestClose={() => setVoteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Match Results & Voting</Text>
            
            {selectedMatch && (
              <>
                <View style={styles.matchResultHeader}>
                  <Text style={styles.resultTeams}>
                    {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                  </Text>
                  {selectedMatch.score && (
                    <Text style={styles.resultScore}>
                      {selectedMatch.score.home} - {selectedMatch.score.away}
                    </Text>
                  )}
                </View>

                <View style={styles.votingCategories}>
                  <View style={styles.categoryItem}>
                    <Crown size={20} color="#F59E0B" />
                    <Text style={styles.categoryTitle}>Man of the Match</Text>
                    <Text style={styles.categoryWinner}>
                      {selectedMatch.votes?.manOfTheMatch || 'Not voted yet'}
                    </Text>
                  </View>

                  <View style={styles.categoryItem}>
                    <Star size={20} color="#8B5CF6" />
                    <Text style={styles.categoryTitle}>Best Goal</Text>
                    <Text style={styles.categoryWinner}>
                      {selectedMatch.votes?.bestGoal || 'Not voted yet'}
                    </Text>
                  </View>

                  <View style={styles.categoryItem}>
                    <ThumbsUp size={20} color="#22C55E" />
                    <Text style={styles.categoryTitle}>Fair Play Award</Text>
                    <Text style={styles.categoryWinner}>
                      {selectedMatch.votes?.fairPlay || 'Not voted yet'}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => {
                    // TODO: Implement voting functionality
                  }}
                >
                  <Text style={styles.voteButtonText}>Cast Your Vote</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setVoteModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
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
  matchStatus: {
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
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  votesSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    marginTop: 12,
  },
  voteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  voteText: {
    fontSize: 14,
    color: '#374151',
  },
  tapToVote: {
    fontSize: 12,
    color: '#22C55E',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  createButton: {
    backgroundColor: '#22C55E',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  matchResultHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultTeams: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  votingCategories: {
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  categoryWinner: {
    fontSize: 14,
    color: '#6B7280',
  },
  voteButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});