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

          <!-- Mode compact (Home) : Bouton vers page Marchés -->
          <template v-if="displayMode === 'compact'">
            <p class="market-description">
              {{ selectedMarket.description || 'Découvrez notre présence lors de cet événement avec notre sélection de bijoux et objets artisanaux touaregs.' }}
            </p>
            <router-link to="/marches" class="see-more-btn">
              Voir plus d'informations et photos
            </router-link>
          </template>

          <!-- Mode full (Page Marchés) : Images et infos complètes -->
          <template v-else>
            <!-- Carousel d'images -->
            <div v-if="selectedMarket.images && selectedMarket.images.length > 0" class="images-carousel">
              <div class="carousel-container" ref="carouselContainer">
                <div class="carousel-track" :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }">
                  <div v-for="(image, index) in selectedMarket.images" :key="index" class="carousel-slide">
                    <img :src="image" :alt="`${selectedMarket.location} - Image ${index + 1}`" @click="showImage(image)">
                  </div>
                </div>
              </div>
              <div v-if="selectedMarket.images.length > 1" class="carousel-dots">
                <span v-for="(image, index) in selectedMarket.images" :key="index"
                      :class="['dot', { active: currentImageIndex === index }]"
                      @click="currentImageIndex = index"></span>
              </div>
            </div>

            <a v-if="selectedMarket.link"
               :href="selectedMarket.link"
               target="_blank"
               class="info-link">Site web de l'événement</a>
          </template>
        </div>
      </div>
    </div>
    
    <!-- Nouvel overlay pour l'image -->
    <div v-if="showImageOverlay" class="image-overlay" @click="showImageOverlay = false">
      <div class="overlay-content" @click.stop>
        <img v-if="currentAffiche" :src="currentAffiche" class="affiche-viewer" :alt="'Affiche ' + (selectedMarket ? selectedMarket.location : '')">
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
  props: {
    displayMode: {
      type: String,
      default: 'full', // 'compact' pour home, 'full' pour page marchés
      validator: (value) => ['compact', 'full'].includes(value)
    }
  },
  data() {
    return {
      selectedMarket: null,
      showImageOverlay: false,
      currentAffiche: null,
      currentImageIndex: 0,
      carouselInterval: null,
      markets: [
        {
          location: 'PONT-CHÂTEAU',
          date: 'Samedi 06/12/2025 et Dimanche 07/12/2025',
          venue: 'Grand Marché de Noël',
          address: '25 Rue Maurice Sambron, 44160 Pontchâteau',
          description: 'Venez découvrir notre collection de bijoux et objets artisanaux touaregs lors du Grand Marché de Noël de Pont-Château. Une belle occasion de trouver des cadeaux uniques et authentiques.',
          link: 'https://www.pontchateau.fr',
          images: ['/affiche-pontchateau.jpg', '/amatai.jpg'],
          coordinates: [47.437639120284054, -2.093476531103958]
        },
        {
          location: 'NANTES',
          date: 'Samedi 17/05/2025 et Dimanche 18/05/2025',
          venue: 'Le Solilab',
          address: '8 Rue St Domingue, 44000 Nantes',
          description: 'Retrouvez-nous au Solilab à Nantes pour découvrir notre artisanat touareg et soutenir les artisans d\'Abalak. Bijoux en argent, bracelets, colliers et bien plus encore.',
          link: 'https://www.facebook.com/solilabnantes/?locale=fr_FR',
          images: ['/affiche-1.jpg'],
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
    this.startCarousel()
  },
  beforeUnmount() {
    this.stopCarousel()
  },
  watch: {
    selectedMarket() {
      this.currentImageIndex = 0
      this.stopCarousel()
      this.startCarousel()
    }
  },
  methods: {
    startCarousel() {
      if (this.selectedMarket && this.selectedMarket.images && this.selectedMarket.images.length > 1) {
        this.carouselInterval = setInterval(() => {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedMarket.images.length
        }, 3000)
      }
    },
    stopCarousel() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
        this.carouselInterval = null
      }
    },
    initMap() {
      const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
      }).setView([46.5, 0.5], 7)

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

      // Calculer les bounds et ajuster la vue
      const bounds = L.latLngBounds(this.markets.map(m => m.coordinates))
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 9
      })

      // Sélectionner le premier marché par défaut
      this.selectedMarket = this.markets[0]
      markers[this.markets[0].location].setIcon(customIcon.selected)
      currentSelectedMarker = markers[this.markets[0].location]
    },
    showImage(imageSrc) {
      this.currentAffiche = imageSrc
      this.showImageOverlay = true
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
  gap: 1.5rem;
  min-height: 0;
}

#map {
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #eee;
}

/* Mode compact (Home) : carte plus petite */
.market-side:has(.see-more-btn) #map {
  height: 200px;
}

/* Mode full (Marches) : carte normale */
.market-side:not(:has(.see-more-btn)) #map {
  height: 350px;
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
  font-size: 0.95rem;
  color: #333;
  line-height: 1.6;
}

/* Carousel d'images - Desktop */
.images-carousel {
  width: 100%;
  margin: 1rem 0;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}

.carousel-slide img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.carousel-slide img:hover {
  transform: scale(1.02);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #1D5891;
}

.dot:hover {
  background-color: #00253F;
}

.market-description {
  color: #555;
  line-height: 1.6;
  margin: 0.75rem 0;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.see-more-btn {
  display: block;
  text-align: center;
  padding: 0.75rem 1.5rem;
  background-color: #1D5891;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(29, 88, 145, 0.2);
}

.see-more-btn:hover {
  background-color: #00253F;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(29, 88, 145, 0.3);
}

.info-link {
  display: inline-block;
  color: #1D5891;
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
}

.info-link:hover {
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
    height: auto;
    flex: none;
  }

  #map {
    height: 300px;
  }

  /* Sur mobile, afficher les images en plein dans la market-info */
  .carousel-slide img {
    height: auto;
    max-height: 400px;
    object-fit: contain;
  }

  .market-info {
    padding: 1rem;
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

.affiche-viewer {
  max-width: 90vw;
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