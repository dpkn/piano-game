/*
  This Vuex store module manages and stores midiAccess.
  It adds all available MIDI devices to the store and marks active devices.
*/

// TODO: Add support for output devices as well, currently only maps input
// TODO: Do something on state change

import Tone from 'tone';

// Module state
const state = {
  browserSupportsMidiAccess: false,
  activeDevice: 0,
  //  devices: [{id: 1, name: 'Test Device', manufacturer: 'BEHRINGER', type: 'input'}]
  devices: [],
};

// Mutations
const mutations = {
  setMidiAccessSupport: (state, supportsAccess) => {
    state.browserSupportsMidiAccess = supportsAccess;
  },
  addDevice: (state, device) => {
    state.devices.push(device);
  },
  setActiveDevice: (state, deviceId) => {
    state.activeDevice = deviceId;
  },
  setToneState: (state, payload) => {
    console.log(payload);
    state.devices[0].toneState[payload.tone] = payload.toneState;
  },
};

// Actions
const actions = {
  // Action to be called on page ready to request MIDI Access
  requestMIDIAccess({ state, dispatch }) {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(
        midiAccess => dispatch('midiAccessGranted', { midiAccess }),
        () => dispatch('midiAccessDenied'),
      );
    } else {
      dispatch('midiAccessDenied');
    }
  },
  // Action to be called when MIDI access is granted. Stores the devices and access.
  midiAccessGranted({ commit, dispatch }, payload) {
    const { midiAccess } = payload;
    let isFirstDevice = true;

    commit('setMidiAccessSupport', true);

    // Loop through all available input devices
    midiAccess.inputs.forEach((input, index) => {
      // Register callback handler for every MIDI event sent from device
      // input.onmidimessage = (midiMessage) => dispatch('handleMidiMessage', {midiMessage})
      input.onstatechange = midiStateChange => dispatch('handleMidiStateChange', { midiStateChange });

      const device = {
        id: input.id,
        active: true,
        state: input.state,
        manufacturer: input.manufacturer,
        name: input.name,
        type: 'input',
        object: input,
        toneState: {},
      };
      commit('addDevice', device);

      if (isFirstDevice) {
        commit('setActiveDevice', index);
        isFirstDevice = false;
      }
    });
  },
  // Action to be called when MIDI access is denied
  midiAccessDenied({ commit }) {
    commit('setMidiAccessSupport', false);
    console.error(new Error('Requesting MIDI access failed'));
  },
  // Action to be called every time a MIDI device emits a message
  handleMidiMessage({ commit }, payload) {
    const { midiMessage } = payload;
    const midiData = midiMessage.data;
    const device = midiMessage.currentTarget.id;
    let toneState;

    // If message is attack or release event
    if (midiData[0] >= 128 && midiData[0] <= 159) {
      const tone = Tone.Frequency(midiData[1], 'midi').toNote();
      const loudness = midiData[2] / 127;

      // If message is an attack event
      if (midiMessage[0] >= 144) {
        toneState = 'attack';
      } else {
        // If message is a release event
        toneState = 'release';
      }
      commit('setToneState', {
        tone, device, loudness, toneState,
      });
    }
    // TODO: Implement actions
  },
  // Action to be called every time a MIDI device changes its state, e.g. disconnection
  handleMidiStateChange({ commit }, payload) {
    const midiState = payload.midiStateChange;
    return midiState;
    // TODO: Implement actions
  },
};

// Export store module
export default {
  state,
  mutations,
  actions,
};
