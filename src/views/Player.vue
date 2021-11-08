<template>
  <div class="player ">
    <div class="container my-10" >
      <v-row>
        <v-col cols="12" md="6">
          <v-spacer></v-spacer>
          <sound-view
            :tracks="tracks"
            :changeImg="changeImg"
            :getTrackInfo="getTrackInfo"
          />
          <v-spacer></v-spacer>
          <control-progress
            @updateSeek="updateSeek"
            :trackProgress="trackProgress"
          />
          <v-spacer></v-spacer>
          <control-volume :stateMute="stateMute" @mute="mute" />
          <v-spacer></v-spacer>
          <!-- Control Play List-->
          <control-play
            @playLoop="playLoop"
            :loop="loop"
            @randomPlay="randomPlay"
            :random="random"
            @nextOrPrev="nextOrPrev"
            @soundControl="soundControl"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-bottom-navigation
            v-model="value"
            :background-color="color"
            dark
            shift
            class="d-flex justify-space-between"
          >
    
              <v-btn
                v-for="(list, i) in lists"
                :key="i"
                :class="['list-button', { active: currentList === list.name }]"
                v-on:click.prevent="currentList = list.name"
              >
                <span>{{ list.name }}</span>
                <v-icon>{{ list.icon }}</v-icon>
              </v-btn>
    
    
              <v-btn @click="$router.push('/')">
               <span>Exit</span>
               <v-icon>mdi-open-in-new</v-icon>
               </v-btn>
    
          </v-bottom-navigation>
          <keep-alive>
            <transition name="component-fade" mode="out-in">
              <component
                :trackProgress="trackProgress"
                :is="currentListComponent"
                :selectedTrack="selectedTrack"
                :currentIndex="currentIndex"
                @selectedTrackFromList="selectedTrackFromList"
                @playTrackFromList="playTrackFromList"
                @removeFavoritesPlay="removeFavoritesPlay"
                @addFavoritesPla="addFavoritesPlay"
                @playSelf="playSelf"
              >
              </component>
            </transition>
          </keep-alive>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { Howl, Howler } from "howler";
import ControlPlay from "../components/player-control/ControlPlay.vue";
import SoundView from "../components/player-control/SoundView.vue";
import ControlProgress from "../components/player-control/ControlProgress.vue";
import ControlVolume from "../components/player-control/ControlVolume.vue";
import CardList from "../components/player-control/waysToList/types/ListCard.vue";
import ClassicList from "../components/player-control/waysToList/types/ListClassic.vue";
import SlideList from "../components/player-control/waysToList/types/ListSlide.vue";

Vue.component("list-card", CardList);
Vue.component("list-classic", ClassicList);
Vue.component("list-slide", SlideList);
export default {
  components: {
    ControlPlay,
    SoundView,
    ControlProgress,
    ControlVolume,
  },
  data() {
    return {
      currentList: "card",
      lists: [
        { name: "classic", icon: "mdi-format-list-bulleted" },
        { name: "card", icon: "mdi-table" },
        { name: "slide", icon: "mdi-television-play" },
      ],

      tracks: [],
      loop: false,
      random: false,
      model: null,
      selectedTrack: null,
      index: 0,
      currentIndex: 0,
      seek: 0,
      stateMute: false,

      favorites: false,
      indexFavorites: [],
      playFavoritesList: false,
      trackObj: {},
      //context: null,
      listTracksObject: [],
      value: 1,

      changeImg: {
        backgroundImage:
          'url(" http://localhost:8080/img/A_Little_Bit_of_Rhythm.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
    };
  },
  computed: {
    ...mapState(["playlist", "isPlaying"]),
    ...mapGetters(["listTracks"]),

    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },

    currentListComponent() {
      return "list-" + this.currentList.toLowerCase();
    },

    currenttrack() {
      return this.tracks[this.index].howl;
    },

    getTrackInfo() {
      let seek = this.seek,
        duration = this.currenttrack.duration();
      ////console.log(duration);
      return { seek, duration };
    },
    progress() {
      return this.seek / this.currenttrack.duration();
    },
    trackProgress() {
      return (this.progress * 100).toFixed();
    },
  },
  methods: {
    ...mapActions(["getPlaylist", "getIsPlaying"]),
    createObjectForEachTrack() {
      //console.log(this.listTracks);
      this.listTracks.forEach((track) => {
        track.howl = new Howl({
          src: [` http://localhost:8080/playlist/${track.title}.mp3`],
          volume: 0.5,
          loop: this.loop,
          onplay: () => {
            this.itIsPlaying(track.howl._src);
            //console.log(track.howl._src);
            this.dinamicChangeImg();

            //*************************************************** */
          },
          onend: () => {
            if (this.loop) {
              this.currenttrack.play();
            } else if (this.random) {
              this.randonPlaying();
            } else {
              this.nextOrPrev("next");
            }
            this.getIsPlaying(false);

            //this.gainNode.gain.setValueAtTime(0, Howler.ctx.currentTime);
          },
        });
        this.tracks.push(track);
      });
      //console.log(this.tracks);
    },
    /* **************************** */
    playSelf(listCard) {
      console.log(listCard.onPlay);
      console.log(listCard.index);
      this.selectedTrack = listCard.index;
      this.soundControl(listCard.onPlay);
    },
    /* **************************** */
    dinamicChangeImg() {
      /* ***************************************************************** */

      this.changeImg.backgroundImage = `url(${this.tracks[this.index].img})`;
    },
    /* ************************** */
    randomPlay() {
      if (this.loop) {
        return;
      }
      this.random = !this.random;
    },
    /* ************************** */
    mute(state) {
      //console.log(state);
      Howler.mute(state);
      this.stateMute = !this.stateMute;
    },
    /* ************************** */
    playLoop() {
      if (this.random) {
        return;
      }
      this.loop = !this.loop;
      //console.log(this.loop);
    },
    /* ************************* */
    randonPlaying() {
      let index = Math.round(Math.random() * (this.tracks.length - 1));
      //console.log(this.selectedTrack);
      //console.log(index);
      if (index >= 0 && index < this.tracks.length) {
        if (index === this.selectedTrack) {
          index = Math.round(Math.random() * (this.tracks.length - 1));
          this.playTrack();
        }
        this.selectedTrack = index;
        this.playTrack();
      }
    },
    /* ************************* */
    updateSeek(changeSeek) {
      //console.log(changeSeek);
      let track = this.currenttrack;
      if (this.isPlaying) {
        track.seek((track.duration() / 100) * changeSeek);
      }
    },
    inervalSeek() {
      let updateSeek = setInterval(() => {
        this.seek = this.currenttrack.seek();
        //
      }, 250);
      console.log(updateSeek);
    },
    /* ************************* */
    soundControl(option) {
      if (option === 1) {
        this.playTrack();
      } else if (option === 2) {
        this.stopTrack();
      } else if (option === 3) {
        this.pausedTrack();
      }
    },
    /* *************************** */
    itIsPlaying(track) {
      this.getIsPlaying(true);
      console.log(this.isPlaying);
      console.log(this.tracks);
      if (this.currenttrack._src === track) {
        this.tracks.findIndex((ele, i) => {
          if (track === ele.howl._src) {
            //console.log(i);
            this.currentIndex = i;
          }
        });

        //console.log(this.currentIndex);
      }
    },
    /* ************************ */
    nextOrPrev(option) {
      if (!this.isPlaying) {
        return;
      } else {
        this.getIsPlaying(false);
        //console.log(this.isPlaying);
        this.currenttrack.stop();
        return new Promise((res) => {
          if (option === "next") {
            if (this.index < this.tracks.length - 1) {
              res((this.index += 1));
            } else {
              res((this.index = 0));
            }
          }
          if (option === "prev") {
            if (this.index > 0) {
              res((this.index -= 1));
            } else {
              res((this.index = this.tracks.length - 1));
            }
          }
        }).then((res) => {
          this.selectedTrack = res;
          this.playTrack();
          //console.log(res);
        });
      }
    },
    /* *************************** */
    playTrack() {
      //console.log(this.currenttrack._src);
      // //console.log(this.context)
      if (this.selectedTrack === this.index && this.isPlaying) {
        ////console.log("son Iguales: " + this.selectedTrack + " " + this.index);
        return;
      } else if (this.selectedTrack !== this.index) {
        ////console.log("son distinto: " + this.selectedTrack + " " + this.index);
        this.currenttrack.stop();
        this.index = this.selectedTrack;
        this.currenttrack.play();
        //this.initAudioVisualizer();
      } else {
        this.currenttrack.play();
        //this.initAudioVisualizer();
      }
      //console.log(this.currenttrack);
    },
    /* ***************************** */
    stopTrack() {
      this.getIsPlaying(false);
      console.log(this.isPlaying);
      this.currenttrack.stop();
    },
    /* *************************** */
    pausedTrack() {
      this.getIsPlaying(false);
      console.log(this.isPlaying);
      this.currenttrack.pause();
    },
    /* **************************** */
    addFavoritesPlay(track) {
      //console.log(track);
      track.selected = !track.selected;
      this.trackObj.title = track.title;
      this.trackObj.artist = track.artist;
      this.trackObj.howl = null;
      this.trackObj.display = track.display;
      this.trackObj.selected = track.selected;
      this.setFavoritesList(track.title);
      //this.favoritesTracks;
    },
    /* ********************************** */
    removeFavoritesPlay(track) {
      track.selected = !track.selected;
      this.removeFavoritesList(track.title);
      //console.log("remove " + track.title);
    },
    /* **************************** */
    selectedTrackFromList(trackItem) {
      //console.log(trackItem);
      this.selectedTrack = trackItem;

      /* this.selectedTrack = this.tracks.findIndex(
        (track) => track === trackItem
      ); */
      //console.log(this.selectedTrack);
    },
    /* ************************************ */
    playTrackFromList(trackItem) {
      //console.log(trackItem);
      this.selectedTrack = trackItem;
      this.playTrack();
    },
    /* **************************** */
  },

  created() {
    this.getIsPlaying();
    this.isPlaying;
    ////console.log(this.playlist);
    //this.listTracks;
    ////console.log(this.listTracks);
    this.createObjectForEachTrack();
    this.selectedTrack = this.index;
    this.getTrackInfo;
    this.inervalSeek();
    this.currentListComponent;
  },
  /* ********************************************* */
  //https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
  //https://elabismodenull.wordpress.com/2017/05/22/vuejs-interceptores-de-navegacion-entre-rutas/
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      Howler.unload(); //Descarga y destruye todos los objetos Howl cargados actualmente. Esto detendrá inmediatamente todos los sonidos y los eliminará de la caché.
      next();
    } else {
      //this.forceRerender()
      next(false);
    }
  },
  beforeRouteUpdate(to, from, next) {
    // just use `this`
    Howler.unload();
    next();
  },
};
</script>

<style>
.player{
  /* background-color:#32647b; */
  background: linear-gradient(to bottom, #d1dce1,#32647b );
 
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
