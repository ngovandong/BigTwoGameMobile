import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Button, Dialog, Portal, Switch, HelperText } from "react-native-paper";
import { addGame, reset } from "../Features/Game/gameSlice";

const AddGameDialog = (props) => {
  const [members, setMembers] = useState();
  const [limit, setLimit] = useState(false);
  const [numOfGames, setnumOfGames] = useState();
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const handleClick = () => {
    let game;
    if (limit) {
      game = {
        numOfGames: parseInt(numOfGames),
        numOfMembers: parseInt(members),
      };
    } else {
      game = {
        numOfGames: 0,
        numOfMembers: parseInt(members),
      };
    }
    dispatch(reset(""));
    dispatch(addGame(game));
    props.done();
  };
  const hasErrors = () => {
    let result = false;
    try {
      const m = parseInt(members);
      if (isNaN(m)) throw new Error("not int");
      if (m > 4 || m < 2) result = true;
      if (limit) {
        const g = parseInt(numOfGames);
        if (isNaN(g)) throw new Error("not int");
        if (g < 1) result = true;
      }
    } catch (error) {
      result = true;
    }
    return result;
  };
  useEffect(() => {
    if (hasErrors()) setDisable(true);
    else setDisable(false);
  });
  return (
    <View>
      <Portal>
        <Dialog
          visible={props.visible}
          onDismiss={() => props.setVisible(false)}
        >
          <Dialog.Title>Tạo ván</Dialog.Title>
          <Dialog.Content>
            <View style={styles.wrap}>
              <HelperText
                style={styles.error}
                type="error"
                visible={hasErrors()}
              >
                Nhập sai thông tin
              </HelperText>
            </View>
            <TextInput
              autoFocus
              keyboardType={
                Platform.OS == "ios" ? "numbers-and-punctuation" : "number-pad"
              }
              placeholder="Số người chơi"
              style={styles.input}
              value={members}
              onChangeText={(members) => setMembers(members)}
            />
            <View style={styles.layout}>
              <Text style={{ fontSize: 18 }}>Giới hạn số ván</Text>
              <Switch
                value={limit}
                onValueChange={() => setLimit((pre) => !pre)}
                color="orange"
              />
            </View>
            {limit && (
              <TextInput
                autoFocus
                placeholder="Số ván"
                keyboardType={
                  Platform.OS == "ios"
                    ? "numbers-and-punctuation"
                    : "number-pad"
                }
                style={styles.input}
                value={numOfGames}
                onChangeText={(g) => setnumOfGames(g)}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={disable} color="orange" onPress={handleClick}>
              Tạo
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AddGameDialog;

export const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: "orange",
    borderRadius: 3,
    marginVertical: 16,
  },
  error: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrap: {
    marginBottom: 10,
  },
});
