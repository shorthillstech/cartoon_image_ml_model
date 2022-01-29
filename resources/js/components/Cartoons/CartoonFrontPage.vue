<template>
  <div class="main-div">
    <div class="sideimage"></div>
    <div class="home-container">
      <div class="jumbo">
        <div class="textcol inline-flex">
          <cartoon-header />
          <h1 class="textcol-head">Turn your Photos Into Cartoon</h1>
          <h3 class="txt">Share. Explore. Love</h3>

          <button class="uploadbtn">
            <label :style="{ cursor: 'pointer' }"
              >Upload a Photo
              <input type="file" @input="saveItem" id="data" />
            </label>
          </button>
          <p class="w-100">and join the fun!</p>
        </div>
        <div class="imgcol inline-flex">
          <img src="/images/cartoon.png" class="img" />
        </div>
      </div>

      <div class="main-content">
        <div class="inline-flex maincol1">
          <h1 class="">Best App To Turn Your Photo Into Cartoon</h1>
          <p>
       
            Let us have fun with our images. Take any photograph or picture of
            your friends or family, convert them into a cartoon and share the
            fun. You can also add Goggles and fun stickers to make your cartoons
            even more fun. The system works best with full face photographs.
          </p>
         
        </div>
        <div class="inline-flex maincol2">
          <img src="/images/sideimg.png" class="img" alt="" />
        </div>
      </div>
      <div :style="{ margin: '0px 80px', background: 'whitesmoke' }">
        <hr class="hr1" />
      </div>

      <div class="sticker-section">
        <div class="inner-flex sticker">
          <h2>Enhance Your Cartoon With Stickers</h2>
          <p>
            We use machine learning for a bit of fun. The system is trained on
            hundreds of images that were cartoonized. Try out on some of your
            images. Works best on human faces.
          </p>
          <div class="inline-flex-1 stickerrow">
            <li class="stickerimg" v-for="val in stickers" :key="val">
              <img
                :src="val"
                :style="{ width: '100%', height: '100%' }"
                alt=""
              />
            </li>
          </div>
        </div>
      </div>
      <div class="footer-section">
        <!-- <div class="bottomimg"></div> -->
        <h4>Go From Photo To Cartoon</h4>
        <div class="btnrow">
          <button class="newupload">
            <label :style="{ cursor: 'pointer' }">
              Upload a photo
              <input type="file" @input="saveItem" />
            </label>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartoonHeader from "./CartoonHeader.vue";
export default {
  components: { CartoonHeader },
  name: "cartoonhome",
  data() {
    return {
      stickers: [
        "/images/mus.png",
        "/images/glass1.png",
        "/images/mustache1.png",
        "/images/beard.png",
        "/images/sunglass2.png",
      ],
      inputval: { name: "", size: "" },
    };
  },
  methods: {
    saveItem(e) {
      const files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      let inputval = { name: "", size: "" };
      inputval.name = files.name;
      inputval.size = parseFloat(files.size / 1024).toFixed(2) + "kb";

      reader.addEventListener("load", () => {

        this.$router.push({
          name: "CartoonHandler",
          path: "/cartoon",
          params: { val: reader.result, inputval: inputval },
        });
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abel&family=Anton&family=Josefin+Sans&family=Lexend+Deca&family=Livvic:wght@500&family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&display=swap");

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  position: relative;
}

.home-container {
  display: grid;
  width: 100%;
  position: relative;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  grid-template-columns: repeat(1, 1fr);
}

.sideimage {
  position: absolute;
  width: 980.25px;
  height: 514.25px;
  left: -603.61px;
  top: 717.98px;

  background: linear-gradient(
      188.94deg,
      #ffffff -4.06%,
      rgba(255, 255, 255, 0) 23.01%
    ),
    linear-gradient(269.2deg, #ffffff -1.95%, rgba(255, 255, 255, 0) 36.42%),
    url("/images/design.png");
  opacity: 0.4;
  z-index: 1;
  transform: rotate(-34.34deg);
}

.inline-flex {
  margin: 0px 0px;
  display: flex;
}
.uploadbtn {
  width: 322px;
  height: 67px;
  margin-top: 13px;
  margin-bottom: 20px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  z-index: 2;
  color: white;
  background: #50c2ce;
  font-size: 25px;
  font-weight: 600;
}
.bottomimg {
  position: absolute;
  width: 980.25px;
  height: 614.25px;
  left: 50%;
  cursor: pointer;
  background: linear-gradient(
      188.94deg,
      #ffffff -4.06%,
      rgba(255, 255, 255, 0) 23.01%
    ),
    linear-gradient(269.2deg, #ffffff -1.95%, rgba(255, 255, 255, 0) 36.42%),
    url("/images/design.png");
  opacity: 0.4;
  transform: rotate(-32.91deg);
}
.main-content {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 60% 40%);
  color: gray;
  padding: 50px 0px;

  background: whitesmoke;
}
.imgcol > img {
  width: 100%;
}
.maincol2 > img {
  width: 70%;
}


.jumbo {
  margin: 0px 0px;
  display: grid;
  height: 672px;
  width: 100%;
  background: #ffffff;
  background-repeat: no-repeat;

  grid-template-columns: repeat(2, 1fr);
  padding: 80px 80px;
}
.textcol {
  flex-wrap: wrap;
}
.textcol-head {
  font-family: "Montserrat", sans-serif;
  font-size: 56px;
  font-style: normal;
  z-index: 2;

  font-weight: 400;
  line-height: 68px;
  letter-spacing: 0em;
  text-align: left;
}
.textcol > p {
  margin-top: -5%;
  z-index: 2;

  margin-left: 100px;
}
.textcol > .txt {
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  width: 100%;
  font-style: normal;
  z-index: 2;

  font-weight: 400;
  line-height: 43.48px;
  letter-spacing: 0em;
  text-align: left;
  color: #404040;
}
.textcol > p {
  text-align: left;
}

.maincol1 {
  width: 100%;
  padding-left: 80px;
  color: #323232;

  flex-wrap: wrap;
}
.maincol1 > h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  z-index: 2;

  font-style: normal;
  font-weight: 500;
  line-height: 44px;
  letter-spacing: -0.015em;
  text-align: left;
}
.hr {
  height: 0px;
  width: 1280px;
  left: 80px;
  top: 4px;
  color: red;
}
.maincol1 > p {
  width: 100%;
  margin: 24px 0px;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: #323232;
  letter-spacing: 0em;
  text-align: justified;
}
.maincol2 {
  width: 100%;
  margin: 0px 40px;
  padding: 0px 40px;
  justify-content: center;
}
.hr1 {
  padding: 2px 80px;
  width: 100%;
  height: 2px;

  background: #d7d7d7;
}
.sticker > h1 {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
}
.sticker > p {
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  margin: 24px 0px;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: justified;
}
.sticker-section {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  z-index: 2;
  background: whitesmoke;
  width: 100%;

  padding: 50px 80px;
}
.inline-flex-1 {
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
}
ul {
  list-style-type: none;
}
.inline-flex-1 > li {
  width: 180px;
  height: 150px;
  display: inline-block;
}
.main-content > .maincol2 > h1 {
  font-size: 18px;
}
.footer-section {
  background: linear-gradient(90deg, #50c2ce 0%, #c4f8fc 41.67%),
    url("/images/design.png");
  display: flex;
  background-repeat: no-repeat;
  position: relative;

  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
}
.footer-section > h4 {
  font-weight: 600;
  font-size: 28px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  line-height: 34px;
}
.footerimg {
  position: absolute;
  width: 50%;
  height: 50%;
  right: 0;
  top: 0.53px;

  background: url(/images/design.png);
  opacity: 0.4;
  transform: rotate(-34.34deg);
}

.stickerimg {
  width: 100%;
  height: 100%;
}
.footer-section > .btnrow {
  width: 100%;
  display: inline-flex;
  justify-content: center;
}
.footer-section > .btnrow > .newupload {
  width: 226px;
  height: 63px;

  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 6px;
}
input[type="file"] {
  display: none;
}
@media (max-width: 991px) {
  .home-container {
    height: 100vh;
    overflow-y: scroll;

    width: 100vw;
  }
  .textcol > .textcol-head {
    font-size: 36px;
  }

  .textcol {
    justify-content: center;
  }
  .stickerimg {
    width: 80%;
    height: 80%;
  }
  .inline-flex-1 {
    flex-wrap: nowrap !important;
  }
  .textcol > .txt {
    text-align: center;
    font-size: 22px;
  }
  .textcol > p {
    text-align: center;
    margin-left: 0px;
  }
  .textcol > .uploadbtn {
    font-size: 22px;
  }
  .sideimage,
  .bottomimg {
    display: none;
  }

  .textcol,
  .imgcol,
  .main-content,
  .sticker-section,
  .inline-flex-1 {
    width: 100vw;
  }
  .main-content {
    grid-template-columns: repeat(1, 1fr);
    margin: 20px 0px;
  }
  .main-content > .maincol1,
  .maincol2 {
    justify-content: flex-start;
    margin: 20px 0px;
    padding: 0px;
  }
  .main-content > .maincol2 > img {
    width: 100%;
    margin: 0px;
  }
  .sticker-section {
    padding: 0px;
    z-index: 0;
  }
  .inline-flex-1 > li {
    width: 80%;
    height: 80%;
  }
  .sticker > h2,
  .maincol1 > h1 {
    font-size: 30px;
  }
  .uploadbtn {
    width: 50%;

    font-size: 18px;
  }
  .imgcol > img {
    width: 100vw;
    background-size: 100% 100%;
  }

  .jumbo > .imgcol {
    width: 100%;
  }
  .jumbo {
    padding: 0px;
    width: 100%;
    height: 100vh;
    grid-template-columns: repeat(1, 100%);
  }
  .footer-section {
    height: 30vh;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 20px;
  }
}
@media (max-width: 750px) {
  .home-container {
    padding: 0px 5px;
  }
  .textcol > .txt,
  .textcol > .textcol-head {
    text-align: center;
    z-index: 0;
  }
  .textcol > .textcol-head {
    font-size: 25px !important;
    margin: 0px 5%;
  }
  .maincol1 > p,
  .sticker > p {
    font-size: 16px;
  }
  .maincol1 > h1,
  .sticker-section > h2 {
    font-size: 25px;
  }

  .sticker-section {
    z-index: 0;
  }
  .textcol > .txt {
    font-size: 18px;
  }
  .textcol > p {
    text-align: center;
    width: 100%;
    margin: 0px;
  }

  .stickerimg {
    width: 12% !important;
  }
  .stickerrow {
    width: 100% !important;
    overflow-x: scroll !important;
    align-items: center;
    overflow-y: hidden;
  }

  .uploadbtn {
    margin: 0px 30%;
    font-size: 16px !important;
    padding: 10px 20px;
  }
}
@media (min-width: 1440px) {
  .main-div {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .textcol,
  .imgcol {
    max-width: 640px;
  }
  .sideimage {
    left: -603.61px;
    top: 440px;
    transform: rotate(-30deg);
  }
  .maincol1 {
    max-width: 732px;
  }
  .maincol2 {
    max-width: 548px;
  }

  .textcol > .textcol-head {
    line-height: 68.26px;
    font-size: 56px;
  }
  .imgcol {
    justify-content: flex-end;
  }
  .maincol1 {
    padding-left: 40px;
  }
  .maincol2 {
    padding: 0px;
    justify-content: flex-end;
  }
  .maincol2 img {
    width: 510px;
    height: 285px;
  }
  .sticker {
    max-width: 1280px;
  }
  .jumbo,
  .main-content,
  .sticker-section,
  .footer-section {
    display: flex;
    justify-content: center;
  }
}
</style>