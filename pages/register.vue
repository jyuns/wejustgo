<template>
  <div class='register-container'>
  <ClientOnly>

    <a-alert v-if='_authError.length' :message="_authError" type="error" showIcon closable 
    style="position:absolute; top:50px; max-width:450px; width:100%;"/>
    
  </ClientOnly>

      <register-form/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import registerForm from '../components/form/registerForm.vue'
export default {
  layout : 'empty',
  
  computed : {
    ...mapState('auth', [
        '_authError'
    ])
  },

  components : {
    registerForm
  }

}
</script>

<style>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
}
</style>