<template>
    <div class="image-side">
      <div class="sticky-images">
        <div class="image-container">
          <img 
            v-for="(image, index) in images" 
            :key="index"
            :src="image.src" 
            :alt="image.alt"
            :class="{ active: currentImageIndex === index }"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageCarousel',
    data() {
      return {
        currentImageIndex: 0,
        images: [
          { src: '/affiche-1.jpg', alt: 'Artisanat 1' },
          { src: '/affiche-2.jpg', alt: 'Artisanat 2' }
        ],
        intervalId: null
      }
    },
    mounted() {
      this.startImageRotation();
    },
    beforeUnmount() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    methods: {
      startImageRotation() {
        this.intervalId = setInterval(() => {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        }, 5000);
      }
    }
  }
  </script>
  
  <style scoped>
  .image-side {
    flex: 1;
    position: relative;
  }
  
  .sticky-images {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .image-container {
    position: relative;
    height: 80vh;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  
  .image-container img {
    position: absolute;
    height: 100%;
    width: auto;
    object-fit: contain;
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .image-container img.active {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .sticky-images {
      position: relative;
      height: 80vh;
      padding: 2rem;
    }
  
    .image-container {
      height: 80vh;
    }
  }
  </style>