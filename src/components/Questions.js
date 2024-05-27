import Options from "./Options";

function Questions({ question }) {
  return (
    <div className="">
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </div>
  );
}

export default Questions;
