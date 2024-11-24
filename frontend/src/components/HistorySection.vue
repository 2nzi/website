<template>
    <div class="content-side">
      <div class="content-wrapper">
        <h2>Nos Prochains Marchés</h2>
        <div class="market-event" v-for="(market, index) in markets" :key="index">
          <h3>{{ market.location }}</h3>
          <p class="date">{{ market.date }}</p>
          <p>{{ market.venue }}</p>
          <p v-if="market.address">{{ market.address }}</p>
          <a v-if="market.link" :href="market.link" target="_blank">Plus d'informations</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HistorySection',
    data() {
      return {
        markets: [
          {
            location: 'COUERON',
            date: 'Samedi 30/11/2024',
            venue: 'Foyer laïc de la Chabossière',
            address: '9 rue Rouget de l\'Isle',
            link: 'https://csc-henri-normand.centres-sociaux.fr/marche-de-noel-2024/'
          },
          {
            location: 'SAINT HERBLAIN',
            date: 'Dimanche 01/12/2024',
            venue: 'Salle polyvalente René-Guy Cadou',
            address: '2 rue du Bois de Lagland'
          },
          {
            location: 'LA CHAPELLE SUR EDRE',
            date: 'Samedi 07/12/2024 et Dimanche 08/12/2024',
            venue: 'Salle Jean Jaurès',
            link: 'https://www.lachapellesurerdre.fr/marche-de-noel-solidaire'
          },
          {
            location: 'NANTES Festival DRESS CODE',
            date: 'Samedi 07/12/2024 et Dimanche 08/12/2024',
            venue: 'Espace Cosmopolis',
            address: '18 rue Scribe',
            link: 'https://cosmopolis.nantes.fr/evenements/waxmania-dress-code/'
          },
          {
            location: 'Sainte Luce sur Loire',
            date: 'Samedi 14 décembre de 9h à 18h',
            venue: 'Salle Louis Dagorne',
            link: 'https://www.sainte-luce-loire.com/agenda/marche-de-noel-solidaire-4/'
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
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
  
  .market-event {
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #00253F;
  }
  
  .market-event h3 {
    color: #00253F;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  
  .market-event .date {
    color: #1D5891;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .market-event p {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
  
  .market-event a {
    display: inline-block;
    color: #1D5891;
    text-decoration: none;
    font-weight: 500;
    margin-top: 0.5rem;
    transition: color 0.3s ease;
  }
  
  .market-event a:hover {
    color: #00253F;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .content-wrapper {
      margin-right: auto;
      padding: 2rem;
    }
  }
  </style>