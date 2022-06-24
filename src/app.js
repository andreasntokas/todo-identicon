import { initState, identiconReducer } from './reducer';

const boardElem = document.getElementById('board');
const inputElem = document.getElementById('input');

let state = initState();

function clear(element) {
  element.innerHTML = '';
}

inputElem.addEventListener('input', (e) => {
  const username = e.target.value.trim();

  if (username === '') {
    state = identiconReducer(state, {
      type: 'RESET_BOARD',
    });
    render(state);
    return;
  }

  state = identiconReducer(state, {
    type: 'GENERATE_IDENTICON',
    payload: username,
  });
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
