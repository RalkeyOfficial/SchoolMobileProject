import { useState } from "react"
import { StyleSheet, Text, View, Button } from "react-native"

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <View style={styles.buttons}>
        <Button title="+10" onPress={() => setCount(count + 10)} />
        <Button title="+1" onPress={() => setCount(count + 1)} />
        <Button title="reset" onPress={() => setCount(0)} />
        <Button title="-1" onPress={() => setCount(count - 1)} />
        <Button title="-10" onPress={() => setCount(count - 10)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 16,
  },
})
