<template>
  <div class="container-fluid">
    <div class="container">

      <!-- Default Head Section -->
      <div class="row">
        <div :class="data && !stickerpanel?'col-12 headContainer1':'col-12 headcontainer'">
            <p :class="data && !stickerpanel? 'headtxt htxt':'headtxt'">{{data && !stickerpanel?'Your Artwork is Ready!':stickerpanel?'Add Trending Stickers to Your Photo':'Turn Your Photos Into Cartoon'}}</p>
            <hr v-if="data && !stickerpanel" class="hr"/>
            <h3 class="bottomheadtxt" v-if="data && !stickerpanel">Share. Explore. Love</h3>
       >

        </div>
      </div>
      <!--x--Default head -x- -->
    </div>
    <div class="container " v-if="startstatus">

        <div class="row mt-5 " v-if="!normalimg">
        <div class="col-4">
   
        </div>
      </div>


      <!--------------Cropper panel----------------->

      <div class="row col-12 border-secondary cropper" v-if="activecrop">
        <div class="row">
        <cropper :src="cropperimage" @change="change" class='crop'  :style="{height:'55vh',width:'99%'}"/>
        </div>
        <div class="row mt-2">
           <div class="col-10 ml-0" v-if="activecrop">
                <h6>{{inputval.name}}</h6>
                <h6 :style="{color:'grey'}">{{inputval.size}}</h6>

              </div>
              <div class="col">
                 <button
                class='savebtn'
                :style="{float:'right'}"
                v-if="activecrop"
                @click="handleCrop"
              >
               Done
              </button>
              </div>
        </div>
      </div>
      <!-- x ----- ----Cropper panel----- x --------->



      <!--  ----------  -- output view  --  ------------------------  -->

      <div class="row justify-content-center" v-else-if="!activecrop && !stickerpanel && imageuploaded">

         <!-- Image viewer panel -->
          <div class="innerflex">
            <div :class="!data&&this.normalimg?'card mt-5':'card'" :style="{width:'32rem',position:'relative',border:'2px solid lightgray'}" ref="myDiv">
            <div v-if="loader" class="myloader">
              <div class="spinner">
              <p class="spinner-border"></p>
              </div>
              <h5 class='loadertxt'>Please Wait <br/> Cartoonizer at work</h5>
            </div>
             <div v-if="data" class="oldimg">
              <img :src="this.normalimg" class="card-img-top" :style="{height:'150px'}"/>
            </div>

              <img class="card-img-top cardactive" :style="{height:'500px'}" :src="data&&this.normalimg?'data:image/png;base64,' + data:this.normalimg?this.normalimg:''" />
            </div>

              <!-- Download Image -->
          <div class="col-12 text-center downcont">
            <a
                href="#"
                id="downlink"
                v-if="data"
                :class="
                  data.length  > 0 && !activecrop && !stickerpanel ? ' mr-1  downbtn' : 'disabled-link mr-1'
                "
                @click="handleDownload"
                download
                >Download Photo</a
              >
          </div>
           <!--x Download Image x-->
          </div>
          <div class="col-12 text-center  mb-2">
            <button class="savebtn" @click="processImage" v-if="!data && !loader">
              Cartoonize My Photo
            </button>
          </div>
      </div>

      <!-- Opening Sticker panel -->
      <div class="row mb-2 bg-white" v-if="imageuploaded">
            <div class="col-12 row" >
              <hr v-if="data.length > 0 && !activecrop && !stickerpanel" class="outputhr">

              <div class="col" :style="{display:'inline-flex'}"  v-if="data.length > 0 && !activecrop && !stickerpanel">

                  <button
                class="addevent"
                v-if="!stickeredited"


                @click="handleStickerPanel()"
              >
                Add Sticker
              </button>
                 <h4 :style="{marginLeft:'10px',marginTop:'10px',fontSize:'15px'}" v-if="!stickeredited">Enhance your photo by adding stickers</h4>

                <button
                class="addevent"

                 v-if="stickeredited"
                @click="onReplay()"
              >
                Replay
              </button>
              <h4 :style="{marginLeft:'10px',marginTop:'10px',fontSize:'15px'}" v-if="stickeredited">Replay and add another Image</h4>


              </div>

            </div>
          </div>
      <!--x Opening Sticker panel x-->

      <!--------  ----x  -- output view  -- x -------------------  -->



      <!--  ----  -- Sticker view  --  -----  -->

      <div v-else-if="!activecrop && stickerpanel">
        <stickercomp :imgdata="data" @psticker="handleStickerValue" @cancel="handleStickerPanel" />
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
      startstatus:false,
      data: "",
      normalimg: "",
      imageuploaded:false,
      croptext: "Crop",
      stickerpanel: false,
      stickeredited: false,
      loader: false,
      activecrop: false,
      cropimg: "",
      url: "",
      cropperimage: "",
      inputval:{name:'',size:''},
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
  mounted()
  {
      if(this.$route.params.val)
      {
        this.normalimg=this.$route.params.val;
        this.startstatus=true;
        this.cropperimage=this.normalimg;
        this.imageuploaded=true;
         this.handleCrop();
        if(this.$route.params.inputval)
        {
          this.inputval=this.$route.params.inputval;
        }
      }
  },
  methods: {
    handleDownload()
    {
        let link = document.getElementById("downlink");
        link.setAttribute("download", "Myimage");
        link.setAttribute("href", 'data:image/png;base64,'+this.data);


    },
    onStart()
    {
      this.startstatus=true;
    },
    onReplay()
    {
     this.startstatus=true;
      this.stickerpanel= false,
      this.imageuploaded=false,
      this.stickeredited= false,
      this.loader= false,
      this.activecrop= false,
      this.normalimg="";
      this.data="";
      this.$router.push({path:'/cartoonhome'})


    },
    processImage() {
      this.loader = true;
      axios
        .get(this.url + "/img?img=" + this.normalimg.split(",")[1])
        .then((response) => {
        
          if (response.status == 201 || response.status == 200) {
            this.data = response.data;
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
     this.imageuploaded=true;
      this.activecrop = false;
      this.stickeredited = true;
    },
    handleStickerPanel(val) {
      if(val==='off')
      {
        this.stickerpanel = false;
        this.imageuploaded=true;

      }else
      {
      this.stickerpanel = true;
       this.activecrop= false;
      this.imageuploaded=false;

      }
     
    },
    handleCrop()
    {
     this.activecrop=this.activecrop?false:true;
     this.croptext= this.croptext=='Save Crop'?'Crop':'Save Crop';
     this.stickerpanel=false;
  
    },
    change({ coordinates, canvas }) {
      this.cropimg = canvas.toDataURL("image/png");
      this.croptext = "Save Crop";
  
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
      this.inputval.name=files.name;
      this.inputval.size =parseFloat(files.size / 1024).toFixed(2)+'kb';


      reader.addEventListener("load", () => {
        this.normalimg = reader.result;
        this.imageuploaded=true;
  
        this.cropperimage = this.normalimg;
        this.handleCrop();
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Abel&family=Anton&family=Josefin+Sans&family=Lexend+Deca&family=Livvic:wght@500&family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Proxima+Nova');
.container-fluid {
  height: 82vh;
  max-height: 90vh;
  font-family: 'Montserrat', sans-serif;
background: linear-gradient(180deg, #EBFDFF 0%, #FFFFFF 100%);
}
.flex-container{
  display: inline-flex;
  width:100%;
  justify-content: space-around;

}

.savebtn,.downbtn{
background:#51C1CD;
padding:8px 25px;
border:none;
border-radius: 5px;
text-decoration: none;
color:white;
font-weight:600
}
.downcont{
  margin: 10px 0px;
}
.downbtn{
margin:20px 0px !important;
}
.headcontainer{
width: 1440px;
height: 104px !important;
left: 0px;
top: 73px;
border-radius: 0px;
padding: 40px, 80px, 20px, 80px;

}
.headcontainer > p{
  font-family: "Montserrat";
font-size: 36px;
font-style: normal;
font-weight: 400;
line-height: 44px;
margin-top:40px;
margin-bottom: 20px;
letter-spacing: 0em;
text-align: center;

}
.loadertxt{
	font-family: 'proxima-nova', sans-serif;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 23px;
letter-spacing: 0em;
text-align: center;

}
.cardactive{
  width:auto !important;
  height: 100% !important;
}
.outputhr{
  margin:26px 0px !important
}
.oldimg{
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
  width: 105px;
height: 105px;
   width:25%;
   border: 1px solid #B0B0B0;
filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
border-radius: 4px;
}

.headtxt{
  line-height: 59px;
  margin-bottom: 0px;
  font-size: 48px;
  text-align: center;

  color:black;
  font-weight: 400;
}
.hr{
  height: 0px;
width: 494px;
margin:20px 30%;
border: 1px solid #51C1CD


}
.card{
height: 390px;
width: auto !important;
margin-top:50px;
margin-bottom: 0px !important;
border: 1px solid #575757;
border-radius: 4px;
}
.card-img-top{
  width: 100% !important ;
  height: 100% !important;
}

.bottomheadtxt{
 font-family: "Montserrat",sans-serif;
font-size: 24px;
font-style: normal;
color:#404040;


font-weight: 400;
line-height: 29px;
letter-spacing: 0em;
text-align: center;
}
.addevent{
  background: #FFFFFF;
border: 1px solid #CCCCCC;
cursor: pointer;
box-sizing: border-box;
border-radius: 6px;
}


.htxt{
  margin-top:20px;
  margin-bottom: 0px;
}
.cropper{
  padding-top:50px;
  padding-bottom:100px;
  border-radius: 4px;

}

.innerflex{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.color {
  background-color: rgb(255, 255, 93);
  height: 40vh;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner{
  display: block;
  text-align: center;
  width: 100%;
  
}
.crop{
  border-radius: 4px;
}
.spinner > .spinner-border{

height: 64px;
width:64px;
font-style: normal;
font-size: 30px;
line-height: 74px;
letter-spacing: 0em;
text-align: center;

}
@media(max-width:1024px)
{
  .cropper{
    width:95vw;
    justify-content: center;
  }
}
.myloader{
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height: 100%;
background-color: rgba(245,245,245,0.5);; /* Black w/ opacity */

  z-index: 12px;
}
.mybtn{
  width: 10%;
  background:royalblue;
  border-radius:12px;
  color:white;
}
.maincont{
  background:url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700360787.jpg");
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
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

.br {
  outline: none;
}
.bottomheadtxt{
  margin:0px;
}

.disabled-link {
  cursor: default;
  pointer-events: none;
  text-decoration: none;
  padding:-5px;
  height: 0px;
  font-size: 1px;
  color: white;
}

label {
  font-size: 20px;
}

@media(max-width: 750px)
{
  .container-fluid{
    height: 100vh !important;
    max-height: 120vh !important;

    width: 100vw !important;
  }
  .crop{
    width:100vw;
  }
 
 .addevent{
   font-size: 14px;
   width:40%;
 }
  .htxt{
  margin-top:0px !important;
  font-size:20px !important;
  padding:2px 0px;
  
  margin-bottom: 0px;
}

  .mybtn{
    width:20%;
  }
  .headtxt{
   font-size: 22px !important;


  }
  .cropper{
    justify-content: center;
    width:95vw;
  }
  
  .hr{
    width:100%;
    margin-left:0px;
  }
  .card{
     width: 300px !important;
     height: 300px;

  }
  .card-img-top{
    width: 100%;
  }
}
@media(max-width:400px)
{
  .cropper{
    justify-content: center;
  }
  .hr{
    margin:5px;
  }
  .bottomheadtxt{
    font-size: 15px;
  }
  .addevent{
    padding:1px;
  }
  .outputhr{
  margin:6px 0px !important
}
.innerflex>.card{
  margin-top:10px
}
}
</style>
