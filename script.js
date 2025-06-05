const board = document.getElementById('board');
const width = 8;
const colors = ['red', 'yellow', 'green', 'blue', 'purple'];
const squares = [];

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

let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener('dragstart', dragStart));
squares.forEach(square => square.addEventListener('dragend', dragEnd));
squares.forEach(square => square.addEventListener('dragover', e => e.preventDefault()));
squares.forEach(square => square.addEventListener('dragenter', e => e.preventDefault()));
squares.forEach(square => square.addEventListener('dragleave', () => {}));
squares.forEach(square => square.addEventListener('drop', dragDrop));

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
    if (rowOfThree.every(index => squares[index].classList[1] === decidedColor)) {
      rowOfThree.forEach(index => squares[index].className = 'square');
    }
  }
}

function checkColumnForThree() {
  for (let i = 0; i < 48; i++) {
    const columnOfThree = [i, i + width, i + width * 2];
    const decidedColor = squares[i].classList[1];
    if (columnOfThree.every(index => squares[index].classList[1] === decidedColor)) {
      columnOfThree.forEach(index => squares[index].className = 'square');
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
  checkRowForThree();
  checkColumnForThree();
  moveDown();
}

window.setInterval(checkBoard, 100);
