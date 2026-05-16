const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      state = {...action.payload};
      break;
    case 'UPDATE_USER':
      state = {...state, ...action.payload};
      break;
    case 'LOGOUT_USER':
      state = {};
      break;
  }
  return state;
}
