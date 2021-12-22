import VueRouter from "vue-router";
import Vue from "vue";
import Cartoon from "./components/Cartoon.vue";
import Linkadd from "./components/Linkadd.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "Cartoon",
            component: Cartoon
        },
        {
            path: "/linkadd",
            name: "linkadd",
            component: Linkadd
        }
    ],
    mode: "history"
});