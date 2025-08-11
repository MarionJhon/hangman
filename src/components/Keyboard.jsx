import { clsx } from "clsx";

const Keyboard = (props) => {
  const styleKeyboard = clsx("keyboard-letter", {
          isWrong: props.wrong,
          isCorrect: props.correct,
        })
  return (
    <>
      <button
        className={styleKeyboard}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.letter}
      </button>
    </>
  );
};

export default Keyboard;
