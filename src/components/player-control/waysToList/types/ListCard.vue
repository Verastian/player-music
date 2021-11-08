<template>
  <div>
    <list-track :class="overflowY?'styleOverflow':''"  >
      <!-- https://stackoverflow.com/questions/63567129/scrollable-card-content-with-vuetify -->
      <template v-slot:default="slotProps">
        <!--  v-mutate.once="() => onMutate('card1')" -->
        <v-card
          :style="{ backgroundColor: randomColor(slotProps.i) }"
          dark
          class="rounded-r-pill"
        >
          <div class="d-flex justify-space-between my-3">
            <div>
              <v-card-title
                class="text-h5"
                v-text="slotProps.track.title"
              ></v-card-title>

              <v-card-subtitle
                v-text="slotProps.track.artist"
              ></v-card-subtitle>

              <v-card-actions class="ma-0 pa-0">
                <v-btn
                  @click="playSelf(1, slotProps.i)"
                  class="ml-2"
                  fab
                  icon
                  height="45px"
                  right
                  width="45px"
                  F
                >
                  <v-icon>mdi-play</v-icon>
                </v-btn>
                <div
                  v-if="slotProps.i === currentIndex"
                  class="d-flex align-center px-2 ma-0"
                >
                  <svg-wave-icon :key="componentKey" />
                </div>
              </v-card-actions>
            </div>

            <div class="posRelative">
              <v-avatar class="ma-3" size="125">
                <v-img :src="slotProps.track.img"> </v-img>
              </v-avatar>
                <v-progress-circular
                 v-if="slotProps.i === currentIndex"
                  :rotate="180"
                  :size="130"
                  :width="5"
                  :value="trackProgress"
                  color="white"
                  class="posAbsolute"
                >
                  <span class="font-weight-bold white--text">{{ trackProgress }}%</span>
                </v-progress-circular>
            </div>

          </div>
        </v-card>
      </template>
    </list-track>
  </div>
</template>

<script>
import ListTrack from "../ListTrack.vue";
import SvgWaveIcon from "../../complements/SvgWaveIcon.vue";
import { mapState } from "vuex";
export default {
  name: "list-card",
  props: {
    selectedTrack: {
      type: Number,
    },
    currentIndex: {
      type: Number,
    },
    trackProgress:{
        type:String,
        default:'0',
    },
  },
  components: {
    ListTrack,
    SvgWaveIcon,
  },
  data() {
    return {
      colorCache: {},
      opacity: 0.5,
      currentPlaying: false,
      componentKey: 0,

     /*  interval: {},
      value: 0, */
    };
  },
  computed: {
    ...mapState(["playlist"]),

    overflowY() {
      return this.playlist.length > 5;
    },
    /*  generator(){
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      } */
  },
  methods: {
    playSelf(onPlay, index) {
      this.$emit("playSelf", { onPlay, index });
    },
    randomColor(id) {
      //https://stackoverflow.com/questions/44024266/vue-js-random-color-appended-to-user-list-everytime-page-is-reloaded
      //https://programmerclick.com/article/9581544733/
      const r = () => Math.floor(180 * Math.random());

      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgba(${r()}, ${r()}, ${r()},${this.opacity})`)
      );
    },
    forceRerender() {
      this.componentKey += 1; //https://michaelnthiessen.com/force-re-render/////https://qastack.mx/programming/32106155/can-you-force-vue-js-to-reload-re-render
    },
  },
  /* https://learnvue.co/2019/12/an-overview-of-vue-keep-alive/ */
  deactivated() {
    console.log("Deactivated!");
  },

  activated() {
    console.log("Activated!");
    this.forceRerender();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
   /*  this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000); */
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
.posRelative{
  position:relative;
}
.posAbsolute{
  position:absolute;
  left: -6px;
  top: -6px;
  z-index: 1;
}
</style>
