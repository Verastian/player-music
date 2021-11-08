<template>

  <div class="view__box" id="js-view" :style="changeImg">
    <div class="d-flex justify-end pa-2">
        <v-chip close-icon="mdi-delete" color="yellow">
            <strong class="red--text text--lighten-1"
            >{{ getTrackInfo.seek | minutes }} /</strong
          >
          <strong class="red--text text--lighten-1">
            {{ getTrackInfo.duration | minutes }}</strong
          >
        </v-chip>
    </div>
    
      
   
    <svg
      class="p-view__svg"
      id="js-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="600"
      viewBox="0 0 200 150"
      preserveAspectRatio="none"
    >
      <!-- <image xlink:href="http://localhost:8080/img/Born_Jamericans_State_of_shock.jpg" x="0" y="-100" width="200" height="400" /> -->
      <path
        :d="pathStr"
        :stroke="soundColor"
        stroke-width="4"
        fill="none"
        stroke-dasharray="100,0"
      />
    </svg>
  </div>
</template>

<script>
import { Howler } from "howler";
import Vue from "vue";
import { mapState } from "vuex";

Vue.filter("minutes", (value) => {
  if (!value || typeof value !== "number") return "00:00";
  let min = parseInt(value / 60),
    sec = parseInt(value % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  value = min + ":" + sec;
  return value;
});
export default {
  name: "sound-view",
  props: {
    tracks: {
      type: Array,
      default: () => [],
    },
    changeImg: {
      type: Object,
      default: () => {},
    },
    getTrackInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      pathStr: null,
      freqs: null,
      gainNode: null,
      analyserNode: null,
      buffer: null,
      drawTime: null,
      soundColor: "#88ff00",
      /* changeImg: {
        backgroundImage:
          'url("http://localhost:8080/img/Born_Jamericans_State_of_shock.jpg")',
        backgroundSize: "cover",
      }, */
    };
  },
  computed:{
...mapState(["isPlaying"]),
  },
  methods: {
    
    /* ******************************** */
    offPlaying() {
      if(!this.isPlaying){
        this.gainNode.gain.setValueAtTime(0, Howler.ctx.currentTime);
      }
    },
    /* **************************** */
    initAudioVisualizer() {
      this.analyserNode = Howler.ctx.createAnalyser();

      this.buffer = this.analyserNode.frequencyBinCount;
      console.log(this.buffer);
      this.freqs = new Uint8Array(this.buffer);

      Howler.ctx.createGain =
        Howler.ctx.createGain || Howler.ctx.createGainNode;
      this.gainNode = Howler.ctx.createGain();
      this.gainNode.gain.setValueAtTime(1, Howler.ctx.currentTime);

      Howler.masterGain.connect(this.analyserNode);
      this.analyserNode.connect(this.gainNode);
      this.gainNode.connect(Howler.ctx.destination);

      //console.log(this.analyserNode);
    },

    drawAudioVisualizer() {
      //console.log(this.freqs);
      //const drawTimer = null;
      const svgWidth = 4096;
      const svgHeight = 500;
      /* const svg = document.getElementById("js-svg"); */ //se ajusta al porte de la caja
      /* if (this.gainNode.gain.value === 0) {
        
      } */
      this.analyserNode.smoothingTimeConstant = 0.8;

      this.analyserNode.fftSize = 8192; //https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize ->32, 64, 128, 256, 512, 1024, 2048, 4096,8192, 16384,

      this.analyserNode.getByteFrequencyData(this.freqs);

      const barWidth = (svgWidth / this.buffer) * 0.7; //Setter y getter de valor de atributo agrupado element.x.baseVal.value ->https://www.w3.org/Graphics/SVG/WG/wiki/Simple_SVG_API
      //console.log(this.freqs);
      /* const pairs = (x)=> { return (x % 2) === 0; }
      const freqInPairs = this.freqs.filter(pairs);
      console.log(freqInPairs) */
      let d = "M";
      this.freqs.forEach((y, i) => {
        // if(i % 3 === 0){
        //   return;
        // }
        const x = i * barWidth;
        //const pairs = x % 2 === 0? x:'';
        const value = this.freqs[i];
        const percent = value / 255;
        const yBase = i % 2 === 0 ? 1 : -10;
        const height =
          svgHeight / 2 +
          (svgHeight / 2) * percent * -1 * yBase * this.gainNode.gain.value;
        //M0,200 L600,200
        d += `${x} ${height},`;
        //console.log(percent )

        /*  if (percent > 0.3) {
          this.soundColor = "#f44336";
        } else if (percent > 0.15) {
          this.soundColor = "#e46f00";
        } else {
          this.soundColor = "#e7aa31";
        } */
        if (percent > 0.3) {
          this.soundColor = `rgba(244, 67, 54, 0.8)`;
        } else if (percent > 0.15) {
          this.soundColor = `rgba(228, 111, 0, 0.6)`;
        } else {
          this.soundColor = `rgba(231, 170, 49, 0.4)`;
        }

        //this.soundColor = `rgba(255, 0, 0, ${percent})`;
        // this.soundColor = `rgba(255, 0, 0, 0.6)`;
      });

      this.pathStr = d;
      //console.log(this.pathStr)
      this.drawTimer = window.requestAnimationFrame(
        //nforma al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación- https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame
        //() => this.drawAudioVisualizer(this.freqs)
        this.drawAudioVisualizer.bind(this)
      );
    },
    /* **************************** */
  },

  created() {
    this.changeImg;
    this.getTrackInfo;
    this.initAudioVisualizer();
    this.drawAudioVisualizer();
    /* this.tracks.howl.on('end',()=>{
        console.log('off')

    }) */
    
  },
};
</script>

<style>
</style>