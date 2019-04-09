/*
  This Vuex store module manages game state
*/

// Module state
const state = {
  currentTone: '',
};

// Mutations
const mutations = {
  // Updates the last played tone
  updateCurrentTone: (state, currentTone) => {
    state.currentTone = currentTone;
  },
};

// Actions
const actions = {
  // Plays or pauses the Tone.js timeline

};

// Export store module
export default {
  state,
  mutations,
  actions,
};
