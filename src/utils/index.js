export function dispatch({ vueInstance, componentName, eventName, params }) {
  let parent = vueInstance.$parent || vueInstance.$root;
  let name = parent.$options.componentName;

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.componentName;
    }
  }

  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params));
  }
}
  