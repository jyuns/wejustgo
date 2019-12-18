<template>
  <a-form :form="form" @submit="handleSubmit"
  class='register-form'
  style='padding:0 32px!important;'>

    <a-form-item class='txt-logo' style='color:#2A7FF6'>
        WEJUSTGO
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="이메일 계정">
      <a-input
        v-decorator="[
          'email',
          
          {
            rules: [
              {
                required: true,
                message: '이메일을 입력해 주세요',
              },
              {
                  validator : validateEmail,
              }
            ],
          },
        
        ]"
      />

    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="비밀번호">
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '비밀번호를 입력해 주세요',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="확인 비밀번호">
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '확인 비밀번호를 입력해 주세요',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    
      <a-button type="primary" html-type="submit"
      style='width:100%;'>
        가입하기
      </a-button>
    
  </a-form>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      confirmDirty: false,

      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },

  methods: {
    ...mapActions('auth', [
        'REGISTER', 'DUPLICAT_CHECK'
    ]),

    async duplicateCheck() {
      return await this.DUPLICAT_CHECK({
        email : this.form.getFieldValue('email')
      })      
    },

    validateEmail(rule, value, callback) {
      var regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]{2,8}/

      if(!value.match(regExp)) {
          callback('유효하지 않은 이메일입니다.')
        }   
    },

    async handleSubmit(e) {
      e.preventDefault();
      var regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]{2,8}/
      var duplicateResult = await this.duplicateCheck()
      
      const form = this.form;

      if(duplicateResult &&
         (form.getFieldValue('password') == form.getFieldValue('confirm')) &&
          form.getFieldValue('email').match(regExp)) {
        
          const result = await this.REGISTER({
            email : form.getFieldValue('email'),
            password : form.getFieldValue('password'),
          })

          if(result) this.$router.push('/login')
        }
    },

    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },

    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('위 비밀번호와 일치하지 않습니다');
      } else {
        callback();
      }
    },

    // ! 추후 비밀번호 정규식 도입하기
    // ! 추후 가입 완료 후, rotuer.go(-1)하기
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
};
</script>

<style>

.register-form {
    max-width:600px;
    width:100%;
}

.ant-form-item-label  {
    text-align: left!important;
}

</style>