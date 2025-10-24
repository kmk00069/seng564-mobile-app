import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CombatStatsProps {
  hitPoints: number;
  setHitPoints: (hp: number) => void;
  maxHitPoints: number;
  setMaxHitPoints: (maxHp: number) => void;
  armorClass: number;
  setArmorClass: (ac: number) => void;
  proficiencyBonus: number;
  setProficiencyBonus: (bonus: number) => void;
  isDarkMode?: boolean;
}

const CombatStats: React.FC<CombatStatsProps> = ({
  hitPoints,
  setHitPoints,
  maxHitPoints,
  setMaxHitPoints,
  armorClass,
  setArmorClass,
  proficiencyBonus,
  setProficiencyBonus,
  isDarkMode = false,
}) => {
  const [isDamageDialogOpen, setIsDamageDialogOpen] = useState(false);
  const [isHealDialogOpen, setIsHealDialogOpen] = useState(false);
  const [damageAmount, setDamageAmount] = useState("");
  const [healAmount, setHealAmount] = useState("");

  const handleDamage = () => {
    const damage = parseInt(damageAmount) || 0;
    const newHp = Math.max(0, hitPoints - damage);
    setHitPoints(newHp);
    setDamageAmount("");
    setIsDamageDialogOpen(false);
  };

  const handleHeal = () => {
    const healing = parseInt(healAmount) || 0;
    const newHp = Math.min(maxHitPoints, hitPoints + healing);
    setHitPoints(newHp);
    setHealAmount("");
    setIsHealDialogOpen(false);
  };

  return (
    <View style={[styles.card, isDarkMode && darkStyles.card]}>
      <View style={styles.header}>
        <Ionicons name="shield-outline" size={20} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
        <Text style={[styles.title, isDarkMode && darkStyles.title]}>Combat Stats</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && darkStyles.label]}>Hit Points</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, isDarkMode && darkStyles.input, { flex: 1 }]}
              keyboardType="numeric"
              value={hitPoints ? String(hitPoints) : ""}
              onChangeText={text => setHitPoints(Number(text) || 0)}
              placeholder="Current"
              maxLength={3}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            <Text style={{ marginHorizontal: 6, fontSize: 18, color: isDarkMode ? "#f5f5f5" : "#222" }}>/</Text>
            <TextInput
              style={[styles.input, isDarkMode && darkStyles.input, { flex: 1 }]}
              keyboardType="numeric"
              value={maxHitPoints ? String(maxHitPoints) : ""}
              onChangeText={text => setMaxHitPoints(Number(text) || 0)}
              placeholder="Max"
              maxLength={3}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && darkStyles.label]}>Armor Class</Text>
          <TextInput
            style={[styles.input, isDarkMode && darkStyles.input]}
            keyboardType="numeric"
            value={armorClass ? String(armorClass) : ""}
            onChangeText={text => setArmorClass(Number(text) || 10)}
            placeholder="AC"
            maxLength={2}
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, isDarkMode && darkStyles.label]}>Proficiency Bonus</Text>
          <TextInput
            style={[styles.input, isDarkMode && darkStyles.input]}
            keyboardType="numeric"
            value={proficiencyBonus ? String(proficiencyBonus) : ""}
            onChangeText={text => setProficiencyBonus(Number(text) || 2)}
            placeholder="+2"
            maxLength={2}
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: "#e74c3c" }, isDarkMode && darkStyles.actionButton]}
          onPress={() => setIsDamageDialogOpen(true)}
        >
          <Text style={[styles.actionButtonText, { color: "#e74c3c" }]}>I've been hit!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { borderColor: "#27ae60" }, isDarkMode && darkStyles.actionButton]}
          onPress={() => setIsHealDialogOpen(true)}
        >
          <Text style={[styles.actionButtonText, { color: "#27ae60" }]}>I've been healed!</Text>
        </TouchableOpacity>
      </View>

      {/* Damage Dialog */}
      <Modal
        visible={isDamageDialogOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDamageDialogOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.dialog, isDarkMode && darkStyles.dialog]}>
            <Text style={[styles.dialogTitle, isDarkMode && darkStyles.dialogTitle]}>Take Damage</Text>
            <Text style={[styles.dialogDescription, isDarkMode && darkStyles.dialogDescription]}>
              How much damage did you take?
            </Text>
            <Text style={[styles.label, isDarkMode && darkStyles.label]}>Damage Amount</Text>
            <TextInput
              style={[styles.input, isDarkMode && darkStyles.input]}
              keyboardType="numeric"
              value={damageAmount}
              onChangeText={setDamageAmount}
              placeholder="Enter damage amount"
              maxLength={3}
              onSubmitEditing={handleDamage}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            <View style={styles.dialogButtonRow}>
              <TouchableOpacity
                style={[styles.dialogButton, { borderColor: "#bbb" }, isDarkMode && darkStyles.dialogButton]}
                onPress={() => setIsDamageDialogOpen(false)}
              >
                <Text style={{ color: isDarkMode ? "#f5f5f5" : "#444" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogButton, { borderColor: "#e74c3c" }, isDarkMode && darkStyles.dialogButton]}
                onPress={handleDamage}
              >
                <Text style={{ color: "#e74c3c" }}>Apply Damage</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Heal Dialog */}
      <Modal
        visible={isHealDialogOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsHealDialogOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.dialog, isDarkMode && darkStyles.dialog]}>
            <Text style={[styles.dialogTitle, isDarkMode && darkStyles.dialogTitle]}>Heal</Text>
            <Text style={[styles.dialogDescription, isDarkMode && darkStyles.dialogDescription]}>
              How much healing did you receive?
            </Text>
            <Text style={[styles.label, isDarkMode && darkStyles.label]}>Healing Amount</Text>
            <TextInput
              style={[styles.input, isDarkMode && darkStyles.input]}
              keyboardType="numeric"
              value={healAmount}
              onChangeText={setHealAmount}
              placeholder="Enter healing amount"
              maxLength={3}
              onSubmitEditing={handleHeal}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
            <View style={styles.dialogButtonRow}>
              <TouchableOpacity
                style={[styles.dialogButton, { borderColor: "#bbb" }, isDarkMode && darkStyles.dialogButton]}
                onPress={() => setIsHealDialogOpen(false)}
              >
                <Text style={{ color: isDarkMode ? "#f5f5f5" : "#444" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogButton, { borderColor: "#27ae60" }, isDarkMode && darkStyles.dialogButton]}
                onPress={handleHeal}
              >
                <Text style={{ color: "#27ae60" }}>Apply Healing</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#222",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 12,
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
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  actionButtonText: {
    fontWeight: "600",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: 320,
    maxWidth: "90%",
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dialogTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 4,
    color: "#222",
  },
  dialogDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  dialogButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
  },
  dialogButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
    backgroundColor: "#fff",
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
  actionButton: {
    backgroundColor: "#23232b",
  },
  dialog: {
    backgroundColor: "#23232b",
    borderColor: "#333",
  },
  dialogTitle: {
    color: "#f5f5f5",
  },
  dialogDescription: {
    color: "#aaa",
  },
  dialogButton: {
    backgroundColor: "#23232b",
  },
});

export default CombatStats;