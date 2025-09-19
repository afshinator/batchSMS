import AsyncStorage from "@react-native-async-storage/async-storage";

// Check single key
export const hasStorageKey = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error(`Error checking storage key ${key}:`, error);
    return false;
  }
};

// Check multiple keys
export const hasStorageKeys = async (keys) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values.reduce((acc, [key, value]) => {
      acc[key] = value !== null;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error checking storage keys:", error);
    return keys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
  }
};

// Set multiple key-value pairs
export const setStorageKeys = async (keyValuePairs) => {
  try {
    // Convert object to array format expected by AsyncStorage.multiSet
    const pairs = Object.entries(keyValuePairs).map(([key, value]) => [
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    ]);

    await AsyncStorage.multiSet(pairs);
    return { success: true, errors: null };
  } catch (error) {
    console.error("Error setting storage keys:", error);
    return { success: false, errors: error };
  }
};
