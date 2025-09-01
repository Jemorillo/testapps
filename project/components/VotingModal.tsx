import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Crown, Star, ThumbsUp, X } from 'lucide-react-native';

interface VotingModalProps {
  visible: boolean;
  onClose: () => void;
  match: any;
  onVote: (category: string, selection: string) => void;
}

const votingCategories = [
  { id: 'manOfTheMatch', title: 'Man of the Match', icon: Crown, color: '#F59E0B' },
  { id: 'bestGoal', title: 'Best Goal', icon: Star, color: '#8B5CF6' },
  { id: 'fairPlay', title: 'Fair Play Award', icon: ThumbsUp, color: '#22C55E' },
];

export default function VotingModal({ visible, onClose, match, onVote }: VotingModalProps) {
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});

  const handleVote = (categoryId: string, selection: string) => {
    setSelectedVotes(prev => ({
      ...prev,
      [categoryId]: selection,
    }));
  };

  const submitVotes = () => {
    Object.entries(selectedVotes).forEach(([category, selection]) => {
      onVote(category, selection);
    });
    onClose();
  };

  if (!match) return null;

  const allPlayers = [
    ...match.homePlayers || [],
    ...match.awayPlayers || [],
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Vote for Match Awards</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.matchInfo}>
            {match.homeTeam} vs {match.awayTeam}
          </Text>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {votingCategories.map((category) => (
              <View key={category.id} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <category.icon size={20} color={category.color} />
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>

                <View style={styles.optionsContainer}>
                  {allPlayers.map((player) => (
                    <TouchableOpacity
                      key={`${category.id}-${player.id}`}
                      style={[
                        styles.option,
                        selectedVotes[category.id] === player.name && styles.selectedOption,
                      ]}
                      onPress={() => handleVote(category.id, player.name)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selectedVotes[category.id] === player.name && styles.selectedOptionText,
                        ]}
                      >
                        {player.name}
                      </Text>
                      <Text style={styles.playerPosition}>{player.position}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={submitVotes}>
              <Text style={styles.submitButtonText}>Submit Votes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  matchInfo: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
    maxHeight: 400,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#166534',
    fontWeight: '600',
  },
  playerPosition: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});