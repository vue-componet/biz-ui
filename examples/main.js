import Vue from 'vue'
import App from './App'
import './index.css'

import BizUI from '@/index'

Vue.use(BizUI)

// Vue.component(MyButton.name, MyButton)

new Vue({
	render: h => h(App)
}).$mount('#app')