import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { hasStorageKeys } from "@/components/storageUtils";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { STORAGE_KEYS } from "@/constants";
import { Fonts } from "@/constants/theme";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function SettingsScreen() {
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [loading, setLoading] = useState(true);

  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");

  const handleSubmit = () => {
    // You can implement your AsyncStorage logic here
    console.log("Form submitted with values:", {
      field1,
      field2,
      field3,
    });

    // Example: Call your storage function
    // await saveToAsyncStorage({ field1, field2, field3 });

    // Optional: Show confirmation or clear form
    Alert.alert("Success", "Form submitted successfully!");
  };

  useEffect(() => {
    const checkStorage = async () => {
      const exists = await hasStorageKeys(STORAGE_KEYS.twilio);
      setHasApiKeys(exists);
      setLoading(false);
    };

    checkStorage();
  }, []);

  const keysAllSet = !Object.values(hasApiKeys).includes(false) && !loading;
  console.log("keysAllSet", keysAllSet);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gearshape.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Settings
        </ThemedText>
      </ThemedView>
      <ThemedText>Enter Twilio credentials, etc...</ThemedText>

      <Collapsible title="Twilio credentials" open={!keysAllSet}>


        <ThemedText type="defaultSemiBold">accountSID</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          value={field1}
          onChangeText={setField1}
        />

        <ThemedText type="defaultSemiBold">AuthToken</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="your_auth_token_here"
          value={field2}
          onChangeText={setField2}
        />

        <ThemedText type="defaultSemiBold">Twilio Phone Number</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="15101231234"
          value={field3}
          onChangeText={setField3}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </Collapsible>

      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the{" "}
          <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
          provide files for different screen densities
        </ThemedText>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{" "}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook
          lets you inspect what the user&apos;s current color scheme is, and so
          you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
