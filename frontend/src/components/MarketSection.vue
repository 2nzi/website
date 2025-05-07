<template>
  <div class="market-side">
    <div class="sticky-content">
      <div class="map-container">
        <div id="map"></div>
        <div class="market-info" v-if="selectedMarket">
          <h3>{{ selectedMarket.location }}</h3>
          <p class="date">{{ selectedMarket.date }}</p>
          <p>{{ selectedMarket.venue }}</p>
          <p v-if="selectedMarket.address">{{ selectedMarket.address }}</p>
          <a v-if="selectedMarket.link" 
             @click.prevent="handleInfoClick(selectedMarket)" 
             :href="selectedMarket.link" 
             target="_blank">Plus d'informations</a>
        </div>
      </div>
    </div>
    
    <!-- Nouvel overlay pour l'image -->
    <div v-if="showImageOverlay" class="image-overlay" @click="showImageOverlay = false">
      <div class="overlay-content">
        <img src="@/assets/affiche_marche.png" alt="Affiche Nantes">
        <button class="close-button" @click="showImageOverlay = false">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
                                                                  
export default {
  name: 'MarketSection',
  data() {
    return {
      selectedMarket: null,
      showImageOverlay: false,
      markets: [
        {
          location: 'NANTES',
          date: 'Samedi 17/05/2025 et Dimanche 18/05/2025',
          venue: 'Le Solilab',
          address: '8 Rue St Domingue, 44000 Nantes',
          link: 'https://www.facebook.com/solilabnantes/?locale=fr_FR',
          coordinates: [47.2010925, -1.5702397]
        },
        {
          location: 'ANCENIS',
          date: 'Jeudi 20/05/2025',
          venue: 'Le marché de l\'Ascension',
          address: '9 rue Rouget de l\'Isle',
          link: 'https://ancenis-saint-gereon.fr/le-marche-de-lascension/',
          coordinates: [47.3682464, -1.1844303]
        },
        {
          location: 'LA CHAPELLE SUR ERDRE',
          date: 'Dimanche 15/06/2025',
          venue: 'Foire a tout',
          address: 'Centre ville',
          link: '',
          coordinates: [47.299999,  -1.55]
        },
      ]
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
      }).setView([47.15, -1.45], 10)
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 13,
        minZoom: 5
      }).addTo(map)

      const customIcon = {
        default: L.divIcon({
          className: 'custom-marker',
          html: '<div class="marker-inner"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        }),
        selected: L.divIcon({
          className: 'custom-marker selected',
          html: '<div class="marker-inner"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }

      const markers = {}
      let currentSelectedMarker = null

      this.markets.forEach(market => {
        const marker = L.marker(market.coordinates, {
          icon: customIcon.default
        }).addTo(map)

        markers[market.location] = marker

        marker.on('click', () => {
          // Désélectionner le marqueur précédent s'il existe
          if (currentSelectedMarker) {
            currentSelectedMarker.setIcon(customIcon.default)
          }
          // Sélectionner le nouveau marqueur
          marker.setIcon(customIcon.selected)
          currentSelectedMarker = marker
          this.selectedMarket = market
        })
      })

      // Sélectionner le premier marché par défaut
      this.selectedMarket = this.markets[0]
      markers[this.markets[0].location].setIcon(customIcon.selected)
      currentSelectedMarker = markers[this.markets[0].location]
    },
    handleInfoClick(market) {
      if (market.location === 'NANTES') {
        this.showImageOverlay = true;
      } else {
        window.open(market.link, '_blank');
      }
    }
  }
}
</script>

<style scoped>
:deep(.custom-marker) {
  background: transparent;
  border: none;
}

:deep(.custom-marker .marker-inner) {
  width: 100%;
  height: 100%;
  background-color: #1D5891;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white;
}

:deep(.custom-marker.selected .marker-inner) {
  background-color: #00253F;
}

.market-side {
  flex: 1;
  position: relative;
}

.sticky-content {
  position: sticky;
  top: 10vh;
  height: 90vh;
  padding: 4rem;
  display: flex;
  flex-direction: column;
}

.map-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#map {
  flex: 2;
  border-radius: 12px;
  border: 1px solid #eee;
}

.market-info {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #00253F;
}

.market-info h3 {
  color: #00253F;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.market-info .date {
  color: #1D5891;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.market-info p {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}

.market-info a {
  display: inline-block;
  color: #1D5891;
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
}

.market-info a:hover {
  color: #00253F;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .sticky-content {
    position: relative;
    height: auto;
    padding: 2rem;
  }


  .map-container {
    height: 70svh;
    flex: none;
  }

  #map {
    height: 50vh;
  }
}

.image-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.overlay-content {
  position: relative;
  width: 100%;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  justify-content: center;
}

.overlay-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

.close-button {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .image-overlay {
    padding: 0.5rem;
  }

  .overlay-content {
    max-width: 100%;
    max-height: 100vh;
  }

  .close-button {
    top: 10px;
    right: 10px;
    font-size: 2rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    color: #ffffff;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .close-button:active {
    background-color: rgba(0, 0, 0, 0.9);
  }
}
</style>