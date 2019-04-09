<template>
<div id="app">
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import 'normalize.css';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  mounted() {
    this.requestMIDIAccess();
  },
  methods: {
    ...mapActions(['requestMIDIAccess']),
  },
};
</script>

<style lang="scss">
@import "styles/settings.scss";

#app,
body,
html {
    width: 100%;
    height: 100%;
    background: $background-light;
    font-family: $font-stack;
}
hr {
    border: none;
    height: 1px;
    background: $accent-light;
    width: 80%;
    margin: 30px auto;
}

// Router transition
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
/* .fade-leave-active below version 2.1.8 */
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
