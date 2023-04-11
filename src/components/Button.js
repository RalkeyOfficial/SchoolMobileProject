import { StyleSheet, Text, View, Pressable } from "react-native";

const Button = ({ children, onPress, style, textStyle, ripple }) => {
  const _buttonStyle = { ...styles.button, ...style };
  const _textStyle = { ...styles.buttonText, ...textStyle };

  return (
    <Pressable android_ripple={ripple} style={_buttonStyle} onPress={onPress}>
      <Text style={_textStyle}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(128, 0, 255)",
    borderRadius: 6,
    padding: 6,
  },
  buttonText: {
    color: "#fff",
  },
});
