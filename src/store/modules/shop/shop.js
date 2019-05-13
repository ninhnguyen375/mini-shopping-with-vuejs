/* eslint-disable no-param-reassign */
import * as mutations from './mutations';
import * as actions from './actions';

const state = {
  products: [],
  auth: {
    id: Number,
    isSignIned: false,
    name: '',
    email: '',
    permission: '',
  },
  signInStatus: {
    error: false,
    errorMessage: '',
    status: 'pending',
  },
  signUpStatus: {
    error: false,
    errorMessage: '',
    status: 'pending',
  },
  cart: {},
};

const getters = {
  allProducts: () => state.products,
  cart: () => state.cart,
  auth: () => state.auth,
  signInStatus: () => state.signInStatus,
  signUpStatus: () => state.signUpStatus,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
