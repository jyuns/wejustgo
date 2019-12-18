<template>
    <div class='login-container'>

        <a-alert v-if='_authError.length' :message="_authError" type="error" showIcon closable @close='AUTH_ERROR("")' 
        style="position:absolute; top:50px; max-width:450px; width:100%;"/>
        <login-form/>
    </div>
</template>


<script>
import loginForm from '../components/form/loginForm.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  layout : 'empty',

  components : {
      loginForm,
  },

  methods : {
      ...mapMutations('auth', [
          'AUTH_ERROR'
      ])
  },

  computed : {
      ...mapState('auth', [
          '_authError'
      ])
  }
}
</script>

<style scoped>

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 100vh;
}

</style>