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
  
export function getValueByPath(object, prop = '') {
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];

    if (!current) {
      break;
    }

    if (i === j - 1) {
      result = current[path];
      break;
    }

    current = current[path]
  }
  return result
}