import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { AxiosRepository } from '@/repository/axiosRepository'

declare module "*.vue" {
    import Vue from 'vue'
    export default Vue;
}

// TypeScriptでの動作のために型定義
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter,
        $route: Route
        // Vueインスタンスから$axiosRepositoryを使用可能に
        readonly $axiosRepository: AxiosRepository;
    }
}

// this.$nuxt.contextから$axiosRepositoryを使用可能に
declare module '@nuxt/types' {
    interface NuxtAppOptions {
        readonly $axiosRepository: AxiosRepository;
    }
    interface Context {
        readonly $axiosRepository: AxiosRepository;
    }
}