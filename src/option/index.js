import Option from './option'

Option.install = function(Vue) {
  Vue.component(Option.name, Option)
}

export default Option