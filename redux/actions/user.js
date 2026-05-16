const loginAction = user => {
  return {
    type: 'SET_USER',
    payload: {
      ...user,
    },
  };
};

const updateAction = payload => {
  return {
    type: 'UPDATE_USER',
    payload,
  };
};

const logoutAction = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export default {loginAction, updateAction, logoutAction};
