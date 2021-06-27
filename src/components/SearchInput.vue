<template>
    <v-autocomplete
        v-model="model"
        :search-input.sync="search"
        :items="items"
    />
</template>

<script >
    export default {
        name: 'SearchInput',
        data() {
            return {
                model: null,
                search: null,
                entries: [],
            }
        },

        computed: {
            items() {
                return this.entries.map(entry => {
                    return entry.display_name
                })
            }
        },

        watch: {
            search(val) {
                fetch(`https://nominatim.openstreetmap.org/?q=${val}&format=json`)
                    .then(res => res.json())
                    .then(data => this.entries = data);
            }
        }
    }
</script>