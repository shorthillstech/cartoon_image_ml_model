<template>
  <div class="container-fluid ">
    <div class="color">
      <div class="center">
        <h1 class="main_head">Want your cartoon image?</h1>
      </div>
    </div>
    <div class="container">
      <div class="row m-5">
        <div class="col-4">
          <label for="data">Add your cartoon image here.</label>
          <input id="data" @input="saveItem" class="w-100 br" type="file" />
        </div>
      </div>
    </div>
    <div class="container ">

       <div class="row mb-2">
            <div class="col-12 row bg-dark text-white p-2">
              <div class="col-7">
                <h3>Actions Navbar</h3>
              </div>
              <div class="col">
                  <button
                class="btn btn-warning btnstk"
                
                v-if="data.length > 0"
                @click="handleStickerPanel()"
              >
                Add Sticker
              </button>
              </div>
              <div class="col">
                 <button
                class="btn btn-primary"
              
                v-if="this.normalimg && !stickerpanel"
                @click="handleCrop"
              >
                {{ this.croptext }}
              </button>
              </div>
              <div class="col">
                 <a
                href="#"
                id="downlink"
                :class="
                  data.length > 0 ? ' mr-1 linkactive' : 'disabled-link mr-1'
                "
                download
                ><font-awesome-icon icon="download"></font-awesome-icon> Cartoon Image</a
              >
              </div> 
            </div>
          </div>
      <!--------------Crop part----------------->

      <div class="row col-12" v-if="activecrop && !stickerpanel">
        <cropper :src="newa" @change="change" />
      </div>
      <!-- x -----Crop----- x -->
      <!--  ----  -- output view  --  -----  -->

      <div class="row " v-else-if="!activecrop && !stickerpanel">
      
          <div class="col">
            <div class="card" style="width:35rem" ref="myDiv">
              <img class="card-img-top" :src="this.normalimg" />
              <div class="card-body"></div>
            </div>
          </div>
          <div class="col-1">
            <button class="btn btn-primary" @click="processImage">
              Process
            </button>
          </div>
          <div class="col">
            <div class="card" style="width:35rem">
              <span v-if="loader" class="spinner-border"> </span>

              <img v-if="data !== ''" :src="'data:image/png;base64,' + data" />

              <div class="card-body"></div>
            </div>
          </div> 
      </div>
      <!--  ----x  -- output view  -- x -----  -->
      <!--  ----  -- Sticker view  --  -----  -->

      <div v-else-if="!activecrop && stickerpanel">
        <stickercomp :imgdata="data" @psticker="handleStickerValue" />
      </div>
      <!-- x ---   Sticker view  ----    x -->
    </div>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import Stickercomp from "./stickercomp.vue";
export default {
  data() {
    return {
      data: "",
      normalimg: "",
      croptext: "Crop",
      stickerpanel: false,
      stickeredited: false,
      loader: false,
      activecrop: false,
      cropimg: "",
      url: "",
      newa: "",
    };
  },
  components: {
    Cropper,
    Stickercomp,
  },
  created() {
    axios
      .get("/hello/cartoon")
      .then((response) => (this.url = response.data[0]["url"]));
  },
  methods: {
    processImage() {
      this.loader = true;
      console.log(this.normalimg);
      axios
        .get(this.url + "/img?img=" + this.normalimg.split(",")[1])
        .then((response) => {
          console.log(response);
          if (response.status == 201 || response.status == 200) {
            this.data = response.data;
            console.log("data", this.data.length);
            this.loader = false;

            let link = document.getElementById("downlink");
            link.setAttribute("download", "Myimage");
            link.setAttribute("href", "data:image/png;base64," + response.data);
          }
        });
     
    },
    handleStickerValue(val) {
      this.data = val.split(",")[1];
      this.stickerpanel = false;
      this.newa = val;
      this.activecrop = true;
      this.stickeredited = true;
    },
    handleStickerPanel() {
      this.stickerpanel = true;
    },
    handleCrop()
    {
     this.activecrop=this.activecrop?false:true;
     this.croptext= this.croptext=='Save Crop'?'Crop':'Save Crop';
      this.stickeredited=false;
    },
    change({ coordinates, canvas }) {
      this.cropimg = canvas.toDataURL("image/png");
      this.croptext = "Save Crop";
      console.log("ddd", this.stickeredited);
      if (this.stickeredited == true) {
        this.data = this.cropimg.split(",")[1];
        let link = document.getElementById("downlink");
        link.setAttribute("download", "Myimage");
        link.setAttribute("href", this.cropimg);
      } else {
        this.normalimg = this.cropimg;
      }
    },
    saveItem(e) {
      const files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);

      reader.addEventListener("load", () => {
        this.normalimg = reader.result;
        console.log("kjdf", this.normalimg.length);
        this.newa = this.normalimg;
        this.handleCrop();
      });
    },
  },
};
</script>

<style scoped>
.container-fluid {
  height: 100vh;
}
.color {
  background-color: rgb(255, 255, 93);
  height: 40vh;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}
.maincont{
  background:url("https://png.pngtree.com/thumb_back/fh260/background/20210728/pngtree-blue-and-purple-modern-background-design-free-png-image_754171.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.linkactive{
  color:springgreen;
  font-size: 17px;
  text-decoration: none;
  
}
.center {
  text-align: center;
}
.main_head {
  font-size: 55px;
}
.btnstk {
  float: right;
}
.br {
  outline: none;
}

.disabled-link {
  cursor: default;
  pointer-events: none;
  text-decoration: none;
  color: grey;
}
label {
  font-size: 20px;
}
</style>
