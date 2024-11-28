<template>
  <div class="home">
      <div class="home-section">
        <div class="background-overlay"></div>
        <NavBar />
        <main class="hero">
          <div class="hero-content">
            <h1>L'ARTISANAT AU NIGER</h1>
            <p>Découvrez l'art Touareg, une expression unique de créativité et de maîtrise artisanale, façonnée au cœur du Niger pour valoriser un patrimoine vivant.</p>
            <div class="cta-buttons">
                <BaseButton variant="primary" @click="scrollToSection('nous-rencontrer')">
                    Nous rencontrer
                </BaseButton>
                <router-link to="/adherer">
                    <BaseButton variant="secondary">Adhérer</BaseButton>
                </router-link>
            </div>
          </div>
        </main>
      </div>
  
      <section id="nous-rencontrer" class="split-section">
        <div class="content-side">
          <div class="content-wrapper">
            <h2>Nous rencontrer</h2>
            <p>L'association TANAFOUST vous invite à venir découvrir et soutenir le savoir-faire unique des artisans touaregs du Niger lors de nos prochaines expositions-ventes. Ces événements sont une occasion idéale pour admirer et acquérir des bijoux et objets artisanaux authentiques tout en contribuant directement à l'amélioration des conditions de vie de nombreuses familles au Niger.</p>
            <p>En participant à ces marchés, vous soutenez un projet qui vise à valoriser la culture et les talents des artisans d'Abalak, tout en permettant à leurs communautés de bénéficier des ressources nécessaires à leur développement. Nous avons hâte de vous y rencontrer !</p>
            <div class="image-container">
              <img src="@/assets/art1.jpg" alt="Artisanat Touareg">
            </div>
            <h2>Notre Histoire</h2>
            <p>L'association TANAFOUST est née de la volonté de promouvoir l'artisanat traditionnel Touareg et de soutenir les artisans et artisanes de la région d'Abalak, au Niger.</p>
            <p>Depuis sa création, notre mission est de faire découvrir en France un savoir-faire unique tout en contribuant au développement durable de communautés locales.</p>
            <div class="read-more">
              <a href="/association" class="read-more-link">
                En savoir plus sur notre association
                <span class="arrow">→</span>
              </a>
            </div>
            <h2>Nos Produits</h2>
            <p>Découvrez notre collection de bijoux et d'objets artisanaux touaregs, façonnés avec passion et savoir-faire traditionnel. Chaque pièce raconte une histoire unique et contribue à préserver un artisanat ancestral.</p>
            <div class="products-grid">
              <div class="product-card" @click="$router.push('/produits')">
                <img src="https://gundara.com/sites/default/files/jewellery/bracelet-bahu-touareg-niger-gundara.jpg" alt="Bijoux Touaregs">
                <h3>Bijoux</h3>
                <p>Colliers, bracelets et bagues en argent et pierres semi-précieuses</p>
              </div>
          </div>
          </div>
        </div>
        <MarketSection />
      </section>
    </div>
  </template>

  <script>
  import NavBar from '@/components/NavBar.vue'
  import BaseButton from '@/components/BaseButton.vue'
  import MarketSection from '@/components/MarketSection.vue'
  
  export default {
    name: 'Home',
    components: {
      NavBar,
      BaseButton,
      MarketSection
    },
    methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 90 // pixels à soustraire
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }}
  
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
  
  .image-container {
    width: 100%;
    margin: 3rem 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .image-container img {
    width: 100%;
    height: 70svh;
    display: block;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .image-container:hover img {
    transform: scale(1.02);
  }
  
  .read-more {
    margin: 2rem 0 3rem 0;
  }
  
  .read-more-link {
    display: inline-flex;
    align-items: center;
    color: #1D5891;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  
  .read-more-link .arrow {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  .read-more-link:hover {
    color: #00253F;
  }
  
  .read-more-link:hover .arrow {
    transform: translateX(5px);
  }
  
  .products-section {
    background-color: #f8f9fa;
    padding: 6rem 0;
  }
  
  .products-section .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .products-grid {
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .product-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .product-card h3 {
    color: #00253F;
    font-size: 1.3rem;
    margin: 1rem;
  }
  
  .product-card p {
    color: #333;
    font-size: 1rem;
    margin: 0 1rem 1.5rem;
    line-height: 1.5;
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
/*   
    .cta-buttons {
      flex-direction: column;
      align-items: center;
    } */
    .content-side {
    padding: 4rem 0;
  }
  
    .btn {
      width: 100%;
      text-align: center;
    }
  
    .split-section {
      flex-direction: column-reverse;
    }
  
    .content-wrapper {
      margin-right: auto;
      padding: 2rem;
    }
  
    .image-container {
      margin: 2rem 0;
    }
  
    .image-container img {
      height: 300px;
    }
  
    .products-section {
      padding: 3rem 0;
    }
  
    .products-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
  </style>