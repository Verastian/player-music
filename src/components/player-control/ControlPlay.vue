<template>
  <v-row no-gutters>
    <v-col sm="12" md="12" class="">
      <v-sheet
        class="d-flex justify-space-around align-center"
        outlined
        color="indigo"
        rounded="pill"
      >
        <v-btn large icon @click="randomPlay()">
          <v-icon :class="random ? 'blue--text' : 'white--text'">
            mdi-shuffle
          </v-icon>
        </v-btn>
        <v-card
          class="d-flex justify-center align-center"
          rounded="pill"
          outlined
        >
          <v-btn
            class="ma-2"
            outlined
            fab
            color="indigo"
            @click="nextOrPrev('prev')"
            ><v-icon>mdi-skip-previous</v-icon></v-btn
          >
          <v-btn
            class="ma-2"
            outlined
            fab
            color="indigo"
            @click="soundControl(3)"
            ><v-icon>mdi-pause</v-icon></v-btn
          >
          <v-btn
            class="ma-2"
            outlined
            large
            fab
            color="indigo"
            @click="soundControl(1)"
            ><v-icon>mdi-play</v-icon></v-btn
          >
          <v-btn
            class="ma-2"
            outlined
            fab
            color="indigo"
            @click="soundControl(2)"
            ><v-icon>mdi-stop</v-icon></v-btn
          >
          <v-btn
            class="ma-2"
            outlined
            fab
            color="indigo"
            @click="nextOrPrev('next')"
            ><v-icon>mdi-skip-next</v-icon></v-btn
          ></v-card
        >

        <v-btn icon large @click="playLoop()">
          <v-icon :class="loop ? 'blue--text' : 'white--text'">
            mdi-repeat-once
          </v-icon>
        </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "control-play",
  props:{
      loop:{
          type:Boolean,
          default:false
      },
      random:{
          type:Boolean,
          default:false
      },
  },
  data() {
    return {};
  },
  methods: {
    playLoop() {
        this.$emit('playLoop');
    },
    randomPlay() {
        this.$emit('randomPlay');
    },
    nextOrPrev(prevOrNext) {
        this.$emit('nextOrPrev',prevOrNext)
    },
    soundControl(ele) {
        this.$emit('soundControl',ele)
    },
  },
};
</script>

<style>
</style>