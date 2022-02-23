import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectGame } from "../Features/Game/gameSlice";
import { styles } from "./addGameDialog";
import { addMembers } from "../Features/Game/gameSlice";
const AddMembers = (props) => {
  const hideDialog = () => props.setVisible(false);
  const game = useSelector(selectGame);
  const numOfMembers = game.numOfMembers;
  const getNembers = (numOfMembers) => {
    const l = [];
    for (let index = 0; index < numOfMembers; index++) {
      l.push("Player_" + (index + 1));
    }
    return l;
  };
  const [members, setmembers] = useState(() => getNembers(numOfMembers));

  const handleChange = (text, i) => {
    const newMembers = [...members];
    newMembers[i] = text;
    setmembers(newMembers);
  };
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addMembers(members));
    props.done();
  };
  return (
    <View>
      <Portal>
        <Dialog visible={props.visible} onDismiss={hideDialog}>
          <Dialog.Title>Tên người chơi</Dialog.Title>
          <Dialog.Content>
            {members.map((ele, i) => (
              <TextInput
                autoFocus={i == 0}
                key={i}
                style={styles.input}
                value={ele}
                onChangeText={(text) => {
                  handleChange(text, i);
                }}
              />
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="orange" onPress={handleClick}>
              Bắt đầu
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AddMembers;
