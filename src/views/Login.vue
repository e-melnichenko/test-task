<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-form class="pt-16" @submit.prevent="handleSubmit">
          <v-text-field
            label="Логин"
            v-model="login"
            :error="error"
            required
            @input="error=false"
          />
          <v-text-field
            label="Пароль"
            v-model="password"
            required
            :error="error"
            @input="error=false"
          />
          <v-btn
            type="submit"
            class="mt-4"
            color="success"
          >Войти</v-btn>
          <p class="error--text mt-4" v-if="error && errorText">{{ errorText }}</p>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {loginUser} from "../api";
  import {isAuthenticated} from "../helpers";

  export default {
    name: "Login",

    isAuthenticated: isAuthenticated(),

    data() {
      return {
        login: '',
        password: '',
        error: false,
        errorText: '',
      }
    },

    methods: {
      handleSubmit() {
        loginUser(this.login, this.password)
          .then(this.handleLoginRes)
      },
      handleLoginRes(res) {
        if(res.ok) {
          this.successLogin(res.key)
        } else {
          this.error = true;
          this.errorText = res.statusText;
        }
      },
      successLogin(key) {
        document.cookie = `auth-token=${key}; path=/; expires=${this.getExpiresDate()}`
        this.$router.push('/')
      },
      getExpiresDate() {
        const date = new Date();
        date.setHours(date.getHours() + 12);
        return (date.toUTCString())
      }
    }


  }
</script>

<style scoped>

</style>
