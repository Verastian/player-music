<template>
  <div>
    <ul>
      <li v-for="(track, i) in listTracks" :key="i">
        <slot :track="track" :i="i" :listTracks="listTracks"></slot>
        <!-- {{track.title}} -->
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters } from "vuex";
export default {
  name: "list-track",
  data() {
    return {
     
    };
  },
  computed: {
    ...mapGetters(["listTracks"]),
  },
  created() {
    
    this.listTracks;
    console.log(this.listTracks);
  },
};
</script>

<style>
</style>