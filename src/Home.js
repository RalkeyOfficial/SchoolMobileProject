import { useContext, useEffect, useState } from "react";
import { setDataToKey, getDataFromKey } from "./hooks/storageManager";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Button from "./components/Button";
import ListItem from "./components/ListItem";
import { LinearGradient } from "expo-linear-gradient";
import ListItemInputForm from "./components/ListItemInputForm";
import { ListContext } from "./context/List";

export default function Main() {
  const [list, setList] = useContext(ListContext);
  const [addItemBoolean, setAddItemBool] = useState(false);
  const [enableSaving, setEnableSaving] = useState(false);

  // get data from key @ToDoList at start of program
  useEffect(() => {
    (async () => {
      const data = await getDataFromKey("@ToDoList");
      data && setList(data);
    })();
  }, []);

  // set data to key @ToDoList on every change
  useEffect(() => {
    if (enableSaving) {
      setDataToKey("@ToDoList", list);
    } else setEnableSaving(true);
  }, [list]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.headerText}>To-Do</Text>
      </View>

      <View style={addButton.addButton}>
        <LinearGradient colors={["#8E2DE2", "#4A00E0"]} start={[0, 0]} end={[1, 1]} style={addButton.buttonBackground}>
          <Button
            style={addButton.headerButton}
            textStyle={addButton.headerButtonText}
            onPress={() => setAddItemBool(true)}
          >
            +
          </Button>
        </LinearGradient>
      </View>

      <View>
        {addItemBoolean && <ListItemInputForm onCancel={() => setAddItemBool(false)} {...{ setAddItemBool }} />}

        <View>
          {list.map((item) => (
            <ListItem key={item.id} data={item} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    color: "#fff",
    flex: 1,
    backgroundColor: "#121212",
    gap: 32,
  },
});

const addButton = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 32,
    bottom: 32,
  },
  buttonBackground: {
    borderRadius: 100,
    elevation: 3,
  },
  headerButton: {
    backgroundColor: "transparent",
    width: 64,
    height: 64,
    padding: 0,
    borderRadius: 100,
    paddingHorizontal: 0,
  },
  headerButtonText: {
    fontSize: 38,
  },
});

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 32,
    color: "#fff",
  },
});
