<template>
  <div>
      <h1>Slide list</h1>
    <list-track>
         <template v-slot:default="slotProps">
        <span>{{ slotProps.track.title }}&nbsp;</span>
        <br />
        </template>
    </list-track>
  </div>
</template>

<script>
import ListTrack from "../ListTrack.vue";
export default {
    name:'list-slide',
  components: {
    ListTrack,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>