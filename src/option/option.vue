<template>
  <div :class="['biz-option', optionStyle]" @click.stop="onClick">
    <slot>
      <span>{{ label }}</span>
    </slot>
  </div>
</template>

<script>
import { dispatch } from "@/utils";
export default {
  name: "biz-option",
  inject: ["bizSelect"],
  props: {
    label: String,
    value: {
      require: true
    },
  },
  data() {
    return {
      isHover: false,
      isSelected: true,
      isDisabled: false
    };
  },
  computed: {
    optionStyle() {
      return {
        'is-hover': this.isHover,
        'is-selected': this.isSelected,
        'is-disabled': this.isDisabled
      }
    }
  },
  created() {
    this.bizSelect.options.push(this);
  },
  methods: {
    onClick() {
      if (!this.isDisabled || !this.isSelected) {
        dispatch({
          vueInstance: this,
          componentName: "biz-select",
          eventName: "handleSelectOption",
          params: [this],
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.biz-option {
  &.is-hover {
    background: #f5f7fa;
  }
  &.is-selected {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>