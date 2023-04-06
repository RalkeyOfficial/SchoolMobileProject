import { useEffect, useState } from "react"
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const storeNumber = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value.toString())
    console.log(`saved ${value.toString()} at "${key}"`)
  } catch (e) {
    // saving error
  }
}

const getNumber = async (key) => {
  try {
    const value = parseInt(await AsyncStorage.getItem("@number"))
    console.log(value)
    if (value !== null) {
      // value previously stored
      return value
    }
  } catch (e) {
    // error reading value
  }

  return undefined
}

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(async () => {
    console.log("set state")
    const data = await getNumber()
    setCount(data)
  })

  const onChanged = (text) => {
    setCount(parseInt(text) || "")
  }

  useEffect(() => {
    storeNumber("@number", count)
  }, [count])

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
        <Pressable
          android_ripple={{ color: "#fff", radius: 24 }}
          style={styles.button}
          onPress={() => setCount(count - 10)}
        >
          <Text style={styles.buttonText}>-10</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: "#fff", radius: 24 }}
          style={styles.button}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>-1</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: "#fff", radius: 32 }}
          style={styles.button}
          onPress={() => setCount(0)}
        >
          <Text style={styles.buttonText}>reset</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: "#fff", radius: 24 }}
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: "#fff", radius: 24 }}
          style={styles.button}
          onPress={() => setCount(count + 10)}
        >
          <Text style={styles.buttonText}>+10</Text>
        </Pressable>
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
