import { useState } from "react";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const winner = calculateWinner(board);
  const draw = !winner && board.every(Boolean);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(!xTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  }

  return (
    <div style={styles.container}>
      <div style={styles.game}>
        <h1>❌ Triqui ⭕</h1>

        <p style={styles.status}>
          {winner
            ? `🎉 Ganó ${winner}`
            : draw
            ? "🤝 ¡Empate!"
            : `Turno de ${xTurn ? "❌ X" : "⭕ O"}`}
        </p>

        <div style={styles.board}>
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              style={{
                ...styles.cell,
                color: cell === "X" ? "#ef4444" : "#3b82f6",
              }}
            >
              {cell}
            </button>
          ))}
        </div>

        <button onClick={resetGame} style={styles.reset}>
          🔄 Reiniciar
        </button>
      </div>
    </div>
  );
}

function calculateWinner(board) {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of combinations) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #111827, #312e81)",
    fontFamily: "Arial, sans-serif",
  },

  game: {
    textAlign: "center",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },

  status: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "25px",
  },

  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 90px)",
    gridTemplateRows: "repeat(3, 90px)",
    gap: "8px",
  },

  cell: {
    width: "90px",
    height: "90px",
    border: "none",
    borderRadius: "12px",
    background: "#f3f4f6",
    fontSize: "42px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  reset: {
    marginTop: "25px",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
