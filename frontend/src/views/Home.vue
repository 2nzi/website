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
            <h2>Notre mission</h2>
            <p>Fondée en 2014, l'association TANAFOUST, dont le nom signifie "Bonne Action" en langue Tamacheq, incarne un engagement profond envers la solidarité internationale. Sa mission principale est double :</p>
            
            <p>1. Mettre en lumière et valoriser en France l'artisanat traditionnel du village de Tebade Abalak, situé dans la République du Niger.</p>
            
            <p>2. Faciliter l'exposition et la commercialisation des bijoux touaregs, véritables chefs-d'œuvre de l'art saharien.</p>
            
            <p>TANAFOUST agit comme un pont culturel, reliant les artisans talentueux du Niger au marché français. L'association s'efforce de préserver et promouvoir un savoir-faire ancestral, tout en offrant des opportunités économiques cruciales à la communauté locale.</p>
            
            <p>Les recettes générés par les ventes de bijoux et autres produits artisanaux ont un impact direct et significatif. Ils soutiennent environ quarante familles nigériennes, contribuant ainsi à :</p>
            
            <ul style="margin-left: 20px; margin-bottom: 1.5rem; color: #333; line-height: 1.8;">
              <li>Améliorer leurs conditions de vie</li>
              <li>Renforcer l'autonomie économique des artisans, en particulier des femmes</li>
              <li>Préserver les techniques artisanales traditionnelles</li>
              <li>Encourager le développement durable de la région</li>
            </ul>
            
            <p>Par son action, TANAFOUST ne se contente pas de promouvoir l'art touareg ; elle tisse des liens de solidarité entre la France et le Niger, tout en participant activement au développement socio-économique d'une communauté sahélienne.</p>
            
            <div class="content-wrapper2">
            <h2>Les bijoux</h2>
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
        </div>
        <MarketSection />
      </section>
      <div class="globe-section">
        <div class="globe-wrapper">
          <Globe />
        </div>
      </div>
    </div>

  </template>

  <script>
  import NavBar from '@/components/NavBar.vue'
  import BaseButton from '@/components/BaseButton.vue'
  import MarketSection from '@/components/MarketSection.vue'
  import Globe from '@/components/Globe.vue'

  export default {
    name: 'Home',
    components: {
      NavBar,
      BaseButton,
      MarketSection,
      Globe
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
  
  .content-wrapper2 {
    max-width: 600px;
    margin-left: auto;
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

  
  .globe-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: white;
}

.globe-wrapper {
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}


@media (max-width: 480px) {
  .globe-wrapper {
    width: 280px;
    height: 500px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .globe-wrapper {
    width: 350px;
    height: 620px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .globe-wrapper {
    width: 400px;
    height: 710px;
  }
}

@media (min-width: 1025px) {
  .globe-wrapper {
    width: 450px;
    height: 800px;
  }
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