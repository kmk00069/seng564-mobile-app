import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

interface CharacterInfoProps {
  characterName: string;
  setCharacterName: (name: string) => void;
  characterClass: string;
  setCharacterClass: (className: string) => void;
  race: string;
  setRace: (race: string) => void;
  level: number;
  setLevel: (level: number) => void;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
  isDarkMode?: boolean;
}

const dndClasses = [
  "Artificer",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

const CharacterInfo: React.FC<CharacterInfoProps> = ({
  characterName,
  setCharacterName,
  characterClass,
  setCharacterClass,
  race,
  setRace,
  level,
  setLevel,
  isLocked,
  setIsLocked,
  isDarkMode,
}) => {
  return (
    <View style={[styles.card, isDarkMode && darkStyles.card]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Ionicons name="document-text-outline" size={20} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
          <Text style={[styles.title, isDarkMode && darkStyles.title]}>Character Information</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsLocked(!isLocked)}
          style={styles.lockButton}
          accessibilityLabel={isLocked ? "Unlock" : "Lock"}
        >
          <Ionicons
            name={isLocked ? "lock-closed-outline" : "lock-open-outline"}
            size={20}
            color={isDarkMode ? "#f5f5f5" : "#444"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && darkStyles.label]}>Character Name</Text>
          <TextInput
            style={[
              styles.input,
              isLocked && styles.disabledInput,
              isDarkMode && darkStyles.input,
              isLocked && isDarkMode && darkStyles.disabledInput,
            ]}
            value={characterName}
            onChangeText={setCharacterName}
            placeholder="Enter character name"
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            editable={!isLocked}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && darkStyles.label]}>Class</Text>
          <View style={[
            styles.pickerWrapper,
            isLocked && styles.disabledInput,
            isDarkMode && darkStyles.input,
            isLocked && isDarkMode && darkStyles.disabledInput,
          ]}>
            <Picker
              enabled={!isLocked}
              selectedValue={characterClass}
              onValueChange={setCharacterClass}
              style={Platform.OS === "ios" ? styles.pickerIOS : undefined}
              dropdownIconColor={isDarkMode ? "#f5f5f5" : "#444"}
            >
              <Picker.Item label="Select a class" value="" />
              {dndClasses.map((className) => (
                <Picker.Item key={className} label={className} value={className} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && darkStyles.label]}>Race</Text>
          <TextInput
            style={[
              styles.input,
              isLocked && styles.disabledInput,
              isDarkMode && darkStyles.input,
              isLocked && isDarkMode && darkStyles.disabledInput,
            ]}
            value={race}
            onChangeText={setRace}
            placeholder="e.g., Human, Elf"
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            editable={!isLocked}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && darkStyles.label]}>Level</Text>
          <TextInput
            style={[
              styles.input,
              isLocked && styles.disabledInput,
              isDarkMode && darkStyles.input,
              isLocked && isDarkMode && darkStyles.disabledInput,
            ]}
            value={level ? String(level) : ""}
            onChangeText={text => setLevel(Number(text) || 1)}
            placeholder="1"
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            keyboardType="numeric"
            editable={!isLocked}
            maxLength={2}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#222",
  },
  lockButton: {
    padding: 6,
    borderRadius: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  inputGroup: {
    width: "48%",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#222",
  },
  disabledInput: {
    backgroundColor: "#eee",
    color: "#aaa",
  },
  pickerWrapper: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  pickerIOS: {
    height: 44,
  },
});

const darkStyles = StyleSheet.create({
  card: {
    backgroundColor: "#23232b",
    borderColor: "#333",
    shadowColor: "#000",
  },
  title: {
    color: "#f5f5f5",
  },
  label: {
    color: "#f5f5f5",
  },
  input: {
    backgroundColor: "#23232b",
    color: "#f5f5f5",
    borderColor: "#444",
  },
  disabledInput: {
    backgroundColor: "#333",
    color: "#aaa",
  },
});

export default CharacterInfo;