import Loadable from 'react-loadable';
import MyLoadingComponent from "../../Components/common/u-loading"

const load = (loader: any) =>
    Loadable({
        loader: loader,
        loading: MyLoadingComponent
    });

export const urlObj = {
    loading: {
        name: '字典管理',
        link: '/loading',
        component: load(() => import('./loading')),
        needAuth: false
    },

    register: {
        name: '字典管理',
        link: '/register',
        component: load(() => import('./register')),
        needAuth: false
    },
    findPwd: {
        name: '字典管理',
        link: '/findPwd',
        component: load(() => import('./findPwd')),
        needAuth: false
    }
};

const { loading, register, findPwd } = urlObj;

export const routes = {loading, register, findPwd};