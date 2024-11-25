<template>
    <div class="association">
      <NavBar />
      <div class="page-content">
        <h1>Notre Association</h1>
        <div class="content-wrapper">
          <section class="mission">
            <h2>Notre Mission</h2>
            <p>L'association TANAFOUST est née de la volonté de promouvoir l'artisanat traditionnel Touareg et de soutenir les artisans et artisanes de la région d'Abalak, au Niger.</p>
            <p>Notre mission est de faire découvrir en France un savoir-faire unique tout en contribuant au développement durable de communautés locales.</p>
          </section>
  
          <section class="values">
            <h2>Nos Valeurs</h2>
            <div class="values-grid">
              <div class="value-card">
                <h3>Solidarité</h3>
                <p>Soutien direct aux artisans et leurs familles</p>
              </div>
              <div class="value-card">
                <h3>Authenticité</h3>
                <p>Préservation des techniques traditionnelles</p>
              </div>
              <div class="value-card">
                <h3>Durabilité</h3>
                <p>Développement économique responsable</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  
  export default {
    name: 'Association',
    components: {
      NavBar
    }
  }
  </script>
  
  <style scoped>
.page-content {
  padding-top: 100px;
  min-height: 100vh;
  font-family: 'Urbanist', sans-serif;
}

.content-wrapper {
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

.mission {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1D5891;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

p {
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
}

.values {
  margin-top: 4rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-card h3 {
  color: #1D5891;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.value-card p {
  color: #666;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .mission {
    padding: 1.5rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>