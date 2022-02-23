import React, { useEffect, useState } from "react";
import { Appbar, DataTable, Provider } from "react-native-paper";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";
import ScoreDialog from "../Components/ScoreDialog";
import { useDispatch, useSelector } from "react-redux";
import { reset, selectGame } from "../Features/Game/gameSlice";

const PlayScreen = (props) => {
  const game = useSelector(selectGame);
  const members = game.members;
  const play = game.play;
  const currentRound = play.length;
  const numOfGames = game.numOfGames;
  const result = [];
  const dispatch = useDispatch();

  if (play[0]) {
    for (const i of play[0]) {
      result.push(0);
    }
    for (let i = 0; i < play.length; i++) {
      for (let j = 0; j < play[0].length; j++) {
        result[j] += parseInt(play[i][j]);
      }
    }
  }
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (numOfGames) {
      if (currentRound == numOfGames) setDone(true);
    }
  }, [currentRound]);

  const [show, setShow] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const add = () => {
    setShow(true);
  };
  const handleDone = () => {
    Alert.alert("Kết thúc", "Kết thúc sớm cho bớt đâu khổ?", [
      {
        text: "Yes",
        onPress: () => {
          setDone(true);
          setShowResult(true);
        },
      },
      {
        text: "No",
      },
    ]);
  };
  const resetGame = () => {
    Alert.alert("Reset", "Chơi ván mới", [
      {
        text: "Yes",
        onPress: () => {
          props.navigation.navigate("Home");
          dispatch(reset(""));
          setDone(false);
          setShowResult(false);
        },
      },
      {
        text: "No",
      },
    ]);
  };
  const [update, setUpdate] = useState(false);
  const [i, setI] = useState(0);
  const handleUpdate = () => {};
  return (
    <Provider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.layout}
      >
        {show && (
          <ScoreDialog
            members={members}
            round={currentRound + 1}
            visible={show}
            setVisible={setShow}
          />
        )}
        {update && (
          <ScoreDialog
            members={members}
            round={i}
            visible={update}
            setVisible={setUpdate}
            onUpdate={handleUpdate}
            update
            score={play[i - 1]}
          />
        )}
        <Appbar.Header style={styles.bottom}>
          {numOfGames != 0 && (
            <Appbar.Content
              title={"Còn " + (numOfGames - currentRound) + " ván"}
              color="white"
            />
          )}
          <Appbar.Action
            color="#fff"
            size={30}
            icon={showResult ? "eye" : "eye-off"}
            onPress={() => {
              setShowResult((pre) => !pre);
            }}
          />
          <Appbar.Action
            color="#fff"
            size={30}
            icon="check-all"
            onPress={handleDone}
            disabled={done}
          />
          <Appbar.Action
            color="#fff"
            size={30}
            icon="autorenew"
            onPress={resetGame}
          />
          <Appbar.Action
            color="#fff"
            size={30}
            icon="table-plus"
            onPress={add}
            disabled={done}
          />
        </Appbar.Header>
        <ScrollView style={{ maxHeight: "85%"}}>
          {members[0] && (
            <DataTable style={styles.table}>
              <DataTable.Header>
                <Title>Ván</Title>
                {members.map((ele, i) => (
                  <Title key={i}>{ele}</Title>
                ))}
              </DataTable.Header>
              {play.map((row, i) => (
                <DataTable.Row key={i}>
                  <DataTable.Cell
                    style={{
                      paddingLeft: 26,
                      backgroundColor: "#ea820a",
                    }}
                    onPress={() => {
                      setI(i + 1);
                      setUpdate(true);
                    }}
                  >
                    {i + 1}
                  </DataTable.Cell>
                  {row.map((col, j) => (
                    <Cell key={j}>{col}</Cell>
                  ))}
                </DataTable.Row>
              ))}
              {showResult && (
                <DataTable.Row>
                  <DataTable.Cell
                    style={{ backgroundColor: "#ea980a", paddingLeft: 26 }}
                  >
                    Điểm
                  </DataTable.Cell>
                  {result.map((s, i) => (
                    <Cell key={i}>{s}</Cell>
                  ))}
                </DataTable.Row>
              )}
            </DataTable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Provider>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
  },
  bottom: {
    backgroundColor: "#ffc107",
  },
  textCenter: {
    textAlign: "center",
  },
});

function Cell({ children }) {
  return (
    <DataTable.Cell
      style={{
        paddingLeft: 26,
        backgroundColor: "#eeebe4",
      }}
    >
      {children}
    </DataTable.Cell>
  );
}
function Title({ children }) {
  return (
    <DataTable.Title
      style={{
        textAlign: "center",
        backgroundColor: "#ea820a",
        paddingLeft: 8,
      }}
    >
      {children}
    </DataTable.Title>
  );
}
