import "./App.css";
import { useState } from "react";
import LanguageChips from "./components/LanguageChips";
import Keyboard from "./components/Keyboard"
import { languages } from "./language";

function App() {
  const [currentWord, setCurrentWord] = useState("react");

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const langChips = languages.map((chips) => (
    <LanguageChips
      key={chips.name}
      name={chips.name}
      bg={chips.backgroundColor}
      color={chips.color}
    />
  ));

  const wordArr = currentWord.split("");
  const word = wordArr.map((letters, index) => {
    const letter = letters.toUpperCase();
    return <span className="letter" key={index}>{letter}</span>;
  });

  const alphaArr = alphabet.split("");
  const keyboard = alphaArr.map((letters, index) => {
    const letter = letters.toUpperCase()
    return <Keyboard key={index} letter={letter} />
  }) 

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming word safe
          from assembly!
        </p>
      </header>
      <section className="status">
        <h1>You win!</h1>
        <p>Well done🎉</p>
      </section>
      <section className="language-chips">{langChips}</section>
      <section className="word">{word}</section>
      <section className="keyboard">{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}

export default App;
