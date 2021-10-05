import { TEST } from "../actions";
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;
