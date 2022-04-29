import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(null);
  const [givenNumber, setGivenNumber] = useState();
  const [numberOfTryLeft, setNumberOfTryLeft] = useState(3);
  const [show, setShow] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const LoadNewGame = () => {
    setNumber(Math.floor(Math.random() * 10) + 1);
  };

  useEffect(() => {
    LoadNewGame();
  }, []);

  const handleChange = (e) => {
    setGivenNumber(Number(e.target.value));
    setSubmitClicked(false);
  };

  const handleClick = () => {
    setSubmitClicked(true);
    setShow(true);
    //console.log("number:" + number);
    //console.log("givenNumber:" + givenNumber);
    setNumberOfTryLeft(numberOfTryLeft - 1);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const chargeNewGame = () => {
    LoadNewGame();
    setNumberOfTryLeft(3);
  };
  return (
    <div className="app">
      <div className="title">
        <h1>Quizz - Guess the number</h1>
        <p>
          Rule:'Guess the correct number. Choose a number between 0 and 10, you
          have to try 3 times'
        </p>
      </div>
      <input
        type="number"
        id="in"
        min="0"
        max="10"
        required={true}
        onChange={handleChange}
      />

      {numberOfTryLeft === 0 || (number === givenNumber && submitClicked) ? (
        <button onClick={chargeNewGame}>Play again</button>
      ) : (
        <button onClick={handleClick}>Submit</button>
      )}

      {numberOfTryLeft !== 0 &&
      number !== givenNumber &&
      show &&
      numberOfTryLeft !== 3 ? (
        <p className="notice fail">
          You are wrong, you have to try again, you have to try{" "}
          {numberOfTryLeft} more times.
        </p>
      ) : numberOfTryLeft === 0 && number !== givenNumber ? (
        <p className="notice fail">
          Game over, you spent all the 3 chances, if you like to replay game,
          try again
        </p>
      ) : number === givenNumber && submitClicked ? (
        <p>You are right, you choose the correct number.</p>
      ) : null}
    </div>
  );
}

export default App;
