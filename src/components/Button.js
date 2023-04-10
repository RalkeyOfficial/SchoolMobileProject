import { StyleSheet, Text, Pressable } from "react-native";

const Button = ({ children, onPress, style, textStyle, ripple }) => {
  const buttonStyle = { ...styles.button, ...style };
  const _textStyle = { ...styles.buttonText, ...textStyle };

  return (
    <Pressable android_ripple={ripple} style={buttonStyle} onPress={onPress}>
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
    borderRadius: 10,
    padding: 6,
  },
  buttonText: {
    color: "#fff",
  },
});
