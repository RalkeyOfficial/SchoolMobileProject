import AsyncStorage from "@react-native-async-storage/async-storage";

const setDataToKey = async (key, value) => {
  const _keyIdentifier = `${key}___DataTypeFromKey`;
  const dataType = typeof value;

  try {
    if (dataType === "string") await AsyncStorage.setItem(key, value);
    if (dataType === "number") await AsyncStorage.setItem(key, value.toString());
    if (dataType === "object") await AsyncStorage.setItem(key, JSON.stringify(value));

    await AsyncStorage.setItem(_keyIdentifier, dataType);

    return "success";
  } catch (e) {
    console.log(e);
    return e;
  }
};

const getDataFromKey = async (key) => {
  const _keyIdentifier = `${key}___DataTypeFromKey`;
  const keyIdentifier = await AsyncStorage.getItem(_keyIdentifier);

  if (!keyIdentifier) return null;

  try {
    let value;

    if (keyIdentifier === "string") value = await AsyncStorage.getItem(key);
    if (keyIdentifier === "number") value = parseInt(await AsyncStorage.getItem(key));
    if (keyIdentifier === "object") value = JSON.parse(await AsyncStorage.getItem(key));

    return value;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export { setDataToKey, getDataFromKey };
