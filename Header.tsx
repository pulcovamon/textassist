import { View, Text, useColorScheme } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createStyles, iconSize } from "./Styles";

const Header = () => {
  const Styles = createStyles(useColorScheme());
  return (
    <View style={Styles.header}>
      <Icon name="manage-search" size={iconSize} color="white" />
      <Text style={Styles.title}>Textový asistent</Text>
    </View>
  );
};

export default Header;
