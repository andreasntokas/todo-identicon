import _ from 'lodash';
import sha1 from 'js-sha1';
import { fromHex, rgbToHex } from './utils';

export const initState = () => {
  return { board: Array(25).fill(''), color: '' };
};

export const identiconReducer = (state, action) => {
  switch (action.type) {
    case 'GENERATE_IDENTICON': {
      const hash = sha1(action.payload);
      const bytes = fromHex(hash).slice(0, 15);
      const [r, g, b] = bytes;

      const identicon = _.reduce(
        _.chunk(_.take(bytes, 15), 3),
        (grid, row) => _.concat(grid, row, _.reverse(_.dropRight(row))),
        []
      );

      return { ...state, board: identicon, color: rgbToHex(r, g, b) };
    }
    case 'RESET_BOARD':
      return initState();
    default:
      return state;
  }
};
