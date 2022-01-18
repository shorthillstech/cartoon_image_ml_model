import VueRouter from "vue-router";
import Vue from "vue";
import FrontHandler from "./components/Cartoons/CartoonFrontHandler"
import CartoonHandler from "./components/Cartoons/CartoonMainHandler";
import Linkadd from "./components/Linkadd.vue"


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {     
            path:"/cartoonhome",
            name:'FrontHandler',
            component:FrontHandler

        },
        {     
            path:"/",
            name:'FrontHandler',
            component:FrontHandler

        },
        {
            path: "/cartoon",
            name: "CartoonHandler",
            component: CartoonHandler
        },
        {
            path: "/linkadd",
            name: "Linkadd",
            component: Linkadd
        },
    ],
    mode: "history"
});