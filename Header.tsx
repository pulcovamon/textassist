import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Header = () => {
    return (
    <View style={styles.header}>
        <Icon name="manage-search" size={60} color="white" />
        <Text style={styles.title}>Textový asistent</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    title: {
      color: "white",
      fontSize: 38,
      marginLeft: 10,
      fontFamily: "Atkinson-Hyperlegible",
    },
    header: {
      backgroundColor: "#6200EE",
      width: "100%",
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 40,
    }
  });

export default Header;