<template>
  <section id="song-screen">
    <MainHeader></MainHeader>
    <Metronome></Metronome>
    <canvas id="game-canvas"></canvas>
  </section>
</template>

<script>
/* eslint no-unused-vars: 0 */


import { mapMutations, mapActions, mapState } from 'vuex';

import Vue from 'vue';
import Tone from 'tone';
import Paper from 'paper';

import axios from 'axios';
import styles from '../styles/settings.scss';
import Metronome from './Metronome';
import MainHeader from './MainHeader';
import router from '../router';

export default {
  name: 'SongScreen',
  data() {
    return {
      gameCanvas: {},
      naturalNotes: [
        'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5',
      ],
      noteBars: {},
      player: {},
      pipes: {},
      gravity: 200,
      velocity: 0,
      colors: {
        A: '#FF9056',
        B: '#FF5F99',
        C: '#C940EA',
        D: '#665FFF',
        E: '#5773FF',
        F: '#3598FE',
        G: '#3BCDE2',
      },
      toneState: {},
    };
  },
  components: {
    MainHeader,
    Metronome,
  },
  mounted() {
    // Set up a synth to play user input
    /* this.addSynth({
      name: 'playerSynth',
      synth: new Tone.PolySynth(8, Tone.Synth).toMaster()
    }) */

    // Set up Canvas element with Paper
    this.gameCanvas = new Paper.Project('game-canvas');

    this.setupBG();
    this.createPlayer();

    this.gameCanvas.view.onFrame = this.drawFrame;

    this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
    this.$store.state.midiDevices.devices[0].object.onmidimessage = this.handleMidiMessage;

    this.loadSong(this.$route.params.id).then(() => {
      this.createPipes();
      this.playPause(true);
    }).catch((reason) => {
      // If the song couldn't be loaded, route back to home
      console.error(reason);
    //  router.push('/')
    });
  },
  computed: {
    ...mapState({
      playing: state => state.time.playing,
      synths: state => state.instruments.synths,
      song: state => state.songLibrary.activeSong,
      devices: state => state.midiDevices.devices,
    }),
  },
  watch: {
    toneState() {

    },
  },
  methods: {
    ...mapMutations(['addSynth']),
    ...mapActions(['playPause', 'loadSong']),
    handleMidiMessage(e) {
      // if the midi input is a release or attack message

      if (e.data[0] >= 128 && e.data[0] <= 159) {
        const tone = Tone.Frequency(e.data[1], 'midi').toNote();
        const loudness = e.data[2] / 127;

        if (e.data[0] >= 144) {
          this.synth.triggerAttack(tone, undefined, loudness);
          this.toneState[tone] = 'attack';
          this.playerToNote(tone);
        } else {
          this.synth.triggerRelease(tone);
          //  this.$store.commit('setToneState', {tone, toneState: 'release'})
          this.toneState[tone] = 'release';
        }
      }
    },
    // This setups the BG of the scene with note guidelines
    setupBG() {
      // The size of a Note guideline
      const noteBarSize = new Paper.Size(Paper.view.size.width, 80);
      const noteBarPosition = new Paper.Point(0, 0);

      const that = this;

      // Draw octaves with only natural notes (a,b,c,d...) and create a guideline with letter for each
      this.naturalNotes.reverse().forEach((note) => {
        const rectangle = new Paper.Rectangle(noteBarPosition, noteBarSize);
        const noteBar = new Paper.Path.Rectangle(rectangle);

        noteBar.strokeColor = '#E4E4E4';
        noteBarPosition.y += noteBarSize.height;
        noteBar.center = rectangle.center.y;
        noteBar.top = rectangle.top;
        noteBar.bottom = rectangle.bottom;

        // that.noteBars.push(noteBar)
        that.$set(that.noteBars, note, noteBar);
        const textPosition = new Paper.Point(20, noteBar.center + 10);

        const noteText = new Paper.PointText({
          point: textPosition,
          content: note,
          fillColor: '#E4E4E4',
          fontFamily: 'Open Sans',
          fontSize: 25,
        });
      });

      const playerGuideline = new Paper.Path({
        segments: [[100, 0], [100, Paper.view.size.height]],
        strokeColor: '#E4E4E4',
      });

      this.gameCanvas.view.draw();
    },
    createPlayer() {
      this.player = new Paper.Path.Circle(new Paper.Point(100, 400), 25);
      this.player.fillColor = '#2A2E43';
    },
    playerToNote(note) {
      this.player.position = new Paper.Point(100, this.noteBars[note].center);
    },
    pianoIsBeingAttacked() {
      let pianoBeingAttacked = false;

      const { toneState } = this;

      Object.keys(toneState).forEach((tone) => {
        if (toneState[tone] === 'attack') {
          pianoBeingAttacked = true;
        }
      });

      return pianoBeingAttacked;
    },
    drawFrame(e) {
      if (this.playing === true) {
        if (this.pianoIsBeingAttacked()) {
          // console.log(Tone.TransportTime().toMilliseconds())
        } else {
          this.player.position.y += this.gravity * e.delta;

          if (this.player.position.y > Paper.view.size.height) {
            this.player.position.y = Paper.view.size.height;
            this.velocity = 0;
          }
        }

        this.pipes.position.x -= e.delta * 200;
      }
    },
    createPipes() {
      this.pipes = new Paper.Group();
      const that = this;

      // Create a pipe for each note of the song
      this.song.songFile.tracks[0].notes.forEach((noteOb, index) => {
        const note = noteOb.name;
        const noteBarTop = that.noteBars[note].top;
        const noteBarBottom = that.noteBars[note].bottom;
        const pipeX1 = (500 + index * 200);
        const pipeX2 = pipeX1 + 40;

        const borderRadius = new Paper.Size(10);
        const baseRectangle = new Paper.Rectangle([100, 100], borderRadius);

        const topPipe = new Paper.Path.Rectangle({
          from: [pipeX1, 0],
          to: [pipeX2, noteBarTop],
          fillColor: that.colors[note.substring(0, 1)],
        });
        const bottomPipe = new Paper.Path.Rectangle({
          from: [pipeX1, noteBarBottom],
          to: [pipeX2, Paper.view.size.height],
          fillColor: that.colors[note.substring(0, 1)],
        });
        that.pipes.addChild(topPipe);
        that.pipes.addChild(bottomPipe);
      });
    },
  },
};
</script>

<style lang="scss">
  #song-screen,#game-canvas{
    width: 100%;
    height: 100%;
  }
</style>
