<template>
  <section id="welcome-screen">
    <div class="bg"></div>
    <WelcomeModal></WelcomeModal>

  </section>
</template>

<script>
import WelcomeModal from './WelcomeModal.vue';

export default {
  name: 'WelcomeScreen',
  data() {
    return {
      colors: [
        '#FF5F99', '#C940EA', '#665FFF', '#5773FF', '#3598FE', '#3BCDE2',
      ],
      bgScene: {},
    };
  },
  components: {
    WelcomeModal,
  },
  methods: {

  },
  mounted() {
    /* this.bgScene = new Paper.Project('welcome-canvas')

    var circles = []
    for (var i = 0; i < 10; i++) {
      this.colors.forEach(function (color) {
        // Create a point whose x is between 0 and 50,
        // and y is between 0 and 100
        var point = new Paper.Point(Paper.view.size.width, Paper.view.size.height).multiply(Paper.Point.random())
        let circle = new Paper.Path.Rectangle(point, 90)
        circle.fillColor = color
        circles.push(circle)
      })
    }

    Paper.view.onFrame = function (event) {
      circles.forEach(function (circle, index) {
      //  var speed = Math.floor(Math.random() * 5)
        console.log(event)
        circle.rotate(index / 4 + 1)
      })
    }

    var rect = new Paper.Path.Rectangle({
      point: [0, 0],
      size: [Paper.view.size.width, Paper.view.size.height],
      selected: true
    })
    rect.sendToBack()
    rect.fillColor = '#FF9056' */
  },
  destroyed() {
    // this.bgScene.clear()
  },
};
</script>

<style lang="scss">

@import "../styles/settings.scss";

#welcome-screen,#welcome-canvas{
  width: 100%;
  height: 100%;
  top:0;
  background: $color-g;
}
.bg{
  background-image: url("../../static/bg/bg-01.svg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
