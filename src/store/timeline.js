/*
  This Vuex store module manages time
*/

// Module state
const state = {
  timelines: {},
};

// Mutations
const mutations = {
  // Add timeline to store
  addTimeline: (state, timeline) => {
    state.timelines.push(timeline);
  },
};

// Actions
const actions = {

};

// Export store module
export default {
  state,
  mutations,
  actions,
};
