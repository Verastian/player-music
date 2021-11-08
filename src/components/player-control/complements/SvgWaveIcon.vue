<template>
  <div>
    <div v-show="turnOnWave">
      <svg width="50" height="50" viewBox="0 6 55 55">
        <line
          x1="50"
          y1="34"
          x2="50"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        >
          <animate
            id="r1"
            attributeType="XML"
            attributeName="y1"
            values="34;10;34"
            dur="1s"
            begin="0s;r5.end-.8s"
          />
          <animate
            id="r1"
            attributeType="XML"
            attributeName="y2"
            values="36;60;36"
            dur="1s"
            begin="0s;r5.end-.8s"
          />
        </line>
        <!-- ************************************* -->
        <line
          x1="40"
          y1="34"
          x2="40"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        >
          <animate
            id="r2"
            attributeType="XML"
            attributeName="y1"
            values="34;10;34"
            dur="1s"
            begin="r1.end-.8s"
          />
          <animate
            id="r1"
            attributeType="XML"
            attributeName="y2"
            values="36;60;36"
            dur="1s"
            begin="r1.end-.8s"
          />
        </line>
        <!-- ************************************* -->
        <line
          x1="30"
          y1="34"
          x2="30"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        >
          <animate
            id="r3"
            attributeType="XML"
            attributeName="y1"
            values="34;10;34"
            dur="1s"
            begin="r2.end-.8s"
          />
          <animate
            id="r1"
            attributeType="XML"
            attributeName="y2"
            values="36;60;36"
            dur="1s"
            begin="r2.end-.8s"
          />
        </line>
        <!-- ************************************* -->
        <line
          x1="20"
          y1="34"
          x2="20"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        >
          <animate
            id="r4"
            attributeType="XML"
            attributeName="y1"
            values="34;10;34"
            dur="1s"
            begin="r3.end-.8s"
          />
          <animate
            id="r1"
            attributeType="XML"
            attributeName="y2"
            values="36;60;36"
            dur="1s"
            begin="r3.end-.8s"
          />
        </line>
        <!-- ************************************* -->
        <line
          x1="10"
          y1="34"
          x2="10"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        >
          <animate
            id="r5"
            attributeType="XML"
            attributeName="y1"
            values="34;10;34"
            dur="1s"
            begin="r4.end-.8s"
          />
          <animate
            id="r1"
            attributeType="XML"
            attributeName="y2"
            values="36;60;36"
            dur="1s"
            begin="r4.end-.8s"
          />
        </line>
        <!-- ************************************* -->
      </svg>
    </div>
    <div v-show="!turnOnWave">
      <svg width="45" height="45" viewBox="0 6 55 55">
        <line
          x1="50"
          y1="34"
          x2="50"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        ></line>
        <!-- ************************************* -->
        <line
          x1="40"
          y1="34"
          x2="40"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        ></line>
        <!-- ************************************* -->
        <line
          x1="30"
          y1="34"
          x2="30"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        ></line>
        <!-- ************************************* -->
        <line
          x1="20"
          y1="34"
          x2="20"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        ></line>
        <!-- ************************************* -->
        <line
          x1="10"
          y1="34"
          x2="10"
          y2="36"
          stroke="#fff"
          stroke-width="4"
          stroke-linecap="round"
        ></line>
        <!-- ************************************* -->
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "svg-wave-icon",
  props: {},
  data() {
    return {
      //showWave:false,
    };
  },
  computed: {
    ...mapState(["isPlaying"]),
    turnOnWave() {
      return this.isPlaying;
    },
  },
};
</script>

<style>
/* svg {
  background-color: #333333;
} */
</style>
