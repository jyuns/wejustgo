<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    style='padding:0 32px!important;'
    @submit="handleSubmit"
  >
    <a-form-item class='txt-logo' style='color:#2A7FF6'>
        WEJUSTGO
    </a-form-item>

    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '아이디가 입력되지 않았어요!' }] },
        ]"
        placeholder="이메일을 입력해 주세요."
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '비밀번호가 입력되지 않았어요!' }] },
        ]"
        type="password"
        placeholder="비빌번호를 입력해 주세요."
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: false,
          },
        ]"
      >
        아이디 저장
      </a-checkbox>
      <a class="login-form-forgot" href="/password">
        비밀번호 찾기
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        로그인
      </a-button>
      WEJUSTGO 아이디가 없나요? 그럼
      <a href="/register">
        가입해요!
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapMutations , mapActions, mapState } from 'vuex'

export default {

    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },

    mounted() {
      // * 이메일이 Cookie에 저장되어 있을 경우, 이메일 호출
      this.form.setFieldsValue({
        userName : this._remember
      })

      // * 이메일이 저장되어 있을 경우, 체크박스 표시
      if(this._remember.length) {
        this.form.setFieldsValue({
          remember : true
        })
      }
    },

    computed: {
      ...mapState('auth', [
        '_remember'
      ])
    },

    methods: {

    ...mapActions('auth', [
        'LOGIN'
    ]),

    handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields( async (err, values) => {
          if (!err) {
              this.LOGIN({
                  email : values.userName,
                  password : values.password,
                  remember : values.remember,
              }).then( (success) => {
                // ? login success 시, true 값 반환함
                if(success) {
                  this.$router.push('/')
                }
              })
          }
        });
    },
    },
    };
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 400px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>