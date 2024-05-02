import React, { useState, useEffect } from "react";
import "./Game.css";

const bombCount = 3;

const Game = () => {
  const [balance, setBalance] = useState(100);
  const [betAmount, setBetAmount] = useState(0);
  const [winAmount, setWinAmount] = useState(0);
  const [bombsFound, setBombsFound] = useState(0);
  const [withdrawVisible, setWithdrawVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.getElementById("balanceDisplay").textContent = `Balance: ${balance} tokens`;
    document.getElementById("withdrawDisplay").textContent = `Withdraw Amount: ${winAmount} tokens`;
  }, [balance, winAmount]);

  const handlePlaceBet = () => {
    if (betAmount <= 0) {
      setErrorMessage("Invalid bet amount");
      return;
    }

    if (betAmount > balance) {
      setErrorMessage("Bet amount cannot be greater than balance");
      return;
    }

    setBalance(balance - betAmount);
    setWinAmount(0);
    setBombsFound(0);
    setErrorMessage("");

    generateGrid();

    const gameOverMessage = document.querySelector(".game-over");
    gameOverMessage.style.display = "none";

    document.getElementById("placeBetBtn").disabled = true;
  };

  const generateGrid = () => {
    const gameContainer = document.querySelector(".game-board");
    gameContainer.innerHTML = "";
    let bombPlaced = 0;
    for (let i = 0; i < 25; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (Math.random() < 0.3 && bombPlaced < bombCount) {
        cell.textContent = "💣";
        cell.classList.add("bomb");
        bombPlaced++;
      } else {
        cell.textContent = "💎";
      }
      gameContainer.appendChild(cell);
      cell.addEventListener("click", () => revealTile(cell));
    }
  };

  const revealTile = (cell) => {
    if (!cell.classList.contains("revealed")) {
      cell.classList.add("revealed");
      if (cell.classList.contains("bomb")) {
        setBombsFound(bombsFound + 1);
        if (bombsFound === 0) {
          setTimeout(() => gameOver(true), 100);
        } else if (bombsFound === bombCount) {
          gameOver(true);
        }
      } else {
        setWinAmount((prevWinAmount) => prevWinAmount + 0.25 * betAmount);
        if (!withdrawVisible) {
          setWithdrawVisible(true);
        }
      }
    }
  };

  const gameOver = (isBombExploded) => {
    resetGame();

    const gameOverMessage = document.querySelector(".game-over");
    if (isBombExploded) {
      gameOverMessage.textContent = "Game Over 💥";
      gameOverMessage.style.color = "red";
    } else {
      gameOverMessage.textContent = "Game Over 🎉";
      gameOverMessage.style.color = "green";
    }
    setWinAmount(0);
    document.getElementById("withdrawDisplay").textContent = `Withdraw Amount: ${winAmount} tokens`;
    document.getElementById("placeBetBtn").disabled = false;
  };

  const withdraw = () => {
    setBalance(balance + winAmount);
    setWinAmount(0);
    gameOver(false);
  };

  const resetGame = () => {
    const gameContainer = document.querySelector(".game-board");
    gameContainer.innerHTML = "";

    const gameOverMessage = document.querySelector(".game-over");
    gameOverMessage.style.display = "none";

    setBombsFound(0);
    setWithdrawVisible(false);
  };

  return (
    <div className="mx-auto p-10 my-6 rounded-lg flex flex-col items-center gap-2 font-poppins">
      <h1 className="text-white font-bold text-5xl mb-4">Mines and Gems Game</h1>
      <div className="bet-container">
        <label className="bet-label text-white text-xl font-semibold" htmlFor="betInput">
          Enter bet amount:
        </label>
        <input
          type="number"
          id="betInput"
          placeholder="Enter amount"
          className="rounded-lg p-1.5 text-black"
          value={betAmount}
          onChange={(e) => setBetAmount(parseInt(e.target.value))}
        />
        <button
          id="placeBetBtn"
          onClick={handlePlaceBet}
          className="place-bet-btn"
        >
          Place Bet
        </button>
      </div>
      <span className="error-msg">{errorMessage}</span>
      <div id="balanceDisplay" className="text-2xl text-white">
        Balance: {balance} tokens
      </div>
      <div id="withdrawDisplay" className="text-2xl text-white">
        Withdraw Amount: {winAmount} tokens
      </div>
      <div className="game-board"></div>
      {withdrawVisible && (
        <button
          id="withdrawBtn"
          className="withdraw-btn"
          onClick={withdraw}
        >
          Withdraw
        </button>
      )}
      <div className="game-over font-semibold"></div>
    </div>
  );
};

export default Game;
