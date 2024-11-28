<template>
  <div class="contact">
    <NavBar />
    <div class="page-content">
      <h1>Contactez-nous</h1>
      <div class="content-wrapper">
        <div class="contact-info">
          <h2>Nos coordonnées</h2>
          <p>Pour toute question ou information complémentaire, n'hésitez pas à nous contacter :</p>
          
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <a href="mailto:tanafoust@laposte.net">tanafoust@laposte.net</a>
          </div>

          <div class="info-item address">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <strong>Siège social :</strong><br>
              12 rue du Clos de l'Aulnay<br>
              44240 LA CHAPELLE SUR ERDRE
            </div>
          </div>

          <div class="info-item">
            <i class="fas fa-building"></i>
            <span>SIRET : 92350347800011</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Contact',
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
  background-color: #fff;
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
  font-family: 'Urbanist', sans-serif;
}

.contact-info {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
}

.contact-info h2 {
  color: #00253F;
  margin-bottom: 1.5rem;
}

.contact-info p {
  color: #666;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 1.5rem 0;
  font-size: 1.1rem;
}

.info-item i {
  color: #1D5891;
  font-size: 1.3rem;
  margin-top: 0.2rem;
}

.info-item a {
  color: #1D5891;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-item a:hover {
  color: #00253F;
}

.address div {
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  .contact-info {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2.5rem;
  }
}
</style>