let nodeList = []

document.addEventListener('click', (e) => {
  nodeList.forEach((node) => {
    if (node !== e.target) {
      node['@@clickoutsideContext'].documentHandler()
    }
  })
})

export default {
  bind (el, binding, vnode) {
    nodeList.push(el)
    el['@@clickoutsideContext'] = {
      documentHandler: binding.value,
    }
  }
}