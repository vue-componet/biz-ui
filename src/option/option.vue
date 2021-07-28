<template>
  <div :class="['biz-option', optionStyle]" @click.stop="onClick">
    <slot>
      <span>{{ label }}</span>
    </slot>
  </div>
</template>

<script>
import { dispatch, getValueByPath } from "@/utils";
export default {
  name: "biz-option",
  inject: ["bizSelect"],
  props: {
    label: [String, Number],
    value: {
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHover: false,
    };
  },
  computed: {
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]'
    },
    optionStyle() {
      return {
        'is-hover': this.isHover,
        'is-selected': this.itemSelected,
        'is-disabled': this.disabled
      }
    },
    itemSelected() {
      return this.isEqual(this.value, this.bizSelect.value)
    }
  },
  created() {
    this.bizSelect.options.push(this);
  },
  methods: {
    onClick() {
      if (this.disabled || this.isSelected) {
        return
      }
      dispatch({
        vueInstance: this,
        componentName: "biz-select",
        eventName: "handleSelectOption",
        params: [this],
      });
    },
    isEqual(a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        const valueKey = this.bizSelect.valueKey
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
.biz-option {
  height: 34px;
  padding: 0 20px;
  line-height: 34px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  &:not(.is-disabled):hover {
    background: #f5f7fa;
  }
  &.is-hover {
    background: #f5f7fa;
  }
  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  &.is-selected {
    font-weight: 700;
    color: #409eff;
  }
}
</style>