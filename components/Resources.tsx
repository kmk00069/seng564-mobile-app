import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ResourcesProps {
  selectedClass?: string;
  isDarkMode?: boolean;
}

const Resources: React.FC<ResourcesProps> = ({ selectedClass, isDarkMode }) => {
  const classGuideMap: Record<string, string> = {
    Artificer: "https://www.dndbeyond.com/classes/artificer",
    Barbarian: "https://www.dndbeyond.com/classes/barbarian",
    Bard: "https://www.dndbeyond.com/classes/bard",
    Cleric: "https://www.dndbeyond.com/classes/cleric",
    Druid: "https://www.dndbeyond.com/classes/druid",
    Fighter: "https://www.dndbeyond.com/classes/fighter",
    Monk: "https://www.dndbeyond.com/classes/monk",
    Paladin: "https://www.dndbeyond.com/classes/paladin",
    Ranger: "https://www.dndbeyond.com/classes/ranger",
    Rogue: "https://www.dndbeyond.com/classes/rogue",
    Sorcerer: "https://www.dndbeyond.com/classes/sorcerer",
    Warlock: "https://www.dndbeyond.com/classes/warlock",
    Wizard: "https://www.dndbeyond.com/classes/wizard",
  };

  const selectedClassGuide = selectedClass ? classGuideMap[selectedClass] : null;

  const spellResources = [
    { name: "All Spells List", url: "https://www.dndbeyond.com/spells" },
    { name: "Spells by Class", url: "https://www.dndbeyond.com/spells/class" },
    { name: "Spells by Level", url: "https://www.dndbeyond.com/spells?filter-level=0&filter-level=1&filter-level=2&filter-level=3&filter-level=4&filter-level=5&filter-level=6&filter-level=7&filter-level=8&filter-level=9" },
    { name: "Cantrips", url: "https://www.dndbeyond.com/spells?filter-level=0" },
  ];

  const generalResources = [
    { name: "Basic Rules (Free)", url: "https://www.dndbeyond.com/sources/basic-rules" },
    { name: "Character Creation Guide", url: "https://www.dndbeyond.com/posts/1368-how-to-create-your-first-dungeons-dragons" },
    { name: "Equipment & Gear", url: "https://www.dndbeyond.com/equipment" },
    { name: "Races Guide", url: "https://www.dndbeyond.com/races" },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.card, isDarkMode && darkStyles.card]}>
      <View style={styles.header}>
        <Ionicons name="book-outline" size={20} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
        <Text style={[styles.title, isDarkMode && darkStyles.title]}>D&D Resources & Guides</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Selected Class Guide */}
        {selectedClass && selectedClassGuide ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="link-outline" size={16} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
              <Text style={[styles.sectionTitle, isDarkMode && darkStyles.sectionTitle]}>{selectedClass} Class Guide</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, isDarkMode && darkStyles.button]}
              onPress={() => openLink(selectedClassGuide)}
            >
              <Text style={[styles.buttonText, isDarkMode && darkStyles.buttonText]}>
                View {selectedClass} Guide on D&D Beyond
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.section, { alignItems: "center", paddingVertical: 16 }]}>
            <Ionicons name="book-outline" size={32} color={isDarkMode ? "#666" : "#bbb"} style={{ marginBottom: 8 }} />
            <Text style={[{ color: isDarkMode ? "#aaa" : "#888", textAlign: "center" }]}>
              Select a class above to see the class guide
            </Text>
          </View>
        )}

        {/* Spell Resources */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="sparkles-outline" size={16} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
            <Text style={[styles.sectionTitle, isDarkMode && darkStyles.sectionTitle]}>Spell Resources</Text>
          </View>
          {spellResources.map((resource) => (
            <TouchableOpacity
              key={resource.name}
              style={[styles.outlineButton, isDarkMode && darkStyles.outlineButton]}
              onPress={() => openLink(resource.url)}
            >
              <Text style={[styles.outlineButtonText, isDarkMode && darkStyles.outlineButtonText]}>{resource.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* General Resources */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book-outline" size={16} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
            <Text style={[styles.sectionTitle, isDarkMode && darkStyles.sectionTitle]}>General Resources</Text>
          </View>
          {generalResources.map((resource) => (
            <TouchableOpacity
              key={resource.name}
              style={[styles.outlineButton, isDarkMode && darkStyles.outlineButton]}
              onPress={() => openLink(resource.url)}
            >
              <Text style={[styles.outlineButtonText, isDarkMode && darkStyles.outlineButtonText]}>{resource.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.footerText, isDarkMode && darkStyles.footerText]}>
          All links open in your browser and lead to D&D Beyond, the official digital toolset for D&D 5th Edition.
        </Text>
      </ScrollView>
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
    flex: 1,
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
    paddingBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: "#444",
  },
  button: {
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  outlineButtonText: {
    color: "#444",
    fontSize: 14,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
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
  sectionTitle: {
    color: "#f5f5f5",
  },
  button: {
    backgroundColor: "#3730a3",
  },
  buttonText: {
    color: "#fff",
  },
  outlineButton: {
    borderColor: "#444",
    backgroundColor: "#23232b",
  },
  outlineButtonText: {
    color: "#f5f5f5",
  },
  footerText: {
    color: "#aaa",
    borderTopColor: "#333",
  },
});

export default Resources;