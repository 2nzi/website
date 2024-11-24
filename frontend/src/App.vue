<template>
  <div id="app">
    <div class="home-section">
      <div class="background-overlay"></div>
      <header>
        <nav>
          <div class="logo">TANAFOUST</div>
          <div class="nav-links desktop">
            <a href="#association">L'association</a>
            <a href="#marches">Marchés</a>
            <a href="#contact">Contact</a>
          </div>
          <button class="burger-menu" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
        <div class="mobile-menu" :class="{ active: isMenuOpen }">
          <a href="#association">L'association</a>
          <a href="#marches">Marchés</a>
          <a href="#contact">Contact</a>
        </div>
      </header>

      <main class="hero">
        <div class="hero-content">
          <h1>L'ARTISANAT AU NIGER</h1>
          <p>Découvrez l'art Touareg, une expression unique de créativité et de maîtrise artisanale, façonnée au cœur du Niger pour valoriser un patrimoine vivant.</p>
          <div class="cta-buttons">
            <button class="btn primary">Nous rencontrer</button>
            <button class="btn secondary">Adhérer</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style>
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

header {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 2rem;
  font-weight: 500;
}

.burger-menu {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.burger-menu span {
  display: block;
  width: 25px;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(0, 37, 63, 0.95);
  padding: 1rem;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.mobile-menu.active {
  transform: translateY(0);
}

.mobile-menu a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
}

.hero {
  position: relative;
  z-index: 2;
  min-height: calc(100svh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;  /* Ajout */
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
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 1000px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  max-width: 180px;
}

.primary {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

.secondary {
  background-color: white;
  color: black;
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
}
</style>