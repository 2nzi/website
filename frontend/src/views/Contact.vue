<template>
    <div class="contact">
      <NavBar />
      <div class="page-content">
        <h1>Contactez-nous</h1>
        <div class="content-wrapper">
          <div class="contact-grid">
            <div class="contact-info">
              <h2>Informations</h2>
              <p>Pour toute question ou information complémentaire, n'hésitez pas à nous contacter :</p>
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <a href="mailto:contact@tanafoust.org">contact@tanafoust.org</a>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <a href="tel:+33600000000">+33 6 00 00 00 00</a>
              </div>
            </div>
            
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" id="name" v-model="form.name" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" required>
              </div>
              
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
              </div>
              
              <button type="submit" class="submit-btn">Envoyer</button>
            </form>
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
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      }
    },
    methods: {
      submitForm() {
        // Logique d'envoi du formulaire à implémenter
        console.log('Form submitted:', this.form)
      }
    }
  }
  </script>
  <style scoped>
  .page-content {
    padding-top: 100px;
    min-height: 100vh;
    font-family: 'Urbanist', sans-serif;
    background-color: #fff;
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
  
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-top: 2rem;
  }
  
  .contact-info {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .info-item a {
    color: #1D5891;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .info-item a:hover {
    color: #00253F;
  }
  
  .contact-form {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-weight: 500;
    color: #00253F;
    margin-bottom: 0.5rem;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-family: 'Urbanist', sans-serif;
    transition: border-color 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1D5891;
  }
  
  .submit-btn {
    background-color: #1D5891;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: 'Urbanist', sans-serif;
    width: 100%;
  }
  
  .submit-btn:hover {
    background-color: #00253F;
  }
  
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .content-wrapper {
      padding: 1rem;
    }
    
    .contact-form {
      padding: 1.5rem;
    }
  }
  </style>