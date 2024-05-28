import NextButton from "./NextButton";
import Options from "./Options";

function Questions({ question, answer, dispatch, index, numLength }) {
  return (
    <div className="">
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numLength={numLength}
      />
    </div>
  );
}

export default Questions;
