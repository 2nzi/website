<template>
    <header>
      <nav :class="{ 'mobile-nav': isMenuOpen }">
        <div class="logo">TANAFOUST</div>
        <div class="nav-links" :class="{ 'nav-active': isMenuOpen }">
          <a v-for="link in links" 
             :key="link.href" 
             :href="link.href"
             @click="closeMenu"
          >
            {{ link.text }}
          </a>
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
        links: [
          { href: '#association', text: "L'association" },
          { href: '#marches', text: 'Marchés' },
          { href: '#contact', text: 'Contact' }
        ]
      }
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
      },
      closeMenu() {
        this.isMenuOpen = false
        document.body.style.overflow = ''
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
  }
  
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
    background-color: transparent;
    transition: background-color 0.3s ease;
    max-width: 1500px;
    margin: 0 auto;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    z-index: 1001;
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
      height: 100vh;
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