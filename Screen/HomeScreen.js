import React, { useState } from "react";
import { Text, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { Button, Provider } from "react-native-paper";
import AddGameDialog from "../Components/addGameDialog";
import AddMembers from "../Components/addMembers";

export default function HomeScreen(props) {
  const [showDialog1, setshowDialog1] = useState(false);
  const [showDialog2, setshowDialog2] = useState(false);
  const handleAddGame = () => {
    setshowDialog1(false);
    setshowDialog2(true);
  };
  const handleAddMember = () => {
    setshowDialog2(false);
    props.navigation.navigate("Play");
  };
  return (
    <Provider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.layout}
      >
        {showDialog1 && (
          <AddGameDialog
            visible={showDialog1}
            setVisible={setshowDialog1}
            done={handleAddGame}
          />
        )}
        {showDialog2 && (
          <AddMembers
            visible={showDialog2}
            setVisible={setshowDialog2}
            done={handleAddMember}
          />
        )}
        <Image style={styles.img} source={require("../assets/splash.png")} />
        <Text style={styles.text}>Làm ván nào anh em</Text>
        <Button
          icon="plus"
          mode="contained"
          style={styles.btn}
          onPress={() => setshowDialog1(true)}
        >
          Ván mới
        </Button>
      </KeyboardAvoidingView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 200,
    width: 200,
  },
  text: {
    marginVertical: 40,
    fontSize: 28,
  },
  btn: {
    backgroundColor: "#ffc107",
    height: 40,
    width: 150,
  },
});
