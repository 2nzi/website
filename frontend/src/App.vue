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
      <HistorySection />
      <ImageCarousel />
    </section>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import BaseButton from './components/BaseButton.vue'
import HistorySection from './components/HistorySection.vue'
import ImageCarousel from './components/ImageCarousel.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    BaseButton,
    HistorySection,
    ImageCarousel
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');

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

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .split-section {
    flex-direction: column;
  }
}
</style>