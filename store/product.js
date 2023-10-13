// declare state
export function state() {
  return {
    products: [],
  }
}

// actions
export const actions = {
  async searchProducts(context, payload) {
    try {
      const response = await this.$axios.$get(
        `/api/v1/products/search?key=${payload}`
      )
      context.commit('SET_PRODUCTS', response)
    } catch (err) {
      context.commit('SET_PRODUCTS', err.response.data)
    }
  },
}

export const mutations = {
  SET_PRODUCTS(state, body) {
    state.products = body
  },
}

// getter
export const getters = {
  getProduct: (state) => {
    return state.products
  },
}
