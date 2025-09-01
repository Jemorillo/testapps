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
import { Plus, Users, CreditCard as Edit, Crown } from 'lucide-react-native';

const mockTeams = [
  {
    id: '1',
    name: 'Thunder FC',
    color: '#EF4444',
    players: [
      { id: '1', name: 'John Smith', position: 'Forward' },
      { id: '2', name: 'Mike Johnson', position: 'Midfielder' },
      { id: '3', name: 'David Wilson', position: 'Defender' },
    ],
  },
  {
    id: '2',
    name: 'Lightning United',
    color: '#3B82F6',
    players: [
      { id: '4', name: 'Alex Brown', position: 'Goalkeeper' },
      { id: '5', name: 'Chris Davis', position: 'Forward' },
      { id: '6', name: 'Ryan Miller', position: 'Midfielder' },
    ],
  },
];

export default function Teams() {
  const [teams, setTeams] = useState(mockTeams);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAdmin] = useState(true); // Mock admin status
  const [newTeam, setNewTeam] = useState({
    name: '',
    color: '#22C55E',
  });

  const teamColors = [
    '#EF4444', '#3B82F6', '#22C55E', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
  ];

  const handleCreateTeam = () => {
    if (!newTeam.name.trim()) return;

    const team = {
      id: Date.now().toString(),
      name: newTeam.name,
      color: newTeam.color,
      players: [],
    };

    setTeams([...teams, team]);
    setNewTeam({ name: '', color: '#22C55E' });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teams</Text>
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
          {teams.map((team) => (
            <View key={team.id} style={styles.teamCard}>
              <View style={styles.teamHeader}>
                <View style={styles.teamInfo}>
                  <View
                    style={[styles.teamColorIndicator, { backgroundColor: team.color }]}
                  />
                  <Text style={styles.teamName}>{team.name}</Text>
                </View>
                {isAdmin && (
                  <TouchableOpacity style={styles.editButton}>
                    <Edit size={16} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.playersSection}>
                <View style={styles.playersHeader}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.playersTitle}>
                    Players ({team.players.length})
                  </Text>
                </View>

                {team.players.length === 0 ? (
                  <Text style={styles.noPlayers}>No players assigned</Text>
                ) : (
                  team.players.map((player) => (
                    <View key={player.id} style={styles.playerItem}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerPosition}>{player.position}</Text>
                    </View>
                  ))
                )}

                {isAdmin && (
                  <TouchableOpacity style={styles.addPlayerButton}>
                    <Plus size={16} color="#22C55E" />
                    <Text style={styles.addPlayerText}>Add Player</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Team</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Team Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter team name"
                value={newTeam.name}
                onChangeText={(text) => setNewTeam({ ...newTeam, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Team Color</Text>
              <View style={styles.colorPicker}>
                {teamColors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newTeam.color === color && styles.selectedColor,
                    ]}
                    onPress={() => setNewTeam({ ...newTeam, color })}
                  />
                ))}
              </View>
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
                onPress={handleCreateTeam}
              >
                <Text style={styles.createButtonText}>Create Team</Text>
              </TouchableOpacity>
            </View>
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
  teamCard: {
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
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamColorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  editButton: {
    padding: 8,
  },
  playersSection: {
    gap: 8,
  },
  playersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  playersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  noPlayers: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
    paddingVertical: 12,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  playerName: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  playerPosition: {
    fontSize: 14,
    color: '#6B7280',
  },
  addPlayerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#22C55E',
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addPlayerText: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '500',
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
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#111827',
    borderWidth: 3,
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
});