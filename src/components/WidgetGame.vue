<template>
  <div class="tic-tac-toe-widget">
    <h2 class="title">Tic Tac Toe</h2>
    <div class="board">
      <div v-for="(cell, index) in board" :key="index" @click="handleClick(index)" class="cell">
        <span v-if="cell === 'X'" class="marker-x">{{ cell }}</span>
        <span v-else-if="cell === 'O'" class="marker-o">{{ cell }}</span>
      </div>
    </div>
    <div class="button-container">
      <button @click="resetGame" class="reset-button">Reset</button>
    </div>
    <p>{{ status }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
      isGameEnded: false,
    };
  },
  computed: {
    status() {
      if (this.isGameEnded) {
        if (this.isBoardFull()) {
          return 'Game Over! Hasilnya Seri.';
        } else {
          return `Pemain ${this.currentPlayer} Menang!`;
        }
      }
      return `Giliran Pemain ${this.currentPlayer}`;
    },
  },
  methods: {
    handleClick(index) {
      if (!this.isGameEnded && this.board[index] === '') {
        this.board[index] = this.currentPlayer;
        this.checkWinner();
        if (!this.isGameEnded) {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    },
    checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
      ];

      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          this.isGameEnded = true;
          return;
        }
      }

      if (this.isBoardFull() && !this.isGameEnded) {
        this.isGameEnded = true;
      }
    },
    isBoardFull() {
      return this.board.every(cell => cell !== '');
    },
    resetGame() {
      this.board = ['', '', '', '', '', '', '', '', ''];
      this.currentPlayer = 'X';
      this.isGameEnded = false;
    },
  },
};
</script>

<style scoped>
.tic-tac-toe-widget {
  background-color: #FCAEAE;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  max-width: 80%;
  margin: 0 auto;
}
p {
  color: #fff;
}
.title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  aspect-ratio: 1;
  max-width: 400px;
  margin: 0 auto;
}

.cell {
  position: relative;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 36px;
  height: 100%;
  width: 100%;
  padding: 10px;
}

.marker-x::after,
.marker-o::after {
  content: 'X';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.marker-o::after {
  content: 'O';
}

.button-container {
  margin-top: 20px;
}

.reset-button {
  padding: 8px 16px;
  background-color: #FF6666;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px auto;
}
.reset-button:hover {
  background-color: #FF8989;
}

p {
  margin: 0;
  font-size: 18px;
}
</style>
