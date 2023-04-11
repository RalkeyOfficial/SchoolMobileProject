import { TextInput } from "react-native";
import { useController } from "react-hook-form";

const Input = ({ style, control, multiline, name }) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      placeholder={name}
      placeholderTextColor="grey"
      {...{ multiline }}
      {...{ style }}
    />
  );
};

export default Input;
