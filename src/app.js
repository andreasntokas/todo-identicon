import _ from 'lodash';
import sha1 from 'js-sha1';
import { fromHex, rgbToHex } from './utils';

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

function generateIdenticon(username) {
  const hash = sha1(username);
  const bytes = fromHex(hash).slice(0, 15);
  const [r, g, b] = bytes; // array destructuring

  const identicon = _.reduce(
    _.chunk(_.take(bytes, 15), 3),
    (grid, row) => _.concat(grid, row, _.reverse(_.dropRight(row))),
    []
  );

  state.board = identicon;

  state.color = rgbToHex(r, g, b);
}

inputElem.addEventListener('input', (e) => {
  const username = e.target.value.trim();

  if (username === '') {
    refreshBoard();
    render(state);
    return;
  }

  generateIdenticon(username);
  render(state);
});

function render(state) {
  clear(boardElem);

  state.board.forEach((_, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');

    cellElement.style.backgroundColor =
      state.board[index] % 2 === 0 ? state.color : '#FFFFFF';

    boardElem.appendChild(cellElement);
  });
}

render(state);
