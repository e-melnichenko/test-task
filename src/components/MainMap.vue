<template>
  <v-container>
    <v-row>
      <v-col>
        <l-map style="height: 350px" :zoom="zoom" :center="center">
          <l-tile-layer :url="url"/>
            <l-marker
              v-for="item in items"
              :key="item.id"
              :lat-lng="item.coords"
            />
        </l-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';

  //fix default icon showing
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  export default {
    name: 'MainMap',

    components: { LMap, LTileLayer, LMarker },

    props: {
      center: Array,
      items: Array,
    },

    data () {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        zoom: 10,
      };
    },
  }
</script>
