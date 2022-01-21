import { createStore } from "vuex";

const API_URL = "http://localhost:3000/api/v1";
const FETCH_FAIL = "Failed to fetch";

export default createStore({
  state: {
    showcase: [],
    cart: {},
    searchString: '',
    isServerError: false
  },
  getters: {
    getCart: (state) => state.cart,
    getShowcase: (state) => state.showcase.filter((product) => new RegExp(state.searchString, 'i').test(product.product_name)),
    getSearchString: (state) => state.searchString,
    getServerError: (state) => state.isServerError,
  },
  mutations: {
    setShowcase: (state, payload) => state.showcase = payload,
    setCart: (state, payload) => state.cart = payload,
    addToCart: (state, payload) => {
      state.cart.amount += payload.price;
      state.cart.countGoods += 1;
      const idx = state.cart.contents.findIndex((good) => good.id_product == payload.id_product);
      if (idx >= 0) { state.cart.contents[idx].quantity += 1; }
      else { state.cart.contents.push(payload) }
    },
    removeFromCart: (state, payload) => {
      const idx = state.cart.contents.findIndex((good) => good.id_product == payload.id_product);
      state.cart.amount -= payload.price;
      state.cart.countGoods -= 1;
      state.cart.contents[idx].quantity -= 1;
      if (state.cart.contents[idx].quantity <= 0) {
        state.cart.contents.splice(idx, 1);
      }
    },
    setSearchString: (state, payload) => state.searchString = payload,
    serverError: (state) => state.isServerError = true
  },
  actions: {
    loadShowcase({ commit }) {
      fetch(`${API_URL}/showcase`)
        .then(
          (res) => {
            return res.json();
          },
          () => {
            console.log(FETCH_FAIL);
            commit('serverError')
          })
        .then((data) => {
          commit('setShowcase', data)
        });
    },
    loadCart({ commit }) {
      fetch(`${API_URL}/cart`)
        .then(
          (res) => {
            return res.json();
          },
          () => {
            console.log(FETCH_FAIL);
            commit('serverError')
          })
        .then((data) => {
          commit('setCart', data)
        });
    },
    addToCart({ commit }, product) {
      fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
        .then(
          () => {
            commit('addToCart', product)
          },
          () => {
            console.log(FETCH_FAIL);
            commit('serverError')
          })
    },
    removeFromCart({ commit }, product) {
      fetch(`${API_URL}/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
        .then(
          () => {
            commit('removeFromCart', product)
          },
          () => {
            console.log(FETCH_FAIL);
            commit('serverError')
          })
    },
  }
})