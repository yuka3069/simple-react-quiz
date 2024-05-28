function NextButton({ dispatch, answer, index, numLength }) {
  if (answer === null) return null;
  if (index < numLength - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (index === numLength - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextFinish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
