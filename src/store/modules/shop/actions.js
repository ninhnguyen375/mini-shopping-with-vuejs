import Axios from 'axios';
import jwt from 'jsonwebtoken';

export const fetchProducts = async ({ commit }) => {
  const res = await Axios.get('/products');
  commit('setProducts', res.data);
};

export const signIn = async ({ commit }, { email, password }) => {
  commit('setSignInStatus', { status: 'pending' });

  const auth = await Axios.get(`users?email=${email}&password=${password}`);

  if (!auth.data || !auth.data[0]) {
    commit('setSignInStatus', {
      error: true,
      errorMessage: 'Name or Password incorrect',
      status: 'done',
    });
  } else {
    commit('setSignInStatus', { error: false, errorMessage: '', status: 'done' });

    const token = jwt.sign(auth.data[0], 'shhh');

    window.localStorage.setItem('auth_vue_shop_token', token);

    commit('setAuth', {
      id: auth.data[0].id,
      email: auth.data[0].email,
      isSignIned: true,
      name: auth.data[0].name,
      permission: auth.data[0].permission,
    });
  }
};

export const signOut = ({ commit }) => {
  window.localStorage.removeItem('auth_vue_shop_token');
  commit('setAuth', { isSignIned: false });
};

export const fetchCart = async ({ commit }, id) => {
  const cart = await Axios.get(`/cart?auth=${id}`);
  commit('setCart', cart.data[0]);
};

export const addToCart = async ({ commit }, { auth, product, amount }) => {
  let cart = await Axios.get(`/cart?auth=${auth}`);

  if (cart.data && cart.data[0]) {
    cart = { ...cart.data[0] };

    const indexOfThisProduct = cart.products.findIndex(item => item.id === product.id);

    if (indexOfThisProduct !== -1) {
      cart.products[indexOfThisProduct].amount += amount;
    } else {
      const newProduct = product;
      delete newProduct.quantity;
      newProduct.amount = amount;
      cart.products.push(newProduct);
    }

    await Axios.put(`/cart/${cart.id}`, cart);
    commit('setCart', cart);
  } else {
    const newProduct = product;
    delete newProduct.quantity;
    newProduct.amount = amount;
    const newCart = {
      auth,
      products: [newProduct],
    };
    await Axios.post('/cart', newCart);
    commit('setCart', newCart);
  }
};

export const removeItemCart = async ({ commit }, { cart = [], productId }) => {
  const newCart = { ...cart, products: cart.products.filter(item => item.id !== productId) };
  await Axios.put(`/cart/${cart.id}`, newCart);
  commit('setCart', newCart);
};
