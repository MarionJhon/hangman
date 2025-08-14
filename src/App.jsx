import "./App.css";
import { useState } from "react";
import LanguageChips from "./components/LanguageChips";
import Keyboard from "./components/Keyboard";
import { languages } from "./language";
import { getFarewellText, getRandomWord } from "./util";
import Confetti from "react-confetti";
import clsx from "clsx";

function App() {
  //state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetter, setGuessedLetter] = useState([]);

  //derived values
  const wrongGuessCount = guessedLetter.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const numGuessLeft = languages.length - 1 - wrongGuessCount;
  const isGameWin = currentWord
    .split("")
    .every((letter) => guessedLetter.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWin || isGameLost;
  const lastGuessedLetter = guessedLetter[guessedLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //add the letter to state array
  const addGuessedLetter = (value) => {
    setGuessedLetter((prevLetter) =>
      prevLetter.includes(value) ? prevLetter : [...prevLetter, value]
    );
  };

  const langChips = languages.map((chips, index) => {
    const islost = index < wrongGuessCount;
    return (
      <LanguageChips
        key={chips.name}
        name={chips.name}
        bg={chips.backgroundColor}
        color={chips.color}
        lost={islost}
      />
    );
  });

  //Display each letter in uppercase if it matches a guessed letter
  const wordArr = currentWord.split("");
  const word = wordArr.map((letter, index) => {
    const shouldRevelLetter = isGameLost || guessedLetter.includes(letter);

    return (
      <span
        className={clsx(
          "letter",
          isGameLost && !guessedLetter.includes(letter) && "revelLetter"
        )}
        key={index}
      >
        {shouldRevelLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const alphaArr = alphabet.split("");
  const keyboard = alphaArr.map((letter) => {
    const isGuessed = guessedLetter.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    return (
      <Keyboard
        wrong={isWrong}
        correct={isCorrect}
        ariaDisable={guessedLetter.includes(letter)}
        label={letter}
        key={letter}
        letter={letter.toUpperCase()}
        disabled={isGameOver}
        onClick={() => addGuessedLetter(letter)}
      />
    );
  });

  const renderGameStatus = () => {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWin) {
      return (
        <>
          <h1>You win!</h1>
          <p>Well done🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h1>Game over!</h1>
          <p>You lost! Better start learning assembly🥹 </p>
        </>
      );
    }
    return null;
  };

  const startNewGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetter([]);
  };

  return (
    <main>
      {isGameWin && <Confetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming word safe
          from assembly!
        </p>
      </header>
      <section
        aria-live="polite"
        role="status"
        className={clsx(
          "status",
          isGameWin && "game-win",
          isGameLost && "game-lost",
          { farewell: !isGameOver && isLastGuessIncorrect }
        )}
      >
        {renderGameStatus()}
      </section>
      <section className="language-chips">{langChips}</section>
      <section className="word">{word}</section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! the letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetter.includes(letter) ? letter + "." : "blank."
            )
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
    </main>
  );
}

export default App;
