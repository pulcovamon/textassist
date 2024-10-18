import { StyleSheet } from "react-native";

export const createStyles = (colorScheme) => {
  let backgroundColor = colorScheme === "dark" ? "#121212" : "#F5FCFF";
  let textColor = colorScheme === "dark" ? "white" : "black";
  let detailColor = colorScheme === "dark" ? "#292929" : "#6200ee";
  let buttonColor = colorScheme === "dark" ? "#292929" : "#6200ee";
  let buttonOutline = colorScheme === "dark" ? "#bb86fc" : "#6200ee";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
      padding: 0,
      margin: 0,
    },
    title: {
      color: "white",
      fontSize: 32,
      marginLeft: 10,
      fontFamily: "Atkinson-Hyperlegible",
    },
    header: {
      backgroundColor: detailColor,
      width: "100%",
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 40,
      borderBottomColor: buttonOutline,
      borderBottomWidth: 5,
    },
    button: {
      backgroundColor: buttonColor,
      justifyContent: "center",
      alignItems: "center",
      borderColor: buttonOutline,
      borderWidth: 2,
      overflow: "hidden",
    },
    buttonContainer: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 32,
      marginLeft: 10,
      fontFamily: "Atkinson-Hyperlegible",
    },
    roundButton: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: buttonOutline,
      borderWidth: 2,
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: detailColor,
      paddingVertical: 10,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      borderTopColor: buttonOutline,
      borderTopWidth: 5,
      zIndex: 1,
      height: 100,
    },
    loading: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    contentContainer: {
      marginBottom: 100,
    },
    resultText: {
      padding: 10,
      textAlign: "left",
      fontFamily: "Atkinson-Hyperlegible-bold",
      color: textColor,
    },
  });
};

export const iconSize = 50;
