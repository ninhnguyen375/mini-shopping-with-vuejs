/* eslint-disable no-param-reassign */
export const setProducts = (state, products) => {
  state.products = products;
};

export const setAuth = (state, auth) => {
  state.auth = auth;
};

export const setSignInStatus = (state, status) => {
  state.signInStatus = status;
};

export const setSignUpStatus = (state, status) => {
  state.signUpStatus = status;
};

export const setCart = (state, cart) => {
  state.cart = cart;
};
