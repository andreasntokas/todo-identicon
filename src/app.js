import _ from 'lodash';
import sha1 from 'js-sha1';
import { fromHex } from './fromHex';

const boardElem = document.getElementById('board');
const inputElem = document.getElementById('input');

let state = {
  board: Array(25).fill(''),
  color: '',
};

function clear(element) {
  element.innerHTML = '';
}

function refreshBoard() {
  state.board = Array(25).fill('');
  state.color = '';
}

function displayIdenticon() {
  let username = fromHex(sha1(inputElem.value.trim()));
  username = username.slice(0, 15);

  state.board[0] = username[0];
  state.board[1] = username[1];
  state.board[2] = username[2];
  state.board[3] = username[1];
  state.board[4] = username[0];
  state.board[5] = username[3];
  state.board[6] = username[4];
  state.board[7] = username[5];
  state.board[8] = username[4];
  state.board[9] = username[3];
  state.board[10] = username[6];
  state.board[11] = username[7];
  state.board[12] = username[8];
  state.board[13] = username[7];
  state.board[14] = username[6];
  state.board[15] = username[9];
  state.board[16] = username[10];
  state.board[17] = username[11];
  state.board[18] = username[10];
  state.board[19] = username[9];
  state.board[20] = username[12];
  state.board[21] = username[13];
  state.board[22] = username[14];
  state.board[23] = username[13];
  state.board[24] = username[12];

  rgbToHex();
}

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  state.color =
    '#' +
    componentToHex(state.board[0]) +
    componentToHex(state.board[1]) +
    componentToHex(state.board[2]);
}

inputElem.addEventListener('input', (e) => {
  if (e.target.value === '') {
    refreshBoard();
    render(state);
    return;
  }

  if (/^\s/.test(e.target.value)) {
    e.target.value = '';
    render(state);
    return;
  }

  inputElem.textContent = e.target.value;
  displayIdenticon();
  render(state);
});

function render(state) {
  clear(boardElem);

  state.board.forEach((_, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');

    if (state.board[index] % 2 === 0) {
      cellElement.style.backgroundColor = state.color;
    }

    if (state.board[index] % 2 !== 0) {
      cellElement.style.backgroundColor = 'white';
    }

    boardElem.appendChild(cellElement);
  });
}

render(state);
