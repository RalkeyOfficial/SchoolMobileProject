import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const ListItem = ({ title, description, onPress }) => {
  return (
    <View style={listItemStyles.listItem}>
      <View style={listItemStyles.listItemTop}>
        <Text style={listItemStyles.listItemTopText}>{title}</Text>
        <Button style={listItemStyles.deleteButton} {...{ onPress }}>
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
    borderColor: "#fff",
    borderRadius: 6,
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
    padding: 0,
    paddingHorizontal: 8,
    margin: 4,
  },
  description: {
    color: "white",
    fontSize: 16,
  },
});
