import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'

declare module "*.vue" {
    import Vue from "vue";
    const _default: Vue;
    export default _default;
}

declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter
    }
}