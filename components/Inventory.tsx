import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

interface InventoryProps {
  items: InventoryItem[];
  setItems: (items: InventoryItem[]) => void;
  isDarkMode?: boolean;
}

const Inventory: React.FC<InventoryProps> = ({ items, setItems, isDarkMode }) => {
  const [newItemName, setNewItemName] = useState("");

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: newItemName,
        quantity: 1,
      };
      setItems([...items, newItem]);
      setNewItemName("");
      Keyboard.dismiss();
    }
  };

  const updateItem = (id: string, field: "name" | "quantity", value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <View style={[styles.card, isDarkMode && darkStyles.card]}>
      <View style={styles.header}>
        <Ionicons name="bag-outline" size={20} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
        <Text style={[styles.title, isDarkMode && darkStyles.title]}>Inventory & Equipment</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.addRow}>
          <TextInput
            style={[styles.input, isDarkMode && darkStyles.input, { flex: 1 }]}
            value={newItemName}
            onChangeText={setNewItemName}
            placeholder="Add new item..."
            onSubmitEditing={addItem}
            returnKeyType="done"
            placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
          />
          <TouchableOpacity style={[styles.iconButton, isDarkMode && darkStyles.iconButton]} onPress={addItem}>
            <Ionicons name="add" size={22} color={isDarkMode ? "#f5f5f5" : "#444"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          style={{ maxHeight: 200, marginTop: 8 }}
          ListEmptyComponent={
            <Text style={[styles.emptyText, isDarkMode && darkStyles.emptyText]}>
              No items yet. Add some equipment!
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TextInput
                style={[styles.input, isDarkMode && darkStyles.input, { flex: 1 }]}
                value={item.name}
                onChangeText={(text) => updateItem(item.id, "name", text)}
                placeholder="Item name"
                placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
              />
              <TextInput
                style={[styles.input, styles.quantityInput, isDarkMode && darkStyles.input]}
                value={String(item.quantity)}
                onChangeText={(text) =>
                  updateItem(item.id, "quantity", parseInt(text) || 1)
                }
                keyboardType="numeric"
                placeholder="Qty"
                maxLength={3}
                placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
              />
              <TouchableOpacity
                style={[styles.iconButton, isDarkMode && darkStyles.iconButton]}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          )}
        />
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
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    marginRight: 8,
  },
  quantityInput: {
    width: 60,
    textAlign: "center",
    marginRight: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: 16,
    fontSize: 15,
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
  input: {
    backgroundColor: "#23232b",
    color: "#f5f5f5",
    borderColor: "#444",
  },
  iconButton: {
    backgroundColor: "#23232b",
  },
  emptyText: {
    color: "#aaa",
  },
});

export default Inventory;