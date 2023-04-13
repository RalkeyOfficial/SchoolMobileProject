import { StyleSheet, View, Animated, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState, useEffect, useContext } from "react";
import { ListContext } from "../context/List";

const ListItem = ({ data }) => {
  const [isChecked, setIsChecked] = useState(data.checked);
  const [isExpanded, setIsExpanded] = useState(false);
  const [list, setList] = useContext(ListContext);

  const manageChecked = (_isChecked) => {
    setIsChecked(_isChecked);
    changeCheckedValue(data.id, _isChecked);
  };

  // change checked boolean
  function changeCheckedValue(id, isChecked) {
    const newList = list.map((item) => (item.id === id ? { ...item, checked: isChecked } : item));
    setList(newList);
  }

  // remove an item from the list
  function removeItem(id) {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <BouncyCheckbox
          fillColor="#8E2DE2"
          text={data.title}
          textStyle={{ fontSize: 20, color: !isChecked ? "white" : "grey" }}
          onPress={manageChecked}
          isChecked={data.checked}
        />

        <View style={styles.deleteContainer}>
          <ExpandableView expanded={isExpanded} onClick={() => removeItem(data.id)} />
          <View style={styles.deleteContainerBackgroundOne}>
            <View style={styles.deleteContainerBackgroundTwo}>
              <Text onPress={() => setIsExpanded(!isExpanded)} style={styles.deleteXbutton}>
                X
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.line} />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContent: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  deleteContainer: {
    flexDirection: "row",
  },
  deleteContainerBackgroundOne: {
    backgroundColor: "#121212",
    borderRadius: 100,
    padding: 2,
  },
  deleteContainerBackgroundTwo: {
    backgroundColor: "#f63d52",
    width: 25,
    height: 25,
    borderRadius: 100,
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteXbutton: {
    fontWeight: "bold",
  },
  line: {
    height: 1,
    flexGrow: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 24,
  },
});

const ExpandableView = ({ expanded = false, onClick }) => {
  const [width] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(width, {
      toValue: expanded ? 75 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, width]);

  return (
    <Animated.View style={{ width, ...expandedStyles.expendable }}>
      <Text numberOfLines={1} onPress={onClick}>
        Delete
      </Text>
    </Animated.View>
  );
};

const expandedStyles = StyleSheet.create({
  expendable: {
    height: 29,
    backgroundColor: "#f63d52",
    paddingLeft: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    transform: [{ translateX: 16 }],
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    overflow: "hidden",
  },
});
