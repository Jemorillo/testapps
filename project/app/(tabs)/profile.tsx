import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { User, Mail, MapPin, Settings, LogOut, Crown, CreditCard as Edit, Save, Shield } from 'lucide-react-native';

export default function Profile() {
  const router = useRouter();
  const [isAdmin] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    position: 'Forward',
    teamName: 'Thunder FC',
  });

  const handleLogout = () => {
    router.replace('/(auth)');
  };

  const handleSave = () => {
    setEditing(false);
    // TODO: Save profile changes to Supabase
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editing ? handleSave() : setEditing(true)}
        >
          {editing ? (
            <Save size={20} color="#22C55E" />
          ) : (
            <Edit size={20} color="#6B7280" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={40} color="#FFFFFF" />
              </View>
              {isAdmin && (
                <View style={styles.adminBadge}>
                  <Crown size={16} color="#F59E0B" />
                </View>
              )}
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.name}
                    onChangeText={(text) => setProfile({...profile, name: text})}
                  />
                ) : (
                  <Text style={styles.value}>{profile.name}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.email}
                    onChangeText={(text) => setProfile({...profile, email: text})}
                    keyboardType="email-address"
                  />
                ) : (
                  <Text style={styles.value}>{profile.email}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Position</Text>
                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={profile.position}
                    onChangeText={(text) => setProfile({...profile, position: text})}
                  />
                ) : (
                  <Text style={styles.value}>{profile.position}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Current Team</Text>
                <Text style={styles.value}>{profile.teamName}</Text>
              </View>
            </View>
          </View>

          {/* Admin Panel */}
          {isAdmin && (
            <View style={styles.adminPanel}>
              <View style={styles.adminHeader}>
                <Shield size={20} color="#3B82F6" />
                <Text style={styles.adminTitle}>Admin Panel</Text>
              </View>

              <TouchableOpacity style={styles.adminOption}>
                <Text style={styles.adminOptionText}>Manage Voting Categories</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.adminOption}>
                <Text style={styles.adminOptionText}>Manage Players</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.adminOption}>
                <Text style={styles.adminOptionText}>Match Results</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.adminOption}>
                <Text style={styles.adminOptionText}>System Settings</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Matches Played</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Goals Scored</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Man of the Match</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Assists</Text>
              </View>
            </View>
          </View>

          {/* Settings */}
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingOption}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.settingText}>App Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingOption} onPress={handleLogout}>
              <LogOut size={20} color="#EF4444" />
              <Text style={[styles.settingText, { color: '#EF4444' }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
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
  editButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  value: {
    fontSize: 16,
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  adminPanel: {
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
  adminHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  adminOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 8,
  },
  adminOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  statsCard: {
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
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: '40%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22C55E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingText: {
    fontSize: 16,
    color: '#374151',
  },
});