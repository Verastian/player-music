<template>
  <v-row>
          <v-col class="d-flex align-center">
            <v-icon
              v-if="!stateMute && volume > 20 && volume < 80"
              @click="mute(true)"
              x-large
            >
              mdi-volume-medium
            </v-icon>
            <v-icon
              v-else-if="!stateMute && volume >= 80"
              @click="mute(true)"
              x-large
              >mdi-volume-high
            </v-icon>
            <v-icon
              v-else-if="!stateMute && volume <= 20"
              @click="mute(true)"
              x-large
              >mdi-volume-low
            </v-icon>
            <v-icon v-else @click="mute(false)" x-large>mdi-volume-off </v-icon>

            <v-slider
              v-model="volume"
              @input="updateVolume(volume)"
              hide-details
              thumb-label
              thumb-color="indigo"
            ></v-slider>
          </v-col>
        </v-row>
</template>

<script>
import {  Howler } from "howler";
export default {
    name:'control-volume',

    props:{
        stateMute:{
            type:Boolean,
            default:false,
        }
    },
data(){
    return{
        volume: 50,
    }
},
methods:{
    mute(op){
        this.$emit('mute',op);
    },
    updateVolume() {
      Howler.volume(this.volume / 100);
      //console.log(this.volume)
    },
},
 created() {
    this.updateVolume();
 
  },
}
</script>

<style>

</style>