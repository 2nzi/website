<template>
    <header :class="{ 'nav-scrolled': isScrolled }">
      <nav :class="{ 'mobile-nav': isMenuOpen }">
        <router-link to="/" class="logo">
          <img src="../assets/tanafoust-logo.png" alt="Tanafoust Logo">
        </router-link>
        <div class="nav-links" :class="{ 'nav-active': isMenuOpen }">
          <router-link 
            v-for="link in links" 
            :key="link.path" 
            :to="link.path"
            @click="closeMenu"
          >
            {{ link.text }}
          </router-link>
        </div>
        <button class="burger-menu" 
          @click="toggleMenu"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  </template>
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false,
        isScrolled: false,
        links: [
          { path: '/association', text: "L'association" },
          { path: '/artisans', text: "Les artisans" },
          { path: '/produits', text: "Les bijoux" },
          { path: '/marches', text: 'Marchés' },
          { path: '/contact', text: 'Contact' },
          { path: '/adherer', text: 'Adhérer' }
        ]
      }
    },
    computed: {
      isHomePage() {
        return this.$route.path === '/'
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      this.updateBackgroundColor()
    },
    unmounted() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
    handleScroll() {
      if (this.isHomePage) {
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight
        this.isScrolled = scrollPosition > viewportHeight * 0.85
      }
    },
    updateBackgroundColor() {
      this.isScrolled = !this.isHomePage
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    }
    },
    watch: {
      '$route'() {
        this.updateBackgroundColor()
      }
    }
  }
  </script>
  


  <style scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }
  
  .nav-scrolled {
    background-color: #00253F;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
    background-color: transparent;
    transition: all 0.3s ease;
    max-width: 1500px;
    margin: 0 auto;
    font-family: 'Urbanist', sans-serif;
  }

  
  .logo {
    z-index: 1001;
  }
  
  .logo img {
    height: 60px;
    width: auto;
  }
  
  .nav-links {
    display: flex;
    gap: 3rem;
    align-items: center;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s ease;
  }
  
  .nav-links a:hover {
    opacity: 0.8;
  }
  
  .burger-menu {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
  }
  
  .burger-menu span {
    width: 30px;
    height: 2px;
    background-color: white;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 850px) {
    nav {
      padding: 2rem 2rem;
    }
  
    .burger-menu {
      display: flex;
    }
  
    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100svh;
      width: 100%;
      background: rgba(0, 37, 63, 0.98);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: right 0.3s ease;
      gap: 2rem;
    }
  
    .nav-links.nav-active {
      right: 0;
    }
  
    .mobile-nav .burger-menu span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
      width: 25px;
    }
  
    .mobile-nav .burger-menu span:nth-child(2) {
      opacity: 0;
      transform: translateX(-20px);
    }
  
    .mobile-nav .burger-menu span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
      width: 25px;
    }
  
    .burger-menu span {
      width: 25px;
      height: 2px;
      background-color: white;
      transition: all 0.3s ease;
      transform-origin: center;
    }
  }
  </style>