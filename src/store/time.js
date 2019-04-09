/*
  This Vuex store module manages time
*/

import Tone from 'tone';

// Module state
const state = {
  playing: false,
  bpm: 120,
  timeSignature: '4/4',
  transport: {},
};

// Mutations
const mutations = {
  // Updates playing state
  setPlaying: (state, playing) => {
    state.playing = playing;
  },
};

// Actions
const actions = {
  // Plays or pauses the Tone.js timeline
  playPause: ({ state, commit }, playing) => {
    if (playing) {
      Tone.Transport.pause();
    } else {
      Tone.Transport.start();
    }
    commit('setPlaying', playing);
  },
  // TODO: remove this
  setPosition({ commit }, pos) {
    // Puts the position of the Tone.js transport in the store, doesn't affect actual position
    const position = pos.split(':');
    const bar = parseInt(position[0]);
    const beat = parseInt(position[1]);
    commit('setBeat', beat);
    commit('setBar', bar);
  },
  // Pauses the Tone.kjs timelijne
  stopTimeline({ commit }) {
    Tone.Transport.stop();
    commit('stop');
    commit('setBeat', 0);
  },
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
