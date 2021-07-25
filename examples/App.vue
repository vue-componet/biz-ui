<template>
  <div class="scroll">
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <p>-------------</p>
    <biz-select>
      <biz-option label="aaaaa"></biz-option>
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
      list: [1,2,3]
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