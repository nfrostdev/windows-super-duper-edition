import Vue from 'vue'
import Vuex from 'vuex'
import ErrorMessage from "@/components/ErrorMessage"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        spawnErrorMessage(context, payload) {
            return new Promise(resolve => {
                const errorMessage = Vue.extend(ErrorMessage);
                const instance = new errorMessage({
                    propsData: {
                        content: payload.content,
                        isRandomlyPositioned: payload.isRandomlyPositioned
                    }
                });
                instance.$mount();
                document.body.appendChild(instance.$el);
                resolve();
            })
        }
    },
})
