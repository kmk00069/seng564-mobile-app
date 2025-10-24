import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, Switch, Modal } from "react-native";
import AbilityScore from "../components/AbilityScore";
import CharacterInfo from "../components/CharacterInfo";
import CharacterPicture from "../components/CharacterPicture";
import CombatStats from "../components/CombatStats";
import Inventory from "../components/Inventory";
import Resources from "../components/Resources";
import Wealth from "../components/Wealth";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

// Example initial state (replace with your actual data or state management)
const initialAbilityScores = {
  STR: 10,
  DEX: 10,
  CON: 10,
  INT: 10,
  WIS: 10,
  CHA: 10,
};

export default function MainScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [abilityScores, setAbilityScores] = useState(initialAbilityScores);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Character Info state
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState(1);
  const [isLocked, setIsLocked] = useState(false);

  // Combat Stats state
  const [hitPoints, setHitPoints] = useState(10);
  const [maxHitPoints, setMaxHitPoints] = useState(10);
  const [armorClass, setArmorClass] = useState(10);
  const [proficiencyBonus, setProficiencyBonus] = useState(2);

  // Wealth state
  const [copper, setCoppper] = useState(0);
  const [silver, setSilver] = useState(0);
  const [electrum, setElectrum] = useState(0);
  const [gold, setGold] = useState(0);
  const [platinum, setPlatinum] = useState(0);

  // Inventory state
  const [items, setItems] = useState<{ id: string; name: string; quantity: number }[]>([]);

  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleAbilityChange = (key: keyof typeof abilityScores, value: number) => {
    setAbilityScores((prev) => ({ ...prev, [key]: value }));
  };

  // Clear Character function
  const handleClearCharacter = () => {
    setShowClearDialog(false);
    setCharacterName("");
    setCharacterClass("");
    setRace("");
    setLevel(1);
    setAbilityScores(initialAbilityScores);
    setHitPoints(10);
    setMaxHitPoints(10);
    setArmorClass(10);
    setProficiencyBonus(2);
    setItems([]);
    setImageUrl(null);
    setCoppper(0);
    setSilver(0);
    setElectrum(0);
    setGold(0);
    setPlatinum(0);
    setIsLocked(false);
  };

  // Theme styles
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, theme.container]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, theme.scrollContent]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <Ionicons name="sunny-outline" size={20} color={isDarkMode ? "#aaa" : "#fbbf24"} />
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            style={{ marginHorizontal: 8 }}
            thumbColor={isDarkMode ? "#444" : "#fff"}
            trackColor={{ false: "#bbb", true: "#222" }}
          />
          <Ionicons name="moon-outline" size={20} color={isDarkMode ? "#fbbf24" : "#aaa"} />
        </View>
        <CharacterInfo
          characterName={characterName}
          setCharacterName={setCharacterName}
          characterClass={characterClass}
          setCharacterClass={setCharacterClass}
          race={race}
          setRace={setRace}
          level={level}
          setLevel={setLevel}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
          isDarkMode={isDarkMode}
        />
        <CharacterPicture imageUrl={imageUrl} setImageUrl={setImageUrl} isLocked={isLocked} isDarkMode={isDarkMode} />
        <View style={styles.abilityRow}>
          {Object.entries(abilityScores).map(([key, value]) => (
            <AbilityScore
              key={key}
              label={key}
              value={value}
              onChange={(val) => handleAbilityChange(key as keyof typeof abilityScores, val)}
              isDarkMode={isDarkMode}
            />
          ))}
        </View>
        <CombatStats
          hitPoints={hitPoints}
          setHitPoints={setHitPoints}
          maxHitPoints={maxHitPoints}
          setMaxHitPoints={setMaxHitPoints}
          armorClass={armorClass}
          setArmorClass={setArmorClass}
          proficiencyBonus={proficiencyBonus}
          setProficiencyBonus={setProficiencyBonus}
          isDarkMode={isDarkMode}
        />
        <Wealth
          copper={copper}
          setCoppper={setCoppper}
          silver={silver}
          setSilver={setSilver}
          electrum={electrum}
          setElectrum={setElectrum}
          gold={gold}
          setGold={setGold}
          platinum={platinum}
          setPlatinum={setPlatinum}
          isDarkMode={isDarkMode}
        />
        <Inventory items={items} setItems={setItems} isDarkMode={isDarkMode} />
        <Resources selectedClass={characterClass} isDarkMode={isDarkMode} />

        {/* Clear Character Button */}
        <View style={{ alignItems: "center", marginVertical: 24 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#e74c3c",
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
            onPress={() => setShowClearDialog(true)}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Clear Character</Text>
          </TouchableOpacity>
        </View>

        {/* Clear Character Modal */}
        <Modal
          visible={showClearDialog}
          transparent
          animationType="fade"
          onRequestClose={() => setShowClearDialog(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <View style={{
              backgroundColor: isDarkMode ? "#23232b" : "#fff",
              padding: 24,
              borderRadius: 12,
              width: 320,
              maxWidth: "90%",
              alignItems: "center"
            }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: isDarkMode ? "#fff" : "#222", marginBottom: 8 }}>
                Clear Character
              </Text>
              <Text style={{ color: isDarkMode ? "#aaa" : "#444", textAlign: "center", marginBottom: 24 }}>
                This will reset all character data. Are you sure?
              </Text>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#bbb",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    marginRight: 8,
                  }}
                  onPress={() => setShowClearDialog(false)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#e74c3c",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                  }}
                  onPress={handleClearCharacter}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    backgroundColor: "#f5f5f5",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: "#18181b",
  },
  scrollContent: {
    backgroundColor: "#18181b",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    alignItems: "center",
  },
  abilityRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
    flexWrap: "wrap",
  },
});