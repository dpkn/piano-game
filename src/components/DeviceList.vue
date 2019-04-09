<template>
    <section id="device-list">
        <b>
          <p v-show="devices.length === 1">Connected MIDI Keyboard:</p>
          <p v-show="devices.length > 1">Select a MIDI Keyboard:</p>
        </b>
        <div class="container">
          <div v-for="device in devices" :key="device.id">
              <input type="radio" v-model="activeDevice" :value="device.id" :id="'device-'+device.id">
              <label :for="'device-'+device.id">

            {{ device.manufacturer }} {{ device.name }}</label>
          </div>

          <div id="no-midi" v-show="!devices.length">
            <h3>No MIDI devices available</h3>
            <p v-show="browserSupportsMidiAccess">There are no MIDI devices available. Make sure your keyboard is plugged in and turned on.</p>
            <p v-show="!browserSupportsMidiAccess">Your browser does not support MIDI access. Make sure you are using Chrome version 43 or above.</p>
          </div>
        </div>

    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DeviceList',
  computed: {
    ...mapState({
      devices: state => state.midiDevices.devices,
      browserSupportsMidiAccess: state => state.midiDevices.browserSupportsMidiAccess,
    }),
    activeDevice: {
      get() {
        return this.$store.state.midiDevices.activeDevice;
      },
      set(value) {
        this.$store.commit('setActiveDevice', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/settings.scss";
.container{
  margin-bottom: 30px;
  background: $accent-light;
  border:1px solid $accent-dark;
  border-left: none;
  border-right: none;
}
#no-midi{
  padding: 30px 40px;
}

label{
  display: block;
  border-bottom:1px solid $accent-dark;
  padding: 20px;
  transition: background 0.3s;
}
input[type="radio"]{
  display: none;
}
input[type="radio"]:checked+label{
  background: $accent-dark;
  font-weight: bold;
}
</style>
