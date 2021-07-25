<template>
  <div class="biz-popover">
    <div ref="tigger" class="biz-popover__box">
      <slot name="reference"></slot>
    </div>
    <transition name="popover">
      <div
        v-show="showPopover"
        :style="{zIndex}"
        ref="popover"
        role="popover"
        class="biz-popover__popover"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import PopupManager from "@/utils/popover"

const toggleState = (type = "focus", target = document) => {
  let inputDom = target.querySelector("input");
  if (inputDom) {
    inputDom[type]();
  } else {
    target.setAttribute("tabindex", type === "focus" ? "0" : "-1");
  }
};

const eventMap = {
  hover: ["mouseenter", "mouseleave"],
  click: ["click"],
  focus: ["click"],
  manual: "",
};

export default {
  name: "biz-popover",
  components: {},
  props: {
    // 触发模式
    trigger: {
      type: String,
      default: "hover",
      validator: (v) => {
        return Object.keys(eventMap).includes(v);
      },
    },
    // trigger为manual模式时生效，popover的显示状态
    visible: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      popperInstance: null,
      showPopover: false,
      zIndex: 0,
    };
  },
  watch: {
    trigger: {
      handler: function (val, oldVal) {
        if (val === "manual") {
          this.showPopover = this.visible;
        } else {
          this.showPopover = false;
        }
        this.$nextTick(() => {
          let tiggerRef = this.$refs.tigger;
          this.useEventListener({
            type: "addEventListener",
            eventName: val,
            tigger: tiggerRef,
          });
          if (oldVal) {
            this.useEventListener({
              type: "removeEventListener",
              eventName: oldVal,
              tigger: tiggerRef,
            });
          }
        });
      },
      immediate: true,
    },
    visible: {
      handler: function (val) {
        if (this.trigger === "manual") {
          this.showPopover = val;
        } else {
          this.showPopover = false;
        }
      },
      immediate: true,
    },
  },
  created() {
    this.zIndex = PopupManager.zIndex
    PopupManager.nextZIndex()
  },
  mounted() {
    let tiggerRef = this.$refs.tigger;
    let popover = this.$refs.popover;

    if (this.appendToBody) {
      document.body.append(popover);
    }

    this.popperInstance = createPopper(tiggerRef, popover, {
      strategy: 'fixed',
      placement: this.placement,
      modifiers: [
        {
          name: 'flip',
        }
      ]
    });
  },
  beforeDestroy() {
    let triggerRef = this.$refs.trigger
    if (triggerRef) {
      this.useEventListener({
        type: "removeEventListener",
        eventName: this.trigger,
        tigger: triggerRef,
      });
    }
    if (this.appendToBody && this.$refs.popover && this.$refs.popover.parentNode) {
      this.$refs.popover.parentNode.removeChild(this.$refs.popover);
    }
  },
  methods: {
    showP(e) {
      e.stopPropagation();
      if (this.trigger === "focus") {
        this.$nextTick(() => {
          toggleState("focus", this.$refs.tigger);
          this.$emit("focus");
        });
      }
      this.popperInstance.update();
      this.showPopover = true;
      this.$emit("show-popover");
    },
    hideP(e) {
      e.stopPropagation();
      if (this.trigger === "focus") {
        this.$nextTick(() => {
          toggleState("blur", this.$refs.tigger);
          this.$emit("blur");
        });
      }
      this.showPopover = false;
    },
    useEventListener(
      options = { type: "addEventListener", eventName: "hover", tigger: null }
    ) {
      let { type, eventName, tigger } = options;
      if (eventName !== "manual") {
        if (eventName === "hover") {
          eventMap[eventName].forEach((eName, index) => {
            tigger[type](eName, index === 0 ? this.showP : this.hideP);
          });
        } else {
          tigger[type](eventMap[eventName][0], this.showP, true);
          document[type]("click", this.hideP);
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.biz-popover {
  display: inline-block;
  &__box {
    display: inline-block;
  }
}

.popover {
  &-enter, &-leave-to {
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition: opacity 0.3s ease;
  }

  &-enter-to, &-leave {
    opacity: 1;
  }
}
</style>
