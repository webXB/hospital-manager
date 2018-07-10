<template>
</template>

<script>
export default {
  created(){
    this.doLogin();
  },
  methods: {
    async doLogin() {
      let res = await this.$services.login({
        data: {
          account: 'wxb',
          pwd: '123'
        }
      });
      if (res) {
        console.log(res.data);
      }
    }
  }
}
</script>
