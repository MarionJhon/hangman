const Keyboard = (props) => {
  return (
    <>
      <button className="keyboard-letter" onClick={props.onClick}>{props.letter}</button>
    </>
  );
};

export default Keyboard;
