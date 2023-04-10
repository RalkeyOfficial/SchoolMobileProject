import uuid from "uuid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setDataToKey, getDataFromKey } from "./hooks/storageManager";
import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import ListItem from "./components/ListItem";
import Input from "./components/Input";

export default function Main() {
  const { control, handleSubmit, reset } = useForm();
  const [addItemBoolean, setAddItemBool] = useState(false);
  const [list, setList] = useState([
    {
      title: "Test",
      description: "this is a small test item in the list",
      id: uuid(),
    },
  ]);

  // get data from key @ToDoList at start of program
  useEffect(() => {
    (async () => {
      const data = await getDataFromKey("@ToDoList");
      data && setList(data);
    })();
  }, []);

  // set data to key @ToDoList on every change
  useEffect(() => {
    setDataToKey("@ToDoList", list);
  }, [list]);

  function removeItem(id) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }

  function onSubmit(data) {
    data = { ...data, id: uuid() };

    setList([...list, data]);
    setAddItemBool(false);

    reset();
  }

  return (
    <View style={styles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.headerText}>To-Do</Text>
        <Button
          style={headerStyles.headerButton}
          textStyle={headerStyles.headerButtonText}
          ripple={{ color: "#fff", radius: 64 }}
          onPress={() => setAddItemBool(true)}
        >
          +
        </Button>
      </View>

      <View style={listItems.container}>
        {addItemBoolean && (
          <View style={addItemStyles.addItemContainer}>
            <Input name="title" {...{ control }} style={addItemStyles.titleText} />
            <Input name="description" {...{ control }} style={addItemStyles.description} />

            <View style={addItemStyles.options}>
              <Button style={addItemStyles.button} onPress={handleSubmit(onSubmit)}>
                Accept
              </Button>
              <Button style={addItemStyles.button} onPress={() => setAddItemBool(false)}>
                Cancel
              </Button>
            </View>
          </View>
        )}

        {list.map((item) => (
          <ListItem
            key={item.id}
            title={item.title}
            description={item.description}
            onPress={() => removeItem(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    paddingTop: 48,
    color: "#fff",
    flex: 1,
    backgroundColor: "#121212",
    gap: 32,
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
  headerButton: {
    borderRadius: 4,
    padding: 0,
    paddingHorizontal: 12,
  },
  headerButtonText: {
    fontSize: 32,
  },
});

const listItems = StyleSheet.create({
  container: {
    gap: 16,
  },
});

const addItemStyles = StyleSheet.create({
  addItemContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 6,
    gap: 6,
  },
  titleText: {
    fontSize: 24,
    color: "white",
  },
  description: {
    color: "white",
    fontSize: 16,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 4,
    paddingHorizontal: 24,
  },
});
