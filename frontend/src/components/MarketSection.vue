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
          <a v-if="selectedMarket.link" :href="selectedMarket.link" target="_blank">Plus d'informations</a>
        </div>
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
      markets: [
        {
          location: 'COUERON',
          date: 'Samedi 30/11/2024',
          venue: 'Foyer laïc de la Chabossière',
          address: '9 rue Rouget de l\'Isle',
          link: 'https://csc-henri-normand.centres-sociaux.fr/marche-de-noel-2024/',
          coordinates: [47.2172, -1.7239]
        },
        {
          location: 'SAINT HERBLAIN',
          date: 'Dimanche 01/12/2024',
          venue: 'Salle polyvalente René-Guy Cadou',
          address: '2 rue du Bois de Lagland',
          coordinates: [47.2230, -1.6347]
        },
        {
          location: 'LA CHAPELLE SUR ERDRE',
          date: 'Samedi 07/12/2024 et Dimanche 08/12/2024',
          venue: 'Salle Jean Jaurès',
          link: 'https://www.lachapellesurerdre.fr/marche-de-noel-solidaire',
          coordinates: [47.2861, -1.5497]
        },
        {
          location: 'NANTES',
          date: 'Samedi 07/12/2024 et Dimanche 08/12/2024',
          venue: 'Festival DRESS CODE - Espace Cosmopolis',
          address: '18 rue Scribe',
          link: 'https://cosmopolis.nantes.fr/evenements/waxmania-dress-code/',
          coordinates: [47.2155, -1.5536]
        },
        {
          location: 'SAINTE LUCE SUR LOIRE',
          date: 'Samedi 14/12/2024 de 9h à 18h',
          venue: 'Salle Louis Dagorne',
          link: 'https://www.sainte-luce-loire.com/agenda/marche-de-noel-solidaire-4/',
          coordinates: [47.2497, -1.4797]
        }
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
      }).setView([47.2172, -1.5536], 11)
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 13,
        minZoom: 10
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
    height: 100vh;
    flex: none;
  }

  #map {
    height: 50vh;
  }
}
</style>