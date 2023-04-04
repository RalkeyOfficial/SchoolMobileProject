import { useEffect, useState } from "react"
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native"

export default function App() {
  const [count, setCount] = useState(0)

  const onChanged = (text) => {
    setCount(parseInt(text) || "")
  }

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      // on keyboard show code here
    })
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      // on keyboard hide code here
      !count || setCount(0)
    })

    return () => {
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    }
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChanged}
        value={count.toString()}
        keyboardType={"numeric"}
      />
      <View style={styles.buttons}>
        <TouchableOpacity>
          <Pressable style={styles.button} onPress={() => setCount(count + 10)}>
            <Text style={styles.buttonText}>+10</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCount(count + 1)}>
            <Text style={styles.buttonText}>+1</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCount(0)}>
            <Text style={styles.buttonText}>reset</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCount(count - 1)}>
            <Text style={styles.buttonText}>-1</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCount(count - 10)}>
            <Text style={styles.buttonText}>-10</Text>
          </Pressable>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#f527e0",
    borderRadius: 6,
    padding: 6,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
  },
})
