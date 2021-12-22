<template>
  <div class="flex-container">
    <ul v-for="(val, index) in image" :key="index">
      <li @click="handleImage(val)"><img :src="val.img" class="imgsize" /></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: [
        {name:'cap',img:'http://mustachified.com/assets/hat3.png'},
        {name:'magician',img:'http://mustachified.com/assets/tophat.png'},
        {name:'glasses',img:'http://mustachified.com/assets/glasses.png'},
        {name:'boom',img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08qzqdi2kEgW7OWRx-fCkihH2xN3aqSB1oM8py3QzTA65MHu9eqb2zT1gRtPluMqorlQ&usqp=CAU"},
        {name:'wheels',img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8oibDuVnH99K3zUMrtjJFl5hbr3cd91LKw&usqp=CAU"},
        {name:'beard',img:'http://mustachified.com/assets/mustache3.png'}
      ],
    };
  },
  methods:{
      handleImage(val)
      {
          this.$emit("value",val);
      }
  }
};
</script>

<style>
.flex-container {
  display: flex;
  height: 50vh;
  overflow-y: auto;
  width: 110%;
  overflow-x: hidden;
  background: blueviolet;
  flex-direction: column;
}
ul{
    list-style-type: none;
}
.imgsize{
    width:150px;
}
</style>