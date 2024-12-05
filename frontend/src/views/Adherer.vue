<template>
  <div class="adherer">
    <NavBar />
    <div class="page-content">
      <h1>Adhérer à l'association</h1>
      <div class="content-wrapper">


        <div class="adhesion-details">
          <div class="cotisation">
            <h2>Cotisation annuelle : 15€</h2>
            <div class="payment-methods">
              <h3>Modes de paiement</h3>
              <ul>
                <li>Chèque à l'ordre de l'Association TANAFOUST</li>
                <li>Virement bancaire (IBAN fourni dans le bulletin)</li>
              </ul>
            </div>
          </div>

          <div class="types-adhesion">
            <h2>Types d'implication</h2>
            <div class="options">
              <div class="option">
                <h3>Membre actif</h3>
                <p>Participez activement à nos missions :</p>
                <ul>
                  <li>Transport de matériel pour les expositions</li>
                  <li>Tenue de stands (Mai/Juin ou Noël)</li>
                  <li>Organisation de ventes privées</li>
                  <li>Recherche de nouveaux points de vente</li>
                </ul>
              </div>
              <div class="option">
                <h3>Membre bienfaiteur</h3>
                <p>Soutenez l'association sans engagement actif</p>
              </div>
            </div>
          </div>

          <div class="download-section">
            <p>Pour finaliser votre adhésion, téléchargez le bulletin, complétez-le et envoyez-le avec votre règlement à :</p>
            <address>12 rue du Clos de l'Aulnay – 44240 LA CHAPELLE SUR ERDRE</address>
            <a href="/Bulletin2025.pdf" download class="download-btn">
              Télécharger le bulletin d'adhésion 2025
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Adherer',
  components: {
    NavBar
  }
}
</script>

<style scoped>
.page-content {
  padding-top: 100px;
  min-height: 100svh;
  font-family: 'Urbanist', sans-serif;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 3rem;
  color: #00253F;
  text-align: center;
  margin: 2rem 0;
}

.adhesion-info {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.adhesion-info ul {
  margin-left: 1.5rem;
  margin-top: 1rem;
}

.adhesion-details {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.cotisation {
  text-align: center;
  margin-bottom: 2rem;
}

.payment-methods {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.payment-methods ul {
  list-style: none;
  padding: 0;
}

.payment-methods li {
  margin: 0.5rem 0;
}

.types-adhesion {
  margin: 2rem 0;
}

.options {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.option {
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.option ul {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

.option li {
  margin: 0.5rem 0;
}

.download-section {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
}

address {
  font-style: normal;
  margin: 1rem 0;
  color: #666;
}

.download-btn {
  display: inline-block;
  background-color: #1D5891;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.1rem;
  text-decoration: none;
  margin: 1.5rem 0;
  transition: background-color 0.3s ease;
}

.download-btn:hover {
  background-color: #00253F;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  .adhesion-details {
    padding: 1.5rem;
  }

  .options {
    flex-direction: column;
  }
}
</style>