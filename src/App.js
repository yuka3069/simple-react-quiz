import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import DateCounter from "./components/DateCounter";
import { useEffect, useReducer } from "react";
import Main from "./components/MainPart.js";
import StartScreen from "./components/StartScreen.js";
import Questions from "./components/Questions.js";

const initialState = {
  questions: [],

  // state: 'ready' | 'loading' | 'error' | 'active' | 'finished'
  state: "loading",
  index: 0,
  answer: null,
};
function reducer(state, { type, payload }) {
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, state: "ready" };
    case "start":
      return { ...state, state: "active" };
    case "dataFailed":
      return { ...state, state: "error" };
    default:
      throw new Error(`Unrecognized action: ${type}`);
  }
}

function App() {
  const [{ questions, state, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numLength = questions.length;
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
        {state === "loading" && <Loader />}
        {state === "error" && <Error />}
        {state === "ready" && (
          <StartScreen numLength={numLength} dispatch={dispatch} />
        )}
        {state === "active" && <Questions question={questions.at(index)} />}
      </Main>
    </div>
  );
}

export default App;
