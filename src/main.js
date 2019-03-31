import Vue from 'vue'
import App from './App.vue'
import './assets/main.less'
import { Input, Button, Message, Loading } from 'element-ui'

Vue.use(Input)
Vue.use(Button)
Vue.use(Loading)

Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
