import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import DateCounter from "./components/DateCounter";
import { useEffect, useReducer } from "react";
import Main from "./components/MainPart.js";
import StartScreen from "./components/StartScreen.js";
import Questions from "./components/Questions.js";
import Progress from "./components/Progress.js";
import FinishScreen from "./components/FinishScreen.js";

const initialState = {
  questions: [],

  // state: 'ready' | 'loading' | 'error' | 'active' | 'finished'
  status: "loading",
  index: 0, // current question index, we totally have 15 questions
  answer: null, // user's answer to the current question, it's an index
  points: 0, // user's points
};
function reducer(state, { type, payload }) {
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "start":
      return { ...state, status: "active" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: payload,
        points:
          question.correctOption === payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "nextFinish":
      return {
        ...state,
        status: "finished",
      };
    case "restartQuiz":
      return {
        ...state,
        status: "ready",
        answer: null,
        index: 0,
        points: 0,
      };
    default:
      throw new Error(`Unrecognized action: ${type}`);
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numLength = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0); // it's the total points , max points the quiz is.
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8888/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numLength={numLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numLength={numLength}
              points={points}
              maxPoints={maxPoints}
            />
            <Questions
              question={questions.at(index)}
              answer={answer}
              dispatch={dispatch}
              index={index}
              numLength={numLength}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPoints={maxPoints}
            points={points}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
