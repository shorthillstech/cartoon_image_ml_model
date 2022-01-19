<template>
  <div
    class="flex-container"
    :style="{ height: imageval.height > 300 ? imageval.height + 'px' : '50vh' }"
  >
    <div class="inline-row1">
      <div
        v-for="(value, index) in image"
        :key="index"
        :class="
          value.selected ? 'inline-col withcross' : 'inline-col withoutcross'
        "
      >
        <span class="fontawesome" v-if="value.selected" @click="handleCross(value)"
          ><img src="/images/times.png" /></span
        ><img :src="value.img" class="imgsize" @click="handleImage(value)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageval", "stickerRemoved"],
  data() {
    return {
      image: [
        { name: "mustache", img: "/images/mus.png", selected: false },
        { name: "mustache1", img: "/images/mustache1.png", selected: false },
        { name: "glasses1", img: "/images/sunglass.png", selected: false },
        {
          name: "beard",
          img: "/images/beard.png",
          selected: false,
        },
        { name: "glass1", img: "/images/glass1.png", selected: false },
        {
          name: "glasses3",
          img: "/images/sunglass2.png",
          selected: false,
        },
      ],
    };
  },
 
  methods: {
    CloseSticker(value) {
    
      if (value !== "" && value !== undefined) {
        let index = this.image.findIndex((vl) => vl.name == val.name);

        if (index >= 0) {
          this.image[findIndex].selected = false;
        }
      }
    },

    handleImage(value) {
      let index = this.image.findIndex((vl) => vl.name == value.name);
      if (index >= 0) {
        this.image[index].selected = true;
      }

      this.$emit("value", value);
    },
    handleCross(value) {
      this.$parent.RemoveSticker(value);
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  width: 371px;
  height: 450px;
  max-width: 371px;
  max-height: 450px;
  border: 1px solid black;
  overflow-y: auto;

  overflow-x: hidden;
  background: white;
  flex-direction: column;
}
.times-circle {
  text-align: right;
}

.inline-row1 {
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
  padding: 20px 0px;
  flex-wrap: wrap;
}
.inline-col {
  width: 140px;
  height: 120px;

  align-items: center;
}
.withcross {
  margin-top: -8px;
  margin-bottom: 0px;
}
.withoutcross {
  margin: 15px 0px;
}
.fontawesome {
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
}

ul {
  list-style-type: none;
}
li {
  flex-basis: 50%;
}
.imgsize {
  width: 100%;
  height: auto;
}

@media (max-width: 750px) {
  .flex-container {
    flex-direction: row;
    align-items: flex-start;
    overflow-y: hidden;
    overflow-x: hidden;
    max-width: 100% !important;
    width: 100% !important;

    flex-wrap: nowrap;
    justify-content: flex-start;
    max-height: 10vh;
  }
  .inline-row1 {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;

    margin: 0px;
  }
  .imgsize {
    width: 55px;
  }
  .inline-col {
    width: 20%;
    width: 100%;
    margin: 0px 5%;
    height: 100%;
  }
}
</style>