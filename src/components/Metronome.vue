<template>
    <section>
    <!--  <input type="checkbox" id="metronomeSwitch" v-model="checked">
      <label for="metronomeSwitch">Metronome</label>-->
    </section>
</template>

<script>
import Tone from 'tone';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Metronome',
  data() {
    return {
      currentBeat: 0,
      checked: 0,
      metronome: {},
    };
  },
  created() {
    const that = this;
    // TODO: Replace with 2x addplayer with addPlayers function
    this.addPlayer({
      name: 'woodblockHigh',
      player: new Tone.Player('static/metronome/high.wav').toMaster(),
    });
    this.addPlayer({
      name: 'woodblockLow',
      player: new Tone.Player('static/metronome/low.wav').toMaster(),
    });
    // TODO: Put this in Vuex store, not local
    this.metronome = Tone.Transport.scheduleRepeat((time) => {
      const beat = parseInt(Tone.Transport.position.split(':')[1]);
      that.currentBeat = beat;
      if (beat === 0) {
      //  that.players.woodblockLow.start(time)
      } else {
      //  that.players.woodblockHigh.start(time)
      }
    }, '4n');
  },
  methods: {
    ...mapMutations(['addPlayer']),
    ...mapActions(['addPlayers']),
    cancelMetronome() {
      this.metronome.cancel();
    },
  },
  computed: {
    ...mapState({
      players: state => state.instruments.players,
    }),
  },
};
</script>

<style scoped>
</style>
