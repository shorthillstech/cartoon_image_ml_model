<template>
  <div class="grid-container">
    <div>
      <cartoon-header />

      <hr :style="{ border: '1px solid #CCCCCC', margin: '0px' }" />
    </div>
    <div class="maincontent">
      <cartoon />
    </div>
    <div class="mainfooter">
      <cartoon-footer />
    </div>
  </div>
</template>

<script>
import Cartoon from "./Cartoon.vue";
import CartoonFooter from "./CartoonFooter.vue";
import CartoonHeader from "./CartoonHeader.vue";
export default {
  name: "CartoonHandler",
  data() {
    return {
      route: "",
    };
  },
  mounted() {
    this.route = this.$route.path;
  },
  components: { Cartoon, CartoonFooter, CartoonHeader },
};
</script>

<style scoped>
.grid-container {
  display: grid;

  grid-template-columns: repeat(1, fr);
}
.mainfooter {
}

  .maincontent{
    height: 85vh !important;
  }
  @media(max-width: 1500px)
  {
    .maincontent{
      height: 90vh !important;
    }
  }

@media (max-width: 750px) {
  .grid-container {
  }
}
</style>