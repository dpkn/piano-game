<template>
  <nav>
    <div id="nextNote">
      {{currentTone.substring(0,8 )}}
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'MainHeader',
  methods: {
    ...mapMutations(['playPause']),
    ...mapActions(['stop']),
  },
  computed: {
    bpm: {
      get() {
        return this.$store.state.time.bpm;
      },
      set(value) {
        this.$store.commit('setBPM', value);
      },
    },
    volume: {
      get() {
        return this.$store.state.master.volume;
      },
      set(value) {
        this.$store.commit('setVolume', value);
      },
    },
    ...mapState({
      songTitle: state => state.meta.title,
      playing: state => state.time.playing,
      beat: state => state.time.position.beats,
      bar: state => state.time.position.bars,
      currentTone: state => state.game.currentTone,
    }),
  },
};
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";

nav{
  width:100%;
  height: 50px;
  background: $background-dark;
  color:$font-color-light;
}
#nextNote{
  font-size: 3em;
  font-weight: bold;
  color: $font-color-dark;
  box-sizing: border-box;
  position: absolute;
  height: 80px;
  width: 80px;
  margin-top: -20px;
  margin-left: -20px;
  padding-left: 22px;
  padding-top: 15px;
   background-color: $background-light;
   border-radius: 50%;
   border:4px solid $background-dark;
}
</style>
