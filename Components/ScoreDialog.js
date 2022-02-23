import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import { styles } from "./addGameDialog";
import { addScore, changeScore } from "../Features/Game/gameSlice";
const ScoreDialog = (props) => {
  const hideDialog = () => props.setVisible(false);
  const [disable, setDisable] = useState(true);
  const getScores = (n) => {
    if (props.update) {
      return props.score;
    }
    const l = [];
    for (let index = 0; index < n; index++) {
      l.push("");
    }
    return l;
  };
  const [scores, setScores] = useState(() => getScores(props.members.length));
  const handleChange = (text, i) => {
    const newScore = [...scores];
    newScore[i] = text;
    setScores(newScore);
  };
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addScore(scores));
    hideDialog();
  };
  const handleUpdate = () => {
    dispatch(
      changeScore({
        i: props.round - 1,
        scores,
      })
    );
    hideDialog();
  };

  const check = (list) => {
    for (const s of list) {
      if (isNaN(parseInt(s))) return true;
    }
    return false;
  };
  useEffect(() => {
    const result = check(scores);
    setDisable(result);
  });
  return (
    <View>
      <Portal>
        <Dialog visible={props.visible} onDismiss={hideDialog}>
          <Dialog.Title>{"Ván " + props.round}</Dialog.Title>
          <Dialog.Content>
            {props.members.map((ele, i) => (
              <TextInput
                autoFocus={i == 0}
                key={i}
                style={styles.input}
                placeholder={ele}
                value={scores[i]}
                onChangeText={(text) => {
                  handleChange(text, i);
                }}
                keyboardType="numeric"
                value={scores[i]}
              />
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              disabled={disable}
              color="orange"
              onPress={() => {
                if (props.update) {
                  handleUpdate();
                } else {
                  handleAdd();
                }
              }}
            >
              Lưu
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ScoreDialog;
