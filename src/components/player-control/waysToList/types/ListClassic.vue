              <!-- :color="currentIndex === slotProps.i && selectedTrackInPlaylist === slotProps.i? 'yellow darken-3':'green'"-->
<template>
  <div>
    <v-card flat tile   color="rgb(0, 0, 0, 0.0)">
      <!-- https://www.it-swarm-es.com/es/vue.js/vuetify-v1.1-puedo-establecer-alguna-transparencia-para-el-color-de-la-tarjeta-v/806447464/ -->
      <list-track :class="overflowY?'styleOverflow':''" >
        <template v-slot:default="slotProps">

          <v-sheet
        outlined
        :color="colorItem"
        rounded="pill"
        class="my-5"
       
      >
          <v-list :rounded="true" color="rgb(0, 0, 0, 0.0)"  class="pa-0">
            <v-list-item-group
              mandatory
              v-model="selectedTrackInPlaylist"
            >
              <v-list-item
                :color="
                  currentIndex === slotProps.i ? 'yellow darken-3' : 'green'
                "
                @click="selectedTrackFromList(slotProps.i)"
                @dblclick.prevent="playTrackFromList(slotProps.i)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ slotProps.i + 1 }} {{ slotProps.track.artist }} -
                    {{ slotProps.track.title }}</v-list-item-title
                  >
                </v-list-item-content>
                <v-spacer></v-spacer>

                {{ slotProps.track.howl.duration() | minutes }}
                <v-list-item-action>
                  <v-icon
                    v-if="!slotProps.track.selected"
                    class="ml-2"
                    @click="addFavoritesPlay(slotProps.track)"
                  >
                    mdi-heart-outline
                  </v-icon>

                  <v-icon
                    v-else
                    class="ml-2"
                    color="red ligthen-1"
                    @click="removeFavoritesPlay(slotProps.track)"
                  >
                    mdi-heart
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          </v-sheet>
        </template>
      </list-track>
    </v-card>
  </div>
</template> 
<script>
import ListTrack from "../ListTrack.vue";
import { mapState} from "vuex";
export default {
  name: "list-classic",
  props: {
    selectedTrack: {
      type: Number,
    },
    currentIndex: {
      type: Number,
    },
  },
  components: {
    ListTrack,
    /* overflowY:false */
  },
  data() {
    return {
      selectedTrackInPlaylist: 0,
    };
  },
  computed: {
     ...mapState(["playlist"]),

overflowY(){
  return this.playlist.length > 10;
},
colorItem(){
  return 'background:linear-gradient(to right #d1dce1,#002b3f );'
}
  },
  methods: {
    
    selectedTrackFromList(track) {
      this.$emit("selectedTrackFromList", track);
    },

    playTrackFromList(track) {
      this.$emit("playTrackFromList", track);
    },
    removeFavoritesPlay(track) {
      this.$emit("removeFavoritesPlay", track);
    },
    addFavoritesPlay(track) {
      this.emit("addFavoritesPlay", track);
    },
  },
  watch: {
  },
  created() {
    this.playlist;
    console.log(this.playlist)
  },
};
</script>

<style>
li {
  list-style: none;
}
</style>