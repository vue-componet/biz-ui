import Vue from 'vue'
import App from './App'
import './index.css'

import BizUI from '@/index'

Vue.use(BizUI)

// Vue.component(MyButton.name, MyButton)

// document.addEventListener('click', (e) => {
// 	console.log(e)
// })

new Vue({
	render: h => h(App)
}).$mount('#app')