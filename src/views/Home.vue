<template>
  <div>
    <search-form @change-active="handleChangeActive" :items="items" @update-items="updateItems" :loading="loading"/>
    <main-map :center="center" :items="items"/>
  </div>
</template>

<script>
  import SearchForm from "../components/SearchForm";
  import MainMap from "../components/MainMap";
  import {getGeoItems} from "../api";

  export default {
    name: 'Home',

    components: {
      MainMap,
      SearchForm,
    },

    data() {
      return {
        rawItems: [],
        activeId: null,
        loading: false,
      }
    },

    computed: {
      items() {
        return this.rawItems.map(item => ({
          name: item.display_name,
          id: item.place_id,
          coords: [item.lat, item.lon],
          active: this.activeId === item.place_id,
        }));
      },

      center() {
        return this.activeId ? this.items.find(i => i.active)?.coords : [55.7, 37.6,]
      }
    },

    methods: {
      handleChangeActive(id) {
        this.activeId = id;
      },

      updateItems(query) {
        if(query.trim() === '') {
          this.rawItems = [];
          this.activeId = null;
          return
        }

        this.loading = true;
        getGeoItems(query)
          .then(items => {
            this.rawItems = items;
            if(items.length) this.activeId = this.items[0].id;
          })
          .finally(() => this.loading = false)
        },
    }
  }
</script>
