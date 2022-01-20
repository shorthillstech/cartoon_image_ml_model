<template>
  <div class="container" ref="myDiv">
    <div class="d-flex justify-content-center flex-wrap mb-0 headcont">
      <div
        class="col-sm-12 smallstickers"
        v-if="width <= 750"
        :style="{ marginBottom: '0px' }"
      >
        <stickersidebar @value="handleImg" :imageval="rowvalue" />
      </div>

      <div
        class="col-8 col-sm-12 ml-5 main"
        ref="rowDiv"
        :style="{ 'background-image': `url(data:image/png;base64,${imgdata})` }"
      >
        <div class="row col-12">
          <drr
            v-for="(data, index) in stickerdata"
            :key="index"
            :x="width <= 750 ? 200 : 400"
            @select="handleCross(data.name)"
            :y="200"
            :outerBound="inner"
            :w="200"
            :h="100"
            :aspectRatio="true"
          >
            <div :style="{ display: 'inline-block' }">
              <img :src="data.img" :style="{ width: '100%', height: '100%' }" />
            </div>
          </drr>
        </div>
      </div>
      <div
        class="col-md-4"
        v-if="width > 750"
        :style="{ marginBottom: '0px', marginLeft: '5px' }"
      >
        <stickersidebar
          @stickervalue="handleImg"
          ref="stickercomp"
          :imageval="rowvalue"
        />
      </div>
      <div class="col-8" :style="{ marginBottom: '20px', marginTop: '10px' }">
        <div class="d-flex justify-content-end mr-2">
          <div class="col-md-2 mybtn col-sm-4 mt-1 mb-1">
            <button class="cncbtn" @click="handleCancel">Cancel</button>
          </div>
          <div class="col-md-2 col-sm-4 mt-1 mb-1">
            <button
              :class="stickerdata.length > 0 ? 'savebtn' : 'disabledbtn'"
              @click="handleSave"
            >
              Save Sticker
            </button>
          </div>
        </div>
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
  props: ["imgdata"],
  data() {
    return {
      xvalue: "400",
      stickerdata: [],
      activesticker: "",
      inner: {
        x: 220,
        y: 300,
        w: 540,
        h: 390,
      },
      rowvalue: "",
      width: "",
      stickerremoved: "",
    };
  },

  created() {
    window.addEventListener("resize", this.resizeHandler);
  },

  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.width = window.innerWidth;
    this.handleDivSize();
  },
  methods: {
    handleImg(value) {
      this.stickerdata.push(value);
    },
    handleCross(value) {
      this.activesticker = value;
    },
    handleCancel() {
      let value = "off";
      this.$emit("cancel", value);
    },
    RemoveSticker(value) {
      
      let ind = this.stickerdata.findIndex((obj) => obj.name == value.name);
      if (ind >= 0) {
        this.stickerdata.splice(ind, 1);
        this.activesticker = " ";
        this.stickerremoved = value;
        this.$refs.stickercomp.CloseSticker(value);
      }
    },
    resizeHandler(e) {
      this.width = window.innerWidth;
      this.handleDivSize();
    },
    handleDivSize() {
      let width = this.width;
      const img = new Image();

      img.src = "data:image/png;base64," + this.imgdata;

      img.onload = () => {
        const imgWidth = img.naturalWidth <= 400 ? "450" : img.naturalWidth; /// Data url width
        const imgHeight = img.naturalHeight <= 400 ? "450" : img.naturalHeight;
        if (width > 1200) {
          // Window width
          this.$refs.rowDiv.style.height = imgHeight + "px";
          this.$refs.rowDiv.style.width = imgWidth + "px";
          this.inner.w = imgWidth;

          this.inner.h = 520;
          this.inner.x = +this.inner.x + 80;
        } else if (width > 750 && width < 1200) {
          this.$refs.rowDiv.style.width = "50%";
          this.$refs.rowDiv.style.height = imgHeight + "px";
        } else if (width <= 750) {
          this.inner.x = 200;
          this.inner.w = imgWidth;
          this.inner.h = 520;
        }
        if (imgWidth == 450) {
          this.inner.x = 200;
          this.inner.y = 200;
        }

        this.rowvalue = { height: imgHeight, width: imgWidth };
      };
    },
    handleSave() {
      html2canvas(this.$refs.rowDiv, {
        allowTaint: false,
        logging: true,
        scale: 1.4,
        windowWidth: this.$refs.rowDiv.Width,
        windowHeight: 825,
        useCORS: true,
        taintTest: false,
      }).then((canvas) => {
        if (canvas.toDataURL()) {
          this.$emit("psticker", canvas.toDataURL());
        }
      });
    },
    handleDeCross() {
      this.activesticker = "";
    },
  },
};
</script>

<style scoped>
.containers {
  padding: 0px 40px;
  height: 100%;
}
.headcont {
  margin-top: 50px;
}
.main {
  border: solid 1px black;
  max-height: 450px;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-left: 40px;
  position: relative;
}
.ul {
  list-style-type: none;
  margin: 0;
  width: inherit;
  overflow: hidden;
  margin-left: 20px;
}
.float {
  float: right;
}
.disabledbtn {
  cursor: default;
  pointer-events: none;
  text-decoration: none;
  padding: 8px 25px;
  font-size: 12px;
  margin: 0px 5px;
  border: none;
  color: white;
  font-weight: 600;
  background: #b2b2b2;
  border-radius: 6px;
}

.cncbtn {
  background: white;
  padding: 8px 25px;
  border: 1px solid gray;
  font-size: 12px;
  margin: 0px 5px;
  box-shadow: burlywood;
  border-radius: 5px;
  color: black;
  font-weight: 600;
}
.savebtn {
  background: #51c1cd;
  padding: 8px 25px;
  font-size: 12px;
  margin: 0px 5px;

  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 600;
}
.li {
  float: right;
}

.li a {
  display: block;
  color: white;
  text-align: center;
  padding: 5px 16px;
  text-decoration: none;
}

.li a:hover {
  background-color: #111;
}
.mybtn {
  width: 14% !important;
}

.actives {
  background-color: #4caf50;
}
.drag {
  position: absolute;
}
@media (max-width: 991px) {
  .headcont {
    margin-left: 0% !important;
    margin-right: 0px !important;
    justify-content: flex-start !important;
    padding: 0px !important;
  }
  .savebtn {
    width: 130px;
    margin-left: 10px;
  }
}
.main {
  margin-left: -2% !important;
}

@media (max-width: 750px) {
  .containers {
    width: 100%;
  }
  .savebtn,
  .cncbtn {
    padding: 5px 10px;
    font-size: 14px;
    margin-left: 30%;
  }
  .smallstickers {
    max-width: 100vw;
    width: 100%;
  }

  .main {
    max-width: 100%;
    width: 100%;

    height: 50vh;
    margin: 0px !important;
    max-height: 100%;
    justify-content: flex-start;
  }
}
</style>