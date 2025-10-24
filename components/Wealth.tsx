import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface WealthProps {
  copper: number;
  setCoppper: (value: number) => void;
  silver: number;
  setSilver: (value: number) => void;
  electrum: number;
  setElectrum: (value: number) => void;
  gold: number;
  setGold: (value: number) => void;
  platinum: number;
  setPlatinum: (value: number) => void;
  isDarkMode?: boolean;
}

const Wealth: React.FC<WealthProps> = ({
  copper,
  setCoppper,
  silver,
  setSilver,
  electrum,
  setElectrum,
  gold,
  setGold,
  platinum,
  setPlatinum,
  isDarkMode = false,
}) => {
  // Calculate total wealth in gold pieces for reference
  const totalInGold = (
    copper * 0.01 +
    silver * 0.1 +
    electrum * 0.5 +
    gold * 1 +
    platinum * 10
  ).toFixed(2);

  // Quick conversion function to convert everything to gold
  const convertToGold = () => {
    const totalGold = Math.floor(
      copper * 0.01 +
      silver * 0.1 +
      electrum * 0.5 +
      gold +
      platinum * 10
    );
    setGold(totalGold);
    setCoppper(0);
    setSilver(0);
    setElectrum(0);
    setPlatinum(0);
  };

  return (
    <View style={[styles.card, isDarkMode && darkStyles.card]}>
      <View style={styles.header}>
        <Ionicons name="cash-outline" size={20} color="#fbbf24" style={{ marginRight: 6 }} />
        <Text style={[styles.title, isDarkMode && darkStyles.title]}>Character Wealth</Text>
      </View>
      <View style={styles.content}>
        {/* Coin Types */}
        <View style={styles.coinsRow}>
          <View style={styles.coinCol}>
            <Text style={[styles.label, { color: "#a78bfa" }, isDarkMode && darkStyles.label]}>Platinum (pp)</Text>
            <TextInput
              style={[styles.input, styles.center, isDarkMode && darkStyles.input]}
              keyboardType="numeric"
              value={platinum ? String(platinum) : ""}
              onChangeText={text => setPlatinum(parseInt(text) || 0)}
              placeholder="0"
              maxLength={4}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
          </View>
          <View style={styles.coinCol}>
            <Text style={[styles.label, { color: "#fbbf24" }, isDarkMode && darkStyles.label]}>Gold (gp)</Text>
            <TextInput
              style={[styles.input, styles.center, isDarkMode && darkStyles.input]}
              keyboardType="numeric"
              value={gold ? String(gold) : ""}
              onChangeText={text => setGold(parseInt(text) || 0)}
              placeholder="0"
              maxLength={4}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
          </View>
          <View style={styles.coinCol}>
            <Text style={[styles.label, { color: "#34d399" }, isDarkMode && darkStyles.label]}>Electrum (ep)</Text>
            <TextInput
              style={[styles.input, styles.center, isDarkMode && darkStyles.input]}
              keyboardType="numeric"
              value={electrum ? String(electrum) : ""}
              onChangeText={text => setElectrum(parseInt(text) || 0)}
              placeholder="0"
              maxLength={4}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
          </View>
          <View style={styles.coinCol}>
            <Text style={[styles.label, { color: "#6b7280" }, isDarkMode && darkStyles.label]}>Silver (sp)</Text>
            <TextInput
              style={[styles.input, styles.center, isDarkMode && darkStyles.input]}
              keyboardType="numeric"
              value={silver ? String(silver) : ""}
              onChangeText={text => setSilver(parseInt(text) || 0)}
              placeholder="0"
              maxLength={4}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
          </View>
          <View style={styles.coinCol}>
            <Text style={[styles.label, { color: "#fb923c" }, isDarkMode && darkStyles.label]}>Copper (cp)</Text>
            <TextInput
              style={[styles.input, styles.center, isDarkMode && darkStyles.input]}
              keyboardType="numeric"
              value={copper ? String(copper) : ""}
              onChangeText={text => setCoppper(parseInt(text) || 0)}
              placeholder="0"
              maxLength={4}
              placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
            />
          </View>
        </View>

        {/* Total and Conversion */}
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, isDarkMode && darkStyles.totalText]}>
            Total Value: <Text style={{ color: "#fbbf24" }}>{totalInGold} gp</Text>
          </Text>
          <TouchableOpacity style={[styles.convertButton, isDarkMode && darkStyles.convertButton]} onPress={convertToGold}>
            <Text style={[styles.convertButtonText, isDarkMode && darkStyles.convertButtonText]}>Convert All to Gold</Text>
          </TouchableOpacity>
        </View>

        {/* Currency Conversion Reference */}
        <View style={[styles.referenceBox, isDarkMode && darkStyles.referenceBox]}>
          <Text style={[styles.referenceTitle, isDarkMode && darkStyles.referenceTitle]}>Currency Conversion:</Text>
          <View style={styles.referenceGrid}>
            <Text style={[styles.referenceText, isDarkMode && darkStyles.referenceText]}>1 pp = 10 gp</Text>
            <Text style={[styles.referenceText, isDarkMode && darkStyles.referenceText]}>1 gp = 10 sp</Text>
            <Text style={[styles.referenceText, isDarkMode && darkStyles.referenceText]}>1 ep = 5 sp</Text>
            <Text style={[styles.referenceText, isDarkMode && darkStyles.referenceText]}>1 sp = 10 cp</Text>
          </View>
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
    marginBottom: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#222",
  },
  content: {
    width: "100%",
  },
  coinsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  coinCol: {
    flex: 1,
    marginHorizontal: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    textAlign: "center",
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
  center: {
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 12,
  },
  totalText: {
    color: "#888",
    fontSize: 15,
  },
  convertButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  convertButtonText: {
    color: "#444",
    fontSize: 13,
    fontWeight: "600",
  },
  referenceBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 10,
  },
  referenceTitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  referenceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  referenceText: {
    fontSize: 12,
    color: "#888",
    width: "48%",
    marginBottom: 2,
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
  totalText: {
    color: "#aaa",
  },
  convertButton: {
    backgroundColor: "#23232b",
    borderColor: "#444",
  },
  convertButtonText: {
    color: "#f5f5f5",
  },
  referenceBox: {
    backgroundColor: "#18181b",
  },
  referenceTitle: {
    color: "#aaa",
  },
  referenceText: {
    color: "#aaa",
  },
});

export default Wealth;