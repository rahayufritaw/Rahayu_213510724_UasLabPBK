<template>
  <div class="location-widget">
    <h2>Widget Lokasi</h2>
    <div v-if="latitude && longitude" class="location-coordinates">
      <p>Latitude: {{ latitude }}</p>
      <p>Longitude: {{ longitude }}</p>
    </div>
    <div v-else>
      <p class="loading-message">Sedang Mencari Latitude dan Longitude Anda</p>
    </div>
    <button @click="fetchLocationDetails" class="find-button">Cari Lokasi Detail Anda</button>

    <div v-if="foundLocation" class="location-details">
      <h3>Detail Lokasi Anda</h3>
      <p><strong>Negara   :</strong> {{ foundLocation.components.country }}</p>
      <p><strong>Kota     :</strong> {{ foundLocation.components.city }}</p>
      <p><strong>Kode Pos :</strong> {{ foundLocation.components.postcode }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      inputLatitude: '',
      inputLongitude: '',
      foundLocation: null,
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    }
  },
  methods: {
    getPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    async fetchLocationDetails() {
      try {
        const apiKey = '92591005a7b94008909d59a64b6d2a49';
        const latitude = this.inputLatitude || this.latitude;
        const longitude = this.inputLongitude || this.longitude;
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          latitude + ',' + longitude
        )}&key=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const location = data.results[0];
          this.foundLocation = location;
          console.log('Location:', location);
          // Do something with the found location data
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    },
  },
};
</script>

<style scoped>

.location-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  background-color: #FCAEAE;
  border-radius: 8px;
  max-width: 80%;
  margin:0 auto;

}

.location-widget h2 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.location-widget p {
  color: #fff;
}

.location-coordinates {
  margin-bottom: 20px;
}

.loading-message {
  margin-top: 20px;
  color: #fff;
}

.location-input {
  margin-top: 20px;
}

.find-button {
  margin-top: 5px;
  padding: 10px 20px;
  background-color: #FF6666;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.find-button:hover {
  background-color: #FF8989;
}

.location-details {
  margin-top: 20px;
  text-align: center;
}

.location-details h3 {
  margin-bottom: 10px;
  color: #fff;
  font-size: 18px;
}

.location-details p {
  color: white;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>