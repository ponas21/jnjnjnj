const board = document.getElementById('board');
 ngburk-codex/создать-игру-3-в-ряд
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart');
const width = 8;
const colors = ['red', 'yellow', 'green', 'blue', 'purple'];
const squares = [];
let score = 0;
let moves = 0;
let startTime = Date.now();

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = 'Score: ' + score;
}

function updateMoves() {
  moves++;
  movesDisplay.textContent = 'Moves: ' + moves;
}

setInterval(() => {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = 'Time: ' + seconds + 's';
}, 1000);

restartBtn.addEventListener('click', restartGame);

function restartGame() {
  score = 0;
  moves = 0;
  startTime = Date.now();
  scoreDisplay.textContent = 'Score: 0';
  movesDisplay.textContent = 'Moves: 0';
  timerDisplay.textContent = 'Time: 0s';
  board.innerHTML = '';
  squares.length = 0;
  createBoard();
  addEventListeners();
}
=======
const width = 8;
const colors = ['red', 'yellow', 'green', 'blue', 'purple'];
const squares = [];
 main

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('draggable', true);
    square.setAttribute('id', i);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    square.className = 'square ' + randomColor;
    board.appendChild(square);
    squares.push(square);
  }
}
createBoard();
ngburk-codex/создать-игру-3-в-ряд
addEventListeners();

function addEventListeners() {
  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', e => e.preventDefault()));
  squares.forEach(square => square.addEventListener('dragenter', e => e.preventDefault()));
  squares.forEach(square => square.addEventListener('dragleave', () => {}));
  squares.forEach(square => square.addEventListener('drop', dragDrop));
}
 main

let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

ngburk-codex/создать-игру-3-в-ряд
=======
squares.forEach(square => square.addEventListener('dragstart', dragStart));
squares.forEach(square => square.addEventListener('dragend', dragEnd));
squares.forEach(square => square.addEventListener('dragover', e => e.preventDefault()));
squares.forEach(square => square.addEventListener('dragenter', e => e.preventDefault()));
squares.forEach(square => square.addEventListener('dragleave', () => {}));
squares.forEach(square => square.addEventListener('drop', dragDrop));
 main

function dragStart() {
  colorBeingDragged = this.classList[1];
  squareIdBeingDragged = parseInt(this.id);
}

function dragDrop() {
  colorBeingReplaced = this.classList[1];
  squareIdBeingReplaced = parseInt(this.id);
  this.classList.remove(colorBeingReplaced);
  this.classList.add(colorBeingDragged);
  squares[squareIdBeingDragged].classList.remove(colorBeingDragged);
  squares[squareIdBeingDragged].classList.add(colorBeingReplaced);
}

function dragEnd() {
  let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width];
  let validMove = validMoves.includes(squareIdBeingReplaced);

  if (squareIdBeingReplaced && validMove) {
 ngburk-codex/создать-игру-3-в-ряд
    updateMoves main
    squareIdBeingReplaced = null;
    checkBoard();
  } else if (squareIdBeingReplaced && !validMove) {
    squares[squareIdBeingDragged].classList.remove(squares[squareIdBeingDragged].classList[1]);
    squares[squareIdBeingDragged].classList.add(colorBeingDragged);

    squares[squareIdBeingReplaced].classList.remove(squares[squareIdBeingReplaced].classList[1]);
    squares[squareIdBeingReplaced].classList.add(colorBeingReplaced);
  } else {
    squares[squareIdBeingDragged].classList.remove(squares[squareIdBeingDragged].classList[1]);
    squares[squareIdBeingDragged].classList.add(colorBeingDragged);
  }
}

function checkRowForThree() {
  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2];
    const decidedColor = squares[i].classList[1];
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
    if (notValid.includes(i)) continue;
 ngburk-codex/создать-игру-3-в-ряд
    if (decidedColor && rowOfThree.every(index => squares[index].classList[1] === decidedColor)) {
      rowOfThree.forEach(index => squares[index].className = 'square');
      updateScore(3);
=======
    if (rowOfThree.every(index => squares[index].classList[1] === decidedColor)) {
      rowOfThree.forEach(index => squares[index].className = 'square');
 main
    }
  }
}

function checkColumnForThree() {
  for (let i = 0; i < 48; i++) {
    const columnOfThree = [i, i + width, i + width * 2];
    const decidedColor = squares[i].classList[1];
 ngburk-codex/создать-игру-3-в-ряд
    if (decidedColor && columnOfThree.every(index => squares[index].classList[1] === decidedColor)) {
      columnOfThree.forEach(index => squares[index].className = 'square');
      updateScore(3);
    }
  }
}

function checkRowForFour() {
  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3];
    const decidedColor = squares[i].classList[1];
    const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63];
    if (notValid.includes(i)) continue;
    if (decidedColor && rowOfFour.every(index => squares[index].classList[1] === decidedColor)) {
      rowOfFour.forEach(index => squares[index].className = 'square');
      updateScore(4);
    }
  }
}

function checkColumnForFour() {
  for (let i = 0; i < 32; i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
    const decidedColor = squares[i].classList[1];
    if (decidedColor && columnOfFour.every(index => squares[index].classList[1] === decidedColor)) {
      columnOfFour.forEach(index => squares[index].className = 'square');
      updateScore(4);

    if (columnOfThree.every(index => squares[index].classList[1] === decidedColor)) {
      columnOfThree.forEach(index => squares[index].className = 'square');
 main
    }
  }
}

function moveDown() {
  for (let i = 0; i < 56; i++) {
    if (squares[i + width].classList.length === 1) {
      squares[i + width].classList.add(squares[i].classList[1]);
      squares[i].className = 'square';
      if (i < width && squares[i].classList.length === 1) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        squares[i].className = 'square ' + randomColor;
      }
    }
  }
}

function checkBoard() {
 ngburk-codex/создать-игру-3-в-ряд
  checkRowForFour();
  checkColumnForFour();

 main
  checkRowForThree();
  checkColumnForThree();
  moveDown();
}

window.setInterval(checkBoard, 100);
