// Import libraries
import Vue from 'vue';
import Vuex from 'vuex';

// Import store modules
import songLibrary from './songLibrary';
import midiDevices from './midiDevices';
import instruments from './instruments';
import time from './time';
import timeline from './timeline';

// Import game modules
import game from './game';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    songLibrary,
    midiDevices,
    instruments,
    time,
    timeline,
    game,
  },
  state: {
    metronome: {
      volume: 0.5,
      on: false,
    },
  },
  mutations: {
  },
  actions: {
  },
});
