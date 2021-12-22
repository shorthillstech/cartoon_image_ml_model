require("./bootstrap");

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faTimes,faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

window.Vue = require("vue").default;

library.add(faUserSecret,faTimes,faDownload)

Vue.component('font-awesome-icon', FontAwesomeIcon)


import router from "./router";
import App from "./vue/App";

new Vue({
    el: "#app",
    components: {
        App
    },
    router
});
