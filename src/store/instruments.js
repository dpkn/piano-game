/*
  This Vuex store module manages and stores Tone.js instruments
*/

// TODO: Implement samplers
import Vue from 'vue';
import Tone from 'tone';

// Module state
const state = {
  buffer: {
    status: 0,
  },
  synths: {},
  players: {},
  samplers: {},
};

// Mutations
const mutations = {
  // Add a Tone.js player to the store
  addPlayer: (state, payload) => {
    Vue.set(state.players, payload.name, payload.player);
  },
  // Add a Tone.js synth to the store
  addSynth: (state, payload) => {
    Vue.set(state.synths, payload.name, payload.synth);
  },
  // Update the buffer status
  setBufferStatus: (state, status) => {
    state.buffer.status = status;
  },
};

// Actions
const actions = {

  // Loads a list of files into Tone.js players
  loadPlayers({ commit, state }, files) {
    Tone.Buffer.on('progress', (progress) => {
      commit('setBufferStatus', progress);
    });
    Tone.Buffer.on('loaded', () => {
      commit('setBufferStatus', 1);
    });

    files.forEach((file) => {
      const player = new Tone.Player(file.url).toMaster();

      const loaded = false;

      commit('addPlayer', { name, player, loaded });
    });
  },
};

// Export store module
export default {
  state,
  mutations,
  actions,
};
