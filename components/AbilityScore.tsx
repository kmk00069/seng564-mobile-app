import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type AbilityScoreProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  isDarkMode?: boolean;
};

function getModifier(score: number) {
  return Math.floor((score - 10) / 2);
}

const AbilityScore: React.FC<AbilityScoreProps> = ({ label, value, onChange, isDarkMode }) => (
  <View style={[styles.card, isDarkMode && darkStyles.card]}>
    <Text style={[styles.label, isDarkMode && darkStyles.label]}>{label}</Text>
    <TextInput
      style={[styles.valueInput, isDarkMode && darkStyles.valueInput]}
      keyboardType="numeric"
      value={String(value)}
      onChangeText={text => {
        const num = parseInt(text, 10);
        if (!isNaN(num)) onChange(num);
        else if (text === "") onChange(0);
      }}
      maxLength={2}
      textAlign="center"
      placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
    />
    <View style={[styles.modifierBox, isDarkMode && darkStyles.modifierBox]}>
      <Text style={[styles.modifierText, isDarkMode && darkStyles.modifierText]}>
        {getModifier(value) >= 0 ? "+" : ""}
        {getModifier(value)}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    alignItems: "center",
    width: 80,
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 16,
    color: "#222",
  },
  valueInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    width: 48,
    height: 36,
    marginBottom: 8,
    color: "#222",
  },
  modifierBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 2,
  },
  modifierText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
});

const darkStyles = StyleSheet.create({
  card: {
    backgroundColor: "#23232b",
    borderColor: "#333",
    shadowColor: "#000",
  },
  label: {
    color: "#f5f5f5",
  },
  valueInput: {
    backgroundColor: "#23232b",
    color: "#f5f5f5",
    borderColor: "#444",
  },
  modifierBox: {
    backgroundColor: "#23232b",
  },
  modifierText: {
    color: "#f5f5f5",
  },
});

export default AbilityScore;