import { ThemedText } from "@/components/themed-text";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CsvFileAsset = DocumentPicker.DocumentPickerAsset & {
  lastModified: number;
  name: string;
  size: number;
};
type CsvFileState = CsvFileAsset | null;

const formatLastModified = (timestamp: number) => {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

export default function CSVFilePicker({ disabled = false } = {}) {
  const [selectedFile, setSelectedFile] = useState<CsvFileState>(null);
  const buttonPrompt = selectedFile
    ? "Browse for a different CSV file"
    : "Browse for CSV file";

  const pickCSVFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "text/comma-separated-values"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0] as CsvFileAsset;
        setSelectedFile(file);
        console.log("Selected file:", file);
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={disabled ? styles.buttonDisabled : styles.button}
        onPress={pickCSVFile}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{buttonPrompt}</Text>
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.fileInfo}>
          <Text>Selected:</Text>
          <ThemedText type="subtitle" darkColor="true">
            {selectedFile.name}
          </ThemedText>
          <Text>
            Last Modified:{" "}
            <ThemedText type="defaultSemiBold" darkColor="true">
              {formatLastModified(selectedFile.lastModified)}
            </ThemedText>{" "}
            --- Size:{" "}
            <ThemedText type="defaultSemiBold" darkColor="true">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </ThemedText>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#999",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  fileInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
