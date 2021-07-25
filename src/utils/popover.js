let hasInitZIndex = false;
let zIndex;
// const instances = {};

const PopupManager = {
  // register: (id, instance) => {
  //   if (id && instance) {
  //     instances[id] = instance;
  //   }
  //   PopupManager.nextZIndex()
  // },
  // deregister: (id) => {
  //   if (id) {
  //     instances[id] = null;
  //     delete instances[id];
  //   }
  // },
  // getInstance: (id) => {
  //   return instances[id];
  // },
  nextZIndex: () => {
    return PopupManager.zIndex++;
  },
}

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || 2000;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  }
})

export default PopupManager;