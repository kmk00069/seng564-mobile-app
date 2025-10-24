import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface CharacterPictureProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  isLocked?: boolean;
  isDarkMode?: boolean;
}

const CharacterPicture: React.FC<CharacterPictureProps> = ({
  imageUrl,
  setImageUrl,
  isLocked = false,
  isDarkMode = false,
}) => {
  const pickImage = async () => {
    if (isLocked) return;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  return (
    <View style={[styles.card, isDarkMode && darkStyles.card]}>
      <View style={styles.header}>
        <Ionicons name="image-outline" size={20} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
        <Text style={[styles.title, isDarkMode && darkStyles.title]}>Character Picture</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.imageContainer,
            { borderStyle: isLocked ? "solid" : "dashed" },
            isDarkMode && darkStyles.imageContainer,
          ]}
          onPress={!isLocked ? pickImage : undefined}
          activeOpacity={isLocked ? 1 : 0.7}
        >
          {imageUrl ? (
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
              {!isLocked && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={removeImage}
                >
                  <Ionicons name="close" size={18} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="person-circle-outline" size={64} color={isDarkMode ? "#666" : "#bbb"} />
              <Text style={[styles.placeholderText, isDarkMode && darkStyles.placeholderText]}>
                {isLocked
                  ? "No image"
                  : "Tap to upload\nor select an image"}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {!isLocked && (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.uploadButton, isDarkMode && darkStyles.uploadButton]} onPress={pickImage}>
              <Ionicons name="cloud-upload-outline" size={18} color={isDarkMode ? "#f5f5f5" : "#444"} style={{ marginRight: 6 }} />
              <Text style={[styles.uploadText, isDarkMode && darkStyles.uploadText]}>Upload Image</Text>
            </TouchableOpacity>
            {imageUrl && (
              <TouchableOpacity style={styles.removeTextButton} onPress={removeImage}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
    alignItems: "center",
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderColor: "#bbb",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    padding: 4,
    zIndex: 2,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  uploadText: {
    color: "#444",
    fontWeight: "500",
    fontSize: 15,
  },
  removeTextButton: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  removeText: {
    color: "#e74c3c",
    fontWeight: "500",
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
  imageContainer: {
    backgroundColor: "#18181b",
    borderColor: "#444",
  },
  placeholderText: {
    color: "#aaa",
  },
  uploadButton: {
    backgroundColor: "#23232b",
    borderColor: "#444",
  },
  uploadText: {
    color: "#f5f5f5",
  },
});

export default CharacterPicture;