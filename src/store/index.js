import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlist: [],
    isPlaying:false,
  },
  mutations: {
    GET_PLAYLIST(state, tracks) {
      state.playlist = tracks;
      localStorage.setItem("playList", JSON.stringify(state.playlist));
    },
    GET_IS_PLAYLIST(state, bool) {
      state.isPlaying = bool;
      console.log(state.isPlaying)
    },
  },
  actions: {
    getPlaylist({ commit }) {
      axios.get("http://localhost:8080/api/playlist.json").
      then((res) => {
        //console.log(res.data);
        commit("GET_PLAYLIST",res.data);
      });
      //.then((data) => console.log(data));
    },
    getIsPlaying({ commit },bool) {
        commit("GET_IS_PLAYLIST",bool);
    },
    loadLocalStorage() {
      if (localStorage.getItem("playList")) {
        console.log("exists");
        const playList = JSON.parse(localStorage.getItem("PlayList"));
        this.commit("GET_PLAYLIST", playList);
        return;
      } else {
        localStorage.setItem("playList", JSON.stringify([]));
      }
    },
  },
  getters: {
    listTracks:(state)=> {
      //console.log(state.playlist)
      let listTracksObject = [];
      if (state.playlist) {
        listTracksObject = JSON.parse(JSON.stringify(state.playlist));

        listTracksObject.forEach((track) => {
          track.title = track.title.replace(/\s/g, "_");
          //console.log(track.title)
        });
      }
      //console.log(listTracksObject)
      return listTracksObject;
    },
  },
});
