export function state() {
  return {
    userData: [],
    error: [],
  }
}

export const actions = {
  async getUser(context, payload) {
    try {
      const response = await this.$axios.$get(
        `/api/v1/user/${payload.userId}`,
        {
          headers: { 'auth-token': payload.token },
        }
      )
      context.commit('SET_USERDATA', response.body)
    } catch (err) {
      context.commit('SET_ERROR', err.response)
    }
  },
}

export const mutations = {
  SET_USERDATA(state, body) {
    state.userData = body
  },
  SET_ERROR(state, body) {
    state.error = body
  },
}

export const getters = {
  getUser: (state) => {
    return state.userData
  },
}
