<template>
  <div class="container" ref="myDiv">
    <div class="row mt-5 mb-0">
     
      <div class="col-8" >
        <ul class="ul" >
          <li class="li"><button class="btn btn-success" @click="RemoveSticker(activesticker)">Delete {{activesticker}}</button></li>
          <li class="li"><button class="btn btn-primary mr-1 ml-1" @click="handleSave">Save  Image</button></li>

        </ul>
        
      </div>
      <div class="col-2 ml-3" :style="{background:'#333'}">
        <h3 :style="{color:'white',textAlign:'center'}">Stickers</h3>
        
      </div>
      <div class="col-8">
        <div class="row col-12 main" ref="rowDiv">
        
          <drr
            :x="300"
            :y="300"
            class="drag"
            :outerBound="inner"
            :w="300"
            :h="267"
            :aspectRatio="true"
          >
                        <!-- src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3vinHsGUjczi71Ecvx8VPPpO4ZA5wxfucGozAWbb0Ap1b02UCBt56SxEBnYY2Uy7jgUk&usqp=CAU" -->

            <img
            :src="'data:image/png;base64,'+imgdata"
              :style="{ width: '100%', height: '100%' }"
            />
          </drr>

          <drr
            v-for="(data, index) in stickerdata"
            :key="index"
            :x="400"
            @select="handleCross(data.name)"
            :y="200"
            :outerBound="inner"
            :w="200"
            :h="150"
            :aspectRatio="true"
          >
            <div :style="{ display: 'inline-block' }">
              <img :src="data.img" :style="{ width: '100%', height: '100%' }" />
            </div>
          </drr>
        </div>
      </div>
      <div class="col-2" :style="{marginBottom:'90px'}">
        <stickersidebar @value="handleImg" />
      </div>
    </div>
  </div>
</template>

<script>
import drr from "@minogin/vue-drag-resize-rotate";
import Stickersidebar from "./stickersidebar.vue";

import html2canvas from "html2canvas";

export default {
  components: { drr, Stickersidebar },
  props:['imgdata'],
   data() {
    return {
      xvalue: "400",
      stickerdata: [],
      activesticker: "",
      inner: {
        x: 350,
        y: 220,
        w: 540,
        h: 390,
      },
    };
  },
  mounted() {
    let height = this.$refs.rowDiv.clientHeight;
    let width = this.$refs.rowDiv.clientWidth;
    let md = this.$refs.myDiv.style.paddingLeft;
    if (height > this.inner.h) {
      let vl = height - this.inner.h;
      this.inner.y = this.inner.y + vl / 5;
      console.log("md", md);
    }
    console.log(width);
    md = md.split("px");
    this.inner.w = width;
    this.inner.h = height;
    console.log("outerbn", this.inner);
    this.inner.x = +this.inner.x + 80;
    console.log(",", md);
    console.log("height", height);
    console.log("wi", width);
  },
  methods: {
    handleImg(val) {
      this.stickerdata.push(val);
    },
    handleCross(vl) {
      console.log("kdfjkdjf", vl);
      this.activesticker = vl;
    },
    RemoveSticker(vl) {
      console.log("jkfjkdfkdf", vl);
      let ind = this.stickerdata.findIndex((val) => val.name == vl);
      if (ind >= 0) {
        this.stickerdata.splice(ind, 1);
        this.activesticker=" "
      }

    },
    handleSave()
    {
     html2canvas(this.$refs.rowDiv, {
        allowTaint: false,
        logging: true,
        scale:1.4,
        windowWidth: this.$refs.rowDiv.Width,
        windowHeight: 825,
        useCORS: true,
        taintTest: false,
      }).then(
        (canvas) =>{console.log(canvas.toDataURL());
        this.$emit("psticker",canvas.toDataURL())
        }
      );
    },
    handleDeCross() {
      this.activesticker = "";
    },
  },

 
};
</script>

<style>
.containers {
  padding: 20px 40px;
}
.main {
  border: solid 1px black;
  height: 50vh;
  margin: 0px 20px;
  position: relative;
}
.ul {
  list-style-type: none;
  margin: 0;
  width:100%;
  padding: 0;
  overflow: hidden;
  margin-left:20px;
  background-color: #333;
}
.float{
  float:right;
}

.li {
  float: right;
}

.li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.li a:hover {
  background-color: #111;
}

.actives {
  background-color: #4caf50;
}
.drag {
  position: absolute;
}
</style>