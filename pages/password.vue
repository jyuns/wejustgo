<template>
    <div class='password-container'>
    <a-form :form="form" @submit="handleSubmit"
    class="password-form"
    style='padding:0 32px!important;'>

    <a-form-item class='txt-logo' style='color:#2A7FF6'>
        WEJUSTGO
    </a-form-item>

      <a-form-item label="비밀번호를 찾을 이메일을 입력해 주세요">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: '비밀번호 변경 링크를 받을 이메일을 입력해 주세요.' }],
            },
          ]"
        />
      </a-form-item>
      <a-button type="primary" html-type="submit"
      style='width:100%;'>
        비밀번호 변경 링크 보내기
      </a-button>
      
      <a-button type="link" @click='goBack'
      style="padding:8px 0">
          뒤로가기
      </a-button>

    </a-form>
  </div>
</template>

<script>
export default {
  layout : 'empty',
  
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },

  methods: {
    handleSubmit(e) {

    },

    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

.password-form {
    max-width:400px;
    width:100%;
}

.password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 100vh;
}
</style>