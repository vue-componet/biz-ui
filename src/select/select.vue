<template>
  <span>
    <BizPopover
      :visible="isFocus"
      trigger="manual"
      class="biz-select"
    >
      <div
        ref="reference"
        slot="reference"
        :class="['biz-select__reference', { focus: isFocus }]"
        @click="toggleFocus"
      >
        <input
          v-model="inputValue"
          v-clickoutside="clickoutside"
          ref="input"
          type="text"
          class="biz-select__input"
        />
      </div>
      <div :style="optionsStyle" class="biz-select__options">
        <slot></slot>
      </div>
    </BizPopover>
  </span>
</template>

<script>
import BizPopover from "@/popover/popover";
import clickoutside from "@/utils/clickoutside";
export default {
  name: "biz-select",
  componentName: "biz-select",
  directives: { clickoutside },
  components: {
    BizPopover,
  },
  provide() {
    return {
      bizSelect: this,
    };
  },
  props: {
    value: {
      require: true
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      inputValue: "",
      isFocus: false,
      boxRect: null,
      options: [],
    };
  },
  computed: {
    optionsStyle() {
      return {
        minWidth: `${this.boxRect?.width}px`,
      };
    },
  },
  created() {
    this.$on("handleSelectOption", this.handleSelectOption);
  },
  mounted() {
    this.boxRect = this.$refs.reference.getBoundingClientRect();
  },
  methods: {
    clickoutside() {
      this.isFocus = false
    },
    handleSelectOption(optionInstance) {
      console.log("1233", optionInstance);
    },
    toggleFocus(e) {
      this.isFocus = !this.isFocus;
    },
  },
};
</script>

<style lang="stylus" scoped>
.biz-select {
  &__reference {
    height: 30px;
    border-radius: 4px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;

    &.focus {
      border: 1px solid #1e88e5;
    }
  }

  &__input {
    height: 100%;
    padding: 0 10px;
    border: none;
    background: transparent;
    outline: none;
  }

  &__options {
    box-sizing: border-box;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>