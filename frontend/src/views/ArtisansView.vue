<template>
    <div class="artisans-page">
      <NavBar /> <!-- Ajout de la NavBar ici -->
      <div class="content">
        <h1>Les Artisans</h1>
        <div class="carousel-container">
          <div class="carousel" ref="carousel">
            <img v-for="(image, index) in artisanImages"
                 :key="index"
                 :src="image"
                 :alt="'Artisan ' + (index + 1)"
                 :class="{ active: currentImageIndex === index }">
          </div>
          <div class="nav-bar">
            <span v-for="(image, index) in artisanImages"
                  :key="'nav-' + index"
                  :class="{ active: currentImageIndex === index }"></span>
          </div>
          <div class="text-content">
            <p>
              Les artisans de la coopérative d'Abalak, située dans le désert du Ténéré au Niger, perpétuent un savoir-faire ancestral dans la création de bijoux en argent. Cette coopérative, composée d'une quarantaine d'artisans, produit des bagues, bracelets, colliers et autres bijoux en argent 925, ornés de bois d'ébène et sertis de pierres semi-précieuses.
            </p>
            <p>
              Chaque pièce est façonnée à la main selon des techniques traditionnelles touareg, alliant l'élégance de l'argent à la chaleur du bois d'ébène. Les artisans utilisent des pierres semi-précieuses telles que l'améthyste, la pierre de lune, l'onyx, la malachite et le quartz rose pour embellir leurs créations.
            </p>
            <p>
              Dans la culture touareg, la bijouterie est un métier exclusivement masculin, tandis que le travail du cuir et la couture sont réservés aux femmes. Cette division des tâches reflète les traditions ancestrales de la région.
            </p>
            <p>
              Chaque artisan signe ses créations, garantissant ainsi l'authenticité et l'unicité de chaque bijou. Ces pièces artisanales sont non seulement des accessoires de mode, mais aussi des témoignages vivants de l'art et de la culture touareg.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'; // Importation de NavBar
  
  export default {
    name: 'ArtisansView',
    components: {
      NavBar, // Déclaration de NavBar comme composant
    },
    data() {
      return {
        artisanImages: [
          '/photoartisans/Photo Artisan 1-1.png',
          '/photoartisans/Photo Artisan 2-1.png',
          '/photoartisans/Photo Artisan 3-1.png',
          '/photoartisans/Photo Artisan 4-1.png',
          '/photoartisans/Photo Artisan 5-1.png',
          '/photoartisans/Photo Artisan 6-1.png',
          '/photoartisans/Photo Artisan 7-1.png',
          '/photoartisans/Photo Artisan 8-1.png',
        ],
        currentImageIndex: 0,
        autoScrollInterval: null,
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.startAutoScroll();
      });
    },
    beforeDestroy() {
      this.stopAutoScroll();
    },
    methods: {
      startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
          this.nextImage();
        }, 3000);
      },
      stopAutoScroll() {
        if (this.autoScrollInterval) {
          clearInterval(this.autoScrollInterval);
        }
      },
      nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.artisanImages.length;
      },
    },
  };
  </script>
  
  <style scoped>
  .artisans-page {
    padding-top: 150px;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    color: #00253F;
    text-align: center;
    margin-bottom: 2rem;
    font-family: 'Urbanist', sans-serif;
  }
  
  .text-content {
    margin-top: 3rem;
    line-height: 1.6;
  }
  
  .text-content p {
    margin-bottom: 1.5rem;
    color: #333;
    font-family: 'Urbanist', sans-serif;
  }
  
  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 2rem auto;
    overflow: hidden;
  }
  
  .carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 400px;
  }
  
  .carousel img {
    position: absolute;
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.5s ease, transform 0.5s ease;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .carousel img.active {
    opacity: 1;
    transform: scale(1);
  }
  
  .nav-bar {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .nav-bar span {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #ccc;
    border-radius: 50%;
    transition: background-color 0.3s;
  }
  
  .nav-bar span.active {
    background-color: #00253F;
  }
  
  @media (max-width: 768px) {
    .content {
      padding: 1rem;
    }
  
    .carousel img {
      height: 250px;
    }
  }
  </style>