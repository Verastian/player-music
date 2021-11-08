<template>
  <div>
    <svg @click="init()" xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 1000 1000">
      <g>
      
        <ellipse
          fill="#fff"
          stroke="#000"
          cx="644.5"
          cy="297"
          id="svg_2"
          rx="0.5"
        ></ellipse>
         <ellipse
          stroke="rgba(50, 100, 123, 0.6)"
          ry="300"
          rx="300"
          id="svg_3"
          cy="294"
          cx="399.99999"
          stroke-width="30"
          fill="rgba(25, 81, 107, 0.7)"
        >
        <!-- #19516b -->
         <animate
            id="svg3"
            attributeType="XML"
            attributeName="ry"
            values="300;350;300"
            dur="1s"
            begin="svg4.end-.5s"
          />
          <animate
            id="svg3"
            attributeType="XML"
            attributeName="rx"
            values="300;350;300"
            dur="1s"
            begin="svg4.end-.5s"
          />
        </ellipse>
        <ellipse
          stroke="rgba(25, 81, 107, 0.7)"
          ry="250"
          rx="250"
          id="svg_4"
          cy="294"
          cx="399.99999"
          stroke-width="30"
          fill="rgba(0, 62, 91, 0.6)"
        >
        <!-- #003e5b -->
         <animate
            id="svg4"
            attributeType="XML"
            attributeName="ry"
            values="250;300;250"
            dur="1s"
            begin="svg5.end-.5s"
          />
          <animate
            id="svg4"
            attributeType="XML"
            attributeName="rx"
            values="250;300;250"
            dur="1s"
            begin="svg5.end-.5s"
          />
        </ellipse>
        <ellipse
          stroke="rgba(0, 62, 91, 0.6)"
          ry="200"
          rx="200"
          id="svg_5"
          cy="296"
          cx="399.99999"
          stroke-width="30"
          fill="rgba(0, 55, 81, 0.6)"
        >
        <!-- #003751 -->
        <animate
            id="svg5"
            attributeType="XML"
            attributeName="ry"
            values="200;250;200"
            dur="1s"
            begin="svg6.end-.5s"
          />
          <animate
            id="svg5"
            attributeType="XML"
            attributeName="rx"
            values="200;250;200"
            dur="1s"
            begin="svg6.end-.5s"
          />
        </ellipse>
        <ellipse
          stroke="rgba(0, 55, 81, 0.6)"
          ry="150"
          rx="150"
          id="svg_6"
          cy="296"
          cx="399.99999"
          stroke-width="30"
          fill="rgba(0, 49, 72, 0.6)"
        >
        <!-- #003148 -->
          <animate
            id="svg6"
            attributeType="XML"
            attributeName="ry"
            values="150;200;150"
            dur="1s"
            begin="svg7.end-.5s"
          />
          <animate
            id="svg6"
            attributeType="XML"
            attributeName="rx"
            values="150;200;150"
            dur="1s"
            begin="svg7.end-.5s"
          />
        </ellipse>
        <ellipse
          stroke="rgba(0, 49, 72, 0.6)"
          ry="100"
          rx="100"
          id="svg_7"
          cy="296"
          cx="399.99999"
          stroke-width="5"
          fill="rgba(0, 43, 63, 0.6)"
          
        >    
        <!-- #002b3f -->   
          <animate
            id="svg7"
            attributeType="XML"
            attributeName="ry"
            values="100;80;100"
            dur=".5s"
            begin="mouseover"
          />
        
          <animate
            id="svg7"
            attributeType="XML"
            attributeName="rx"
            values="100;80;100"
            dur=".5s"
            begin="mouseover"
          />
       
        </ellipse>
        <path
       
          transform="rotate(89.1683 372.62 284.783)"
          stroke-width="5"
          stroke="#000"
           id="trazo1"
          d="m300.77103,316.48017l82.84902,-161.39415l82.84902,161.39415l-165.69805,0z"
          fill="#fff"
        />
        <text @click="redirect" id="texto1" x="350" y="310" fill="#fff" style="font-family: Consolas; font-size: 40px">PLAY
  
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "background-img",
  data(){
    return{
    }
  },
  methods:{
    redirect(){
      this.$router.push('/player')
    }
  }
};
</script>

<style scoped>
svg {
  width: 50%;
  display: block;
  margin: 0 auto;
  /* background-color:#000; */
}
svg  path {
  fill: none;
  stroke: #fff;
  stroke-width: 1;
  animation: trazar 4s ease-out infinite forwards  ;
}  

#trazo1 {
  stroke-dasharray: 652.52;
  stroke-dashoffset: 652.52;
}
#texto1{
  fill:#fff;
    opacity: 0.7;
  cursor:pointer;
   animation: boldText 3s ease-out  forwards
}
#texto1:hover{
  fill:#fff;
    opacity: .7;
  cursor:pointer;
   animation: boldTextHover 1s ease-out forwards
}

@keyframes boldTextHover {

  100% {
    fill:#fff;
    opacity: 1;
  }
 
}
@keyframes boldText {
  
  100% {
    fill:#fff;
    opacity: .7;
  }
 
}
@keyframes trazar {
  80% {
    stroke-dashoffset: 0;
    
    stroke-width: 0.5;
  }

  90% {
    stroke-width: 5;
    opacity: 1;
  }

  100% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
 
}
</style>