<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            name="search"
            label="Поиск"
            v-model="search"
            required
          />
          <v-btn color="green" type="submit" class="mr-4 white--text">
            Найти
          </v-btn>
          <v-btn color="blue" type="button" class="white--text" @click="resetForm">
            Сброс
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>

            <v-list-item v-for="item in items" :key="item.id">
              <v-btn text @click="$emit('change-active', item.id)" :id="item.id" :color="item.active ? 'blue' : ''">
                {{ item.name }}
              </v-btn>
            </v-list-item>

        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "SearchForm",

    props: {
      items: Array,
    },

    data() {
      return {
        search: '',
      }
    },

    methods: {
      handleSubmit() {
        this.$emit('update-items', this.search)
      },

      resetForm() {
        this.search = '';
        this.$emit('update-items', '')
      },
    }
  }
</script>

<style scoped>

</style>
