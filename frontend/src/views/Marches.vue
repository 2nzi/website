<template>
    <div class="marches">
      <NavBar />
      <div class="page-content">
        <div class="split-section">
          <MarketSection />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  import MarketSection from '@/components/MarketSection.vue'
  
  export default {
    name: 'Marches',
    components: {
      NavBar,
      MarketSection
    },
    data() {
      return {
        markets: [
          // Utiliser les mêmes données que dans MarketSection.vue
          {
            location: 'COUERON',
            date: 'Samedi 30/11/2024',
            venue: 'Foyer laïc de la Chabossière',
            address: '9 rue Rouget de l\'Isle',
            link: 'https://csc-henri-normand.centres-sociaux.fr/marche-de-noel-2024/'
          },
          // ... autres marchés
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .page-content {
    padding-top: 100px;
    min-height: 100vh;
    font-family: 'Urbanist', sans-serif;
  }
  
  .split-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    font-size: 3rem;
    color: #00253F;
    text-align: center;
    margin: 2rem 0;
    font-family: 'Urbanist', sans-serif;
  }
  
  .market-card {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .market-card:hover {
    transform: translateX(5px);
  }
  
  .market-card h3 {
    color: #1D5891;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .market-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
  }
  
  .info-item i {
    color: #1D5891;
  }
  
  .market-link {
    display: inline-block;
    margin-top: 1.5rem;
    color: #1D5891;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .market-link:hover {
    color: #00253F;
  }
  
  @media (max-width: 768px) {
    .split-section {
      padding: 1rem;
    }
    
    h1 {
      font-size: 2.5rem;
    }
    
    .market-card {
      padding: 1.5rem;
    }
    
    .market-info {
      grid-template-columns: 1fr;
    }
  }
  </style>