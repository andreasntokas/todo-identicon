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

/*
const Counter = document.querySelector("#counter");

const incButton = document.querySelector("#incButton");
const incBy10Button = document.querySelector("#incBy10Button");
const decButton = document.querySelector("#decButton");
const resetButton = document.querySelector("#resetButton");

// ========================================================

const initState = {
  count: 0
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state, count: state.count + 1
      };
    case "INCREMENT_BY_AMOUNT":
      return {
        ...state, count: state.count + action.payload,
      };
    case "DECREMENT":
      return {
        ...state, count: state.count - 1
      };
    case "RESET":
      return initState;
    default:
      return state;
  }
};

// ========================================================

let state = initState;

incButton.addEventListener("click", () => {
  state = counterReducer(state, {
    type: "INCREMENT"
  });
  render(state);
});

incBy10Button.addEventListener("click", () => {
  state = counterReducer(state, {
    type: "INCREMENT_BY_AMOUNT",
    payload: 10,
  });
  render(state);
});

decButton.addEventListener("click", () => {
  state = counterReducer(state, {
    type: "DECREMENT"
  });
  render(state);
});

resetButton.addEventListener("click", () => {
  state = counterReducer(state, {
    type: "RESET"
  });
  render(state);
});

function render(state) {
  Counter.innerHTML = state.count;
}

render(state);
*/
