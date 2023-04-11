import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const ListItem = ({ title, description, onPress }) => {
  return (
    <View style={listItemStyles.listItem}>
      <View style={listItemStyles.listItemTop}>
        <Text style={listItemStyles.listItemTopText}>{title}</Text>
        <Button style={listItemStyles.deleteButton} textStyle={listItemStyles.deleteButtonText} {...{ onPress }}>
          X
        </Button>
      </View>
      <Text style={listItemStyles.description}>{description}</Text>
    </View>
  );
};

export default ListItem;

const listItemStyles = StyleSheet.create({
  listItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "rgb(150, 150, 150)",
    borderRadius: 4,
    gap: 6,
  },
  listItemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItemTopText: {
    fontSize: 24,
    color: "white",
  },
  deleteButton: {
    backgroundColor: "rgb(215, 0, 0)",
    borderRadius: 128,
    maxHeight: 32,
    paddingHorizontal: 11,
    overflow: "visible",
  },
  deleteButtonText: {
    fontSize: 16,
  },
  description: {
    color: "white",
    fontSize: 16,
  },
});
