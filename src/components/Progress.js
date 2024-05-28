function Progress({ index, numLength, points, maxPoints }) {
  return (
    <header className="progress">
      <progress max={numLength} value={index + 1} />
      <p>
        Question <strong>{index + 1}</strong> / {numLength}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
