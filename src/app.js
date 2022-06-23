import _ from 'lodash';
import sha1 from 'js-sha1';

const boardElem = document.getElementById('board');
const inputElem = document.getElementById('input');

let state = {
  board: Array(25).fill(''),
  color: '',
};

const HEX_STRINGS = '0123456789abcdef';

const MAP_HEX = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

// https://github.com/nodejs/node/blob/v14.18.1/src/string_bytes.cc#L246-L261
function fromHex(hexString) {
  const bytes = new Uint8Array(Math.floor((hexString || '').length / 2));
  let i;
  for (i = 0; i < bytes.length; i++) {
    const a = MAP_HEX[hexString[i * 2]];
    const b = MAP_HEX[hexString[i * 2 + 1]];
    if (a === undefined || b === undefined) {
      break;
    }
    bytes[i] = (a << 4) | b;
  }

  state.board[0] = bytes[0];
  state.board[1] = bytes[1];
  state.board[2] = bytes[2];
  state.board[3] = bytes[1];
  state.board[4] = bytes[0];
  state.board[5] = bytes[3];
  state.board[6] = bytes[4];
  state.board[7] = bytes[5];
  state.board[8] = bytes[4];
  state.board[9] = bytes[3];
  state.board[10] = bytes[6];
  state.board[11] = bytes[7];
  state.board[12] = bytes[8];
  state.board[13] = bytes[7];
  state.board[14] = bytes[6];
  state.board[15] = bytes[9];
  state.board[16] = bytes[10];
  state.board[17] = bytes[11];
  state.board[18] = bytes[10];
  state.board[19] = bytes[9];
  state.board[20] = bytes[12];
  state.board[21] = bytes[13];
  state.board[22] = bytes[14];
  state.board[23] = bytes[13];
  state.board[24] = bytes[12];

  render(state);

  return i === bytes.length ? bytes : bytes.slice(0, i);
}

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

  rgbToHex();

  console.log(state.board);
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

  console.log(state.color);
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
