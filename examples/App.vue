<template>
  <div class="scroll">
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <biz-select v-model="selectValue">
      <biz-option 
        v-for="(option, index) in options"
        :key="index"
        :label="option.label"
        :value="option"
      ></biz-option>
    </biz-select>
    <biz-select>
      <biz-option>123456</biz-option>
    </biz-select>
    <biz-select>
      <biz-option>123456</biz-option>
    </biz-select>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      list: [1,2,3],
      selectValue: '',
      options: [
        {
          label: 'option1',
          value: 'option1111'
        },
        {
          label: 'option2',
          value: 'option2223'
        },
        {
          label: 'option3',
          value: 'option3333'
        },
      ]
    }
  },
  methods: {
    test() {
      this.list.map(item => {
        return item
      })
      console.log(this.list)
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll
  height 200px
  overflow-y scroll
  p
    margin 20px 0
</style>