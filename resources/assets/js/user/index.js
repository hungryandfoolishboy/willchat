import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import { Loading } from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-default/index.css';
import '../../sass/user.scss';
import { mapState } from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store/index';
import userConfig from './config';
import routes from './routes.js';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);

axios.defaults.baseURL = userConfig.apiRoot;
axios.defaults.timeout = userConfig.timeout;

const router = new VueRouter({
  mode: 'history',
  base: '/user/',
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING', true);

  store.commit('UPDATE_TOPMENU_VISIBLE', to.matched.some(record => record.meta.topmenuVisible));
  store.commit('UPDATE_SIDEBAR_VISIBLE', to.matched.some(record => record.meta.sidebarVisible));

  if (to.matched.some(record => record.meta.requiresAuth) && !window.localStorage.getItem(userConfig.jwtTokenName)) {
    // 需要登录后访问的页面，redirect 参数用于登录完成后跳转
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  next();
});

router.afterEach((to, from) => {
  store.commit('UPDATE_LOADING', false);
});

// axios 请求发送前处理
axios.interceptors.request.use((config) => {
  store.commit('UPDATE_LOADING', true);

  let token = window.localStorage.getItem(userConfig.jwtTokenName);
  config.headers.Authorization = 'bearer ' + token;

  // 如果当前选中了公众号，则在请求中加入对数
  let accountId = window.localStorage.getItem('willchat_account_id');
  if (accountId) {
    config.headers.AccountId = accountId;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// axios 得到响应后处理
axios.interceptors.response.use((response) => {
  store.commit('UPDATE_LOADING', false);

  const newToken = response.headers.authorization;
  if (newToken) {
    window.localStorage.setItem(userConfig.jwtTokenName, newToken.replace(/^bearer\s?/i, ''));
  }

  return response;
}, (error) => {
  store.commit('UPDATE_LOADING', false);

  if (error.response) {
    if (error.response.status === 401) {
      window.localStorage.removeItem(userConfig.jwtTokenName);

      router.push('/login');
    } else if (error.response.status === 403) {
      // 无权限时统一提示
      app.error('无操作权限');
      return;
    } else {
      // 其它错误统一提示
      app.error(error.response.data);
      return;
    }
  } else {
    // 请求超时提示
    if (error.code === 'ECONNABORTED') {
      app.error('请求超时，请重试');
    }
  }

  return Promise.reject(error);
});

const app = new Vue({
  // 路由器
  router,

  // vuex store
  store,

  components: {
    'topmenu': require('./components/topmenu.vue'),
    'sidebar': require('./components/sidebar.vue')
  },

  computed: {
    ...mapState({
      user: state => state.user,
      accounts: state => state.accounts,
      isLoading: state => state.isLoading,
      topmenuVisible: state => state.topmenuVisible,
      sidebarVisible: state => state.sidebarVisible
    })
  },

  data: {
    loadingInstance: null
  },

  methods: {
    success (msg) {
      this.$message({
        message: msg,
        type: 'success',
        duration: 1000
      });
    },

    warning (msg) {
      this.$message({
        message: msg,
        type: 'warning',
        duration: 1000
      });
    },

    info (msg) {
      this.$message({
        message: msg,
        type: 'info',
        duration: 1000
      });
    },

    error (msg) {
      this.$message({
        message: msg,
        type: 'error',
        duration: 2000
      });
    }
  },

  watch: {
    'isLoading': function (value) {
      if (value) {
        this.loadingInstance = Loading.service({
          text: 'Loading',
          customClass: 'my-loading-mask'
        });
      } else {
        this.loadingInstance && this.loadingInstance.close();
      }
    }
  },

  destroy () {
    this.loadingInstance = null;
  }
}).$mount('#app');