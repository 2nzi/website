<template>
    <div class="produits">
      <NavBar />
      <div class="page-content">
        <h1>Nos Bijoux Touaregs</h1>
        <div class="content-wrapper">
          <p class="description">
            Découvrez notre collection de bijoux artisanaux touaregs, chaque pièce est unique et fabriquée à la main par nos artisans d'Abalak.
          </p>
          <div class="gallery">
            <div v-for="(image, index) in images" 
                 :key="index" 
                 class="gallery-item"
                 @click="openLightbox(index)">
              <img :src="image" :alt="`Bijou touareg ${index + 1}`">
              <div class="zoom-icon">
                <i class="fas fa-search-plus"></i>
              </div>
            </div>
          </div>
  
          <!-- Lightbox -->
          <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
            <button class="close-btn" @click="closeLightbox">&times;</button>
            <button class="nav-btn prev" @click="prevImage" v-if="images.length > 1">&lt;</button>
            <button class="nav-btn next" @click="nextImage" v-if="images.length > 1">&gt;</button>
            <img :src="images[currentImageIndex]" :alt="`Bijou touareg ${currentImageIndex + 1}`">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    name: 'Produits',
    components: {
      NavBar,
    },
    data() {
      return {
        images: [
          '/photosbijoux/IMG-20241109-WA0000.jpg',
          '/photosbijoux/IMG-20241109-WA0001.jpg',
          '/photosbijoux/IMG-20241109-WA0002.jpg',
          '/photosbijoux/IMG-20241109-WA0003.jpg',
          '/photosbijoux/IMG-20241109-WA0004.jpg',
          '/photosbijoux/IMG-20241109-WA0005.jpg',
          '/photosbijoux/IMG-20241109-WA0006.jpg',
          '/photosbijoux/IMG-20241109-WA0007.jpg',
          '/photosbijoux/IMG-20241109-WA0008.jpg',
          '/photosbijoux/IMG-20241109-WA0009.jpg',
          '/photosbijoux/IMG-20241109-WA0010.jpg',
          '/photosbijoux/IMG-20241109-WA0011.jpg',
          '/photosbijoux/IMG-20241109-WA0012.jpg',
          '/photosbijoux/IMG-20241109-WA0013.jpg',
          '/photosbijoux/IMG-20241109-WA0014.jpg',
          '/photosbijoux/IMG-20241109-WA0015.jpg',
          '/photosbijoux/IMG-20241109-WA0016.jpg',
          '/photosbijoux/IMG-20241109-WA0017.jpg',
          '/photosbijoux/IMG-20241109-WA0018.jpg',
          '/photosbijoux/IMG-20241109-WA0019.jpg',
          '/photosbijoux/IMG-20241109-WA0020.jpg',
          '/photosbijoux/IMG-20241109-WA0021.jpg',
          '/photosbijoux/IMG-20241109-WA0022.jpg',
          '/photosbijoux/IMG-20241109-WA0023.jpg',
        ], // Liste brute des chemins d'images
        lightboxOpen: false,
        currentImageIndex: 0,
      };
    },
    methods: {
      openLightbox(index) {
        this.currentImageIndex = index;
        this.lightboxOpen = true;
      },
      closeLightbox() {
        this.lightboxOpen = false;
      },
      prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      },
      nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      },
    },
  };
  </script>
  
  <style scoped>

.page-content {
  padding-top: 100px;
  min-height: 100svh;
  background-color: #fff;
  font-family: 'Urbanist', sans-serif;
}
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    font-size: 3rem;
    color: #00253F;
    text-align: center;
    margin: 2rem 0;
  }
  
  .description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 3rem;
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .gallery-item {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .gallery-item:hover {
    transform: translateY(-5px);
  }
  
  .gallery-item img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
  }
  
  .zoom-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 1rem;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .gallery-item:hover .zoom-icon {
    opacity: 1;
  }
  
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .lightbox img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1001;
  }
  
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .prev {
    left: 20px;
  }
  
  .next {
    right: 20px;
  }
  
  @media (max-width: 768px) {
    .nav-btn {
      padding: 0.5rem;
      font-size: 1rem;
    }
  
    .close-btn {
      font-size: 1.5rem;
    }
  
    .content-wrapper {
      padding: 1rem;
    }
  
    h1 {
      font-size: 2.5rem;
    }
  
    .gallery {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
  </style>
  