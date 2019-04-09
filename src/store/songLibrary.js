/*

 This Vuex store module contains the songs the application can play and relevant actions such as loading the current song
 */

import axios from 'axios';

// Module state
const state = {
  songs: {
    1: {
      title: 'Ode to Joy',
      level: 0,
      description: 'Fun song!!',
      fileName: 'ode-to-joy.json',
    },
  },
  activeSong: {
    songId: 0,
    songFile: {},
  },
  filePathPrefix: 'static/songs/',
};

const mutations = {
  setSongId: (state, songId) => {
    state.activeSong.songId = songId;
  },
  setSongFile: (state, songFile) => {
    state.activeSong.songFile = songFile;
  },
};

// Actions
const actions = {
  // Imports .json containing the song and adds it to the store.
  loadSong({ commit, state }, songId) {
    return new Promise((resolve, reject) => {
      // Check if song exists
      if (state.songs[songId]) {
        const filePath = `${state.filePathPrefix}${state.songs[songId].fileName}`;

        axios.get(filePath)
          .then((response) => {
            commit('setSongId', songId);
            commit('setSongFile', response.data);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject(new Error(`Could not find song with id ${songId}`));
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
