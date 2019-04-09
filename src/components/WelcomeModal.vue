<template>
    <section id="welcome-modal">
        <h1>Pianio</h1>
        <p>Learn how to play piano in a way that is actually fun, by using your MIDI-USB keyboard right in the browser.</p>
<hr/>
          <DeviceList></DeviceList>

        <router-link tag="button" id="start-game" :disabled="!activeDevice" @click.native="resumeAudioContext" :to="{ name: 'Song', params: { id: 1, name: 'ode-to-joy' }}">Start</router-link>
    </section>
</template>

<script>
import Tone from 'tone';
import { mapState } from 'vuex';
import DeviceList from './DeviceList';

export default {
  name: 'WelcomeModal',
  components: {
    DeviceList,
  },
  methods: {
    // After user interaction with page, resume AudioContext. Some browsers mute AudioContext until user interaction
    resumeAudioContext() {
      Tone.context.resume().then(() => {
        console.log('Playback resumed successfully');
      });
    },
  },
  computed: {
    ...mapState({
      activeDevice: state => state.midiDevices.activeDevice,
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/settings.scss";

p{
  padding: 0 40px;
}
#welcome-modal{
   @include center(both);
   background: $background-light;
   border-radius: $global-radius-large;
   text-align: center;
    max-width: 450px;
}
h1{
   font-size: 4em;
   margin: 30px 0;
}
#start-game{
  width: 100%;
  background: $background-dark;
  color:$font-color-light;
  font-size: 1.6em;
  font-weight: bold;
  text-decoration: none;
  padding: 15px;
  border: none;
  appearance:none;
  border-radius:0 0 $global-radius-large $global-radius-large;
  outline:none;
  transition: background 0.3s;
  display:block;
  box-sizing: border-box;

}
#start-game:hover{
  background: $background-extra-dark;
}
#start-game:disabled{
  background:$background-light;
}
</style>
