<template>
  <div class="market-side">
    <div class="sticky-content">
      <div class="map-container">
        <div id="map"></div>
        <div class="market-info" v-if="selectedMarket">
          <h3>{{ selectedMarket.location }}<span v-if="isPast(selectedMarket)" class="past-badge">Terminé</span></h3>
          <p class="date">{{ selectedMarket.date }}</p>
          <p>{{ selectedMarket.venue }}</p>
          <p v-if="selectedMarket.address">{{ selectedMarket.address }}</p>

          <!-- Mode compact (Home) : Bouton vers page Marchés -->
          <template v-if="displayMode === 'compact'">
            <p class="market-description">
              {{ selectedMarket.description || 'Découvrez notre présence lors de cet événement avec notre sélection de bijoux et objets artisanaux touaregs.' }}
            </p>
            <router-link :to="{ path: '/marches', query: { marche: selectedMarket.location } }" class="see-more-btn">
              Voir plus d'informations et photos
            </router-link>
          </template>

          <!-- Mode full (Page Marchés) : Images/Vidéos et infos complètes -->
          <template v-else>
            <!-- Carousel d'images et vidéos -->
            <div v-if="selectedMarket.media && selectedMarket.media.length > 0" class="images-carousel">
              <div class="carousel-container" ref="carouselContainer">
                <!-- Flèche gauche -->
                <button v-if="selectedMarket.media.length > 1"
                        class="carousel-arrow prev"
                        @click="prevSlide"
                        aria-label="Image précédente">
                  ‹
                </button>

                <div class="carousel-track" :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }">
                  <div v-for="(mediaItem, index) in selectedMarket.media" :key="index" class="carousel-slide">
                    <img v-if="mediaItem.type === 'image'"
                         :src="mediaItem.src"
                         :alt="`${selectedMarket.location} - Image ${index + 1}`"
                         @click="showImage(mediaItem.src)">
                    <video v-else-if="mediaItem.type === 'video'"
                           :src="mediaItem.src"
                           playsinline
                           controls
                           class="carousel-video"></video>
                  </div>
                </div>

                <!-- Flèche droite -->
                <button v-if="selectedMarket.media.length > 1"
                        class="carousel-arrow next"
                        @click="nextSlide"
                        aria-label="Image suivante">
                  ›
                </button>
              </div>
              <div v-if="selectedMarket.media.length > 1" class="carousel-dots">
                <span v-for="(mediaItem, index) in selectedMarket.media" :key="index"
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
      // endDate (AAAA-MM-JJ) : dernier jour de l'événement. Sert à marquer
      // automatiquement les événements passés et à sélectionner le prochain.
      markets: [
        {
          location: 'SAINT-LAURENT-DES-AUTELS',
          date: 'Samedi 21/11/2026 et Dimanche 22/11/2026',
          endDate: '2026-11-22',
          venue: 'La Féérie de Noël – Salle Laurenthéa',
          address: 'Rue du Stade, 49270 Orée d\'Anjou',
          description: 'Retrouvez-nous à la Féérie de Noël, de 10h à 18h, avec créateurs, artisans et vendeurs : une belle occasion de découvrir nos bijoux et objets artisanaux touaregs.',
          media: [
            { type: 'image', src: '/affiche-saint-laurent.png' }
          ],
          coordinates: [47.2903154, -1.1883383]
        },
        {
          location: 'ANCENIS-SAINT-GÉRÉON',
          date: 'Samedi 28/11/2026 (14h-20h) et Dimanche 29/11/2026 (10h-18h)',
          endDate: '2026-11-29',
          venue: 'Marché de Noël – Salle de la Charbonnière',
          address: 'Saint-Géréon, 44150 Ancenis-Saint-Géréon',
          description: 'Plus de 100 exposants, entrée gratuite, restauration sur place. Venez nous rencontrer pour découvrir nos bijoux et objets artisanaux touaregs.',
          media: [
            { type: 'image', src: '/affiche-saint-gereon.png' }
          ],
          coordinates: [47.3917, -1.1567]
        },
      ]
    }
  },
  mounted() {
    this.initMap()
  },
  watch: {
    selectedMarket() {
      this.currentImageIndex = 0
    }
  },
  methods: {
    nextSlide() {
      if (this.selectedMarket && this.selectedMarket.media) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedMarket.media.length
      }
    },
    prevSlide() {
      if (this.selectedMarket && this.selectedMarket.media) {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedMarket.media.length) % this.selectedMarket.media.length
      }
    },
    isPast(market) {
      if (!market.endDate) return false
      const end = new Date(market.endDate + 'T23:59:59')
      return end < new Date()
    },
    initMap() {
      const map = L.map('map', {
        zoomControl: false,
        attributionControl: false
      }).setView([46.5, 0.5], 7)

      // Tuiles OpenStreetMap : gratuites, sans clé API (CARTO en exige une désormais)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        minZoom: 5
      }).addTo(map)
      L.control.attribution({ prefix: false, position: 'bottomright' })
        .addAttribution('© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>')
        .addTo(map)

      const customIcon = {
        default: L.divIcon({
          className: 'custom-marker',
          html: '<div class="marker-inner"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        }),
        past: L.divIcon({
          className: 'custom-marker past',
          html: '<div class="marker-inner"></div>',
          iconSize: [14, 14],
          iconAnchor: [7, 7]
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
          icon: this.isPast(market) ? customIcon.past : customIcon.default
        }).addTo(map)

        marker._past = this.isPast(market)
        markers[market.location] = marker

        marker.on('click', () => {
          // Désélectionner le marqueur précédent s'il existe
          if (currentSelectedMarker) {
            currentSelectedMarker.setIcon(currentSelectedMarker._past ? customIcon.past : customIcon.default)
          }
          // Sélectionner le nouveau marqueur
          marker.setIcon(customIcon.selected)
          currentSelectedMarker = marker
          this.selectedMarket = market
        })
      })

      // Recalculer la taille une fois le layout appliqué, sinon les tuiles ne couvrent pas tout le conteneur
      map.invalidateSize()
      window.addEventListener('resize', () => map.invalidateSize())

      // Calculer les bounds et ajuster la vue
      const bounds = L.latLngBounds(this.markets.map(m => m.coordinates))
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 9
      })

      // Sélectionner le premier marché par défaut
      // Sélectionner le prochain événement à venir (sinon le dernier de la liste)
      // ou le marché demandé dans l'URL (?marche=VILLE, depuis le bouton "Voir plus" de l'accueil)
      const wanted = this.$route && this.$route.query.marche
      const initial = this.markets.find(m => m.location === wanted)
        || this.markets.find(m => !this.isPast(m))
        || this.markets[0]
      this.selectedMarket = initial
      markers[initial.location].setIcon(customIcon.selected)
      currentSelectedMarker = markers[initial.location]
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

:deep(.custom-marker.past .marker-inner) {
  background-color: #9aa5b1;
}

.past-badge {
  margin-left: 0.6rem;
  padding: 0.1rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #666;
  background: #e5e8eb;
  border-radius: 999px;
  vertical-align: middle;
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
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 1rem 0;
}

.carousel-slide img,
.carousel-slide video {
  display: block;
  max-width: 100%;
  /* Affiche entière visible sans scroll, même pour un format portrait */
  max-height: 60vh;
  width: auto;
  height: auto;
  object-fit: contain;
}

.carousel-slide img {
  cursor: pointer;
}

.carousel-slide img:hover {
  transform: scale(1.02);
}

.carousel-video {
  border-radius: 8px;
}

/* Flèches de navigation */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 37, 63, 0.7);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.carousel-arrow:hover {
  background-color: rgba(29, 88, 145, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.carousel-arrow.prev {
  left: 10px;
}

.carousel-arrow.next {
  right: 10px;
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

  /* Sur mobile */
  .map-container {
    height: auto;
    flex: none;
    gap: 1rem;
  }

  .carousel-slide {
    padding: 0.5rem;
  }

  .carousel-slide img,
  .carousel-slide video {
    max-width: 100%;
    max-height: 60vh;
    width: auto;
    height: auto;
  }

  .market-info {
    padding: 1rem;
  }

  /* Flèches plus petites sur mobile */
  .carousel-arrow {
    width: 40px;
    height: 40px;
    font-size: 1.75rem;
  }

  .carousel-arrow.prev {
    left: 5px;
  }

  .carousel-arrow.next {
    right: 5px;
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