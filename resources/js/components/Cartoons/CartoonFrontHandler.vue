<template>
  <div class="grid-container">
    <div class="maincontent">
      <cartoon-front-page />
    </div>
    <div class="mainfooter">
      <cartoon-footer />
    </div>
  </div>
</template>

<script>
import CartoonFooter from "./CartoonFooter.vue";
import CartoonFrontPage from "./CartoonFrontPage.vue";

export default {
  name: "FrontHandler",
  data() {
    return {
      route: "",
    };
  },
  mounted() {},
  components: { CartoonFooter, CartoonFrontPage },
};
</script>

<style scoped>
.grid-container {
  display: grid;

  grid-template-columns: repeat(1, fr);
}

@media (max-width: 991px) {
  .grid-container {
  }
  .maincontent{
    margin-bottom: 145px;
  }
  .mainfooter {
    position: fixed;
    width: 100vw;
    bottom: 0;
  }
}
</style>