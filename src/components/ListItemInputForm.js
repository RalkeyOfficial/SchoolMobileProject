import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import uuid from "uuid";
import Input from "./Input";
import Button from "./Button";
import { useContext } from "react";
import { ListContext } from "../context/List";
import { LinearGradient } from "expo-linear-gradient";

const ListItemInputForm = ({ setAddItemBool, onCancel }) => {
  const { control, handleSubmit, reset } = useForm();
  const [list, setList] = useContext(ListContext);

  function onSubmit(data) {
    data = { ...data, id: uuid() };

    setList([data, ...list]);
    setAddItemBool(false);

    reset();
  }

  return (
    <View style={styles.addItemContainer}>
      <Input name="title" {...{ control }} style={styles.titleText} />

      <View style={styles.options}>
        <LinearGradient colors={["#8E2DE2", "#4A00E0"]} start={[0, 0]} end={[1, 1]} style={styles.buttonBackground}>
          <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
            Accept
          </Button>
        </LinearGradient>
        <LinearGradient colors={["#8E2DE2", "#4A00E0"]} start={[0, 0]} end={[1, 1]} style={styles.buttonBackground}>
          <Button style={styles.button} onPress={onCancel}>
            Cancel
          </Button>
        </LinearGradient>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default ListItemInputForm;

const styles = StyleSheet.create({
  addItemContainer: {
    gap: 8,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    padding: 12,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 4,
  },
  options: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  button: {
    padding: 4,
    paddingHorizontal: 24,
    backgroundColor: "transparent",
  },
  buttonBackground: {
    borderRadius: 6,
    elevation: 3,
  },
  line: {
    height: 1,
    flexGrow: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 24,
  },
});
