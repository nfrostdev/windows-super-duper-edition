import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTimes, faMinus, faUserCircle, faCog, faPowerOff} from '@fortawesome/free-solid-svg-icons'
import {faSquare, faFile, faImage} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faTimes, faMinus, faSquare, faUserCircle, faFile, faImage, faCog, faPowerOff)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
