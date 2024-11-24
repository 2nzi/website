<template>
  <div id="app">
    <div class="home-section">
      <div class="background-overlay"></div>
      <NavBar />
      <main class="hero">
        <div class="hero-content">
          <h1>L'ARTISANAT AU NIGER</h1>
          <p>Découvrez l'art Touareg, une expression unique de créativité et de maîtrise artisanale, façonnée au cœur du Niger pour valoriser un patrimoine vivant.</p>
          <div class="cta-buttons">
            <BaseButton variant="primary">Nous rencontrer</BaseButton>
            <BaseButton variant="secondary">Adhérer</BaseButton>
          </div>
        </div>
      </main>
    </div>

    <section class="split-section">
      <div class="content-side">
        <div class="content-wrapper">
          <h2>Notre Histoire</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
      </div>
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
    </section>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import BaseButton from './components/BaseButton.vue'

export default {
  components: {
    NavBar,
    BaseButton
  },
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
      }, 5000); // Change d'image toutes les 3 secondes
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Urbanist', sans-serif;
}
.home-section {
  position: relative;
  min-height: 100svh;
  background: url('/Home-bg.jpg') no-repeat center center;
  background-size: cover;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 37, 63, 0.8) 0%,
    rgba(2, 54, 89, 0.6) 50%,
    rgba(50, 132, 187, 0) 100%
  );
  z-index: 1;
}

.hero {
  position: relative;
  z-index: 2;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  max-width: 700px;
  color: white;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.split-section {
  min-height: 100svh;
  display: flex;
  background-color: #fff;
}

.content-side {
  flex: 1;
  padding: 4rem;
}

.content-wrapper {
  max-width: 600px;
  margin-left: auto;
  margin-right: 4rem;
}

.content-wrapper h2 {
  font-size: 2.5rem;
  color: #00253F;
  margin-bottom: 2rem;
}

.content-wrapper p {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
}

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
  .nav-links.desktop {
    display: none;
  }

  .burger-menu {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .split-section {
    flex-direction: column;
  }

  .content-wrapper {
    margin-right: auto;
    padding: 2rem;
  }

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