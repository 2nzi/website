<template>
    <div class="adherer">
      <NavBar />
      <div class="page-content">
        <h1>Adhérer à l'association</h1>
        <div class="content-wrapper">
          <div class="adhesion-info">
            <h2>Pourquoi adhérer ?</h2>
            <p>En adhérant à TANAFOUST, vous :</p>
            <ul>
              <li>Soutenez directement les artisans touaregs</li>
              <li>Participez à la préservation d'un savoir-faire unique</li>
              <li>Recevez nos newsletters et invitations aux événements</li>
            </ul>
          </div>
  
          <form class="adhesion-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Nom complet</label>
              <input type="text" id="name" v-model="form.name" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" required>
            </div>
            
            <div class="form-group">
              <label for="address">Adresse</label>
              <textarea id="address" v-model="form.address" rows="3" required></textarea>
            </div>
            
            <div class="form-group">
              <label>Type d'adhésion</label>
              <div class="radio-group">
                <input type="radio" id="regular" value="regular" v-model="form.type">
                <label for="regular">Adhésion simple (20€)</label>
              </div>
              <div class="radio-group">
                <input type="radio" id="support" value="support" v-model="form.type">
                <label for="support">Adhésion de soutien (30€)</label>
              </div>
            </div>
            
            <button type="submit" class="submit-btn">Adhérer</button>
          </form>
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
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          address: '',
          type: 'regular'
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
  
  .adhesion-info {
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 3rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .adhesion-info ul {
    margin-left: 1.5rem;
    margin-top: 1rem;
  }
  
  .adhesion-info li {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .adhesion-form {
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
  
  .form-group input[type="text"],
  .form-group input[type="email"],
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
  
  .radio-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }
  
  .radio-group:hover {
    background-color: #f8f9fa;
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
    .content-wrapper {
      padding: 1rem;
    }
    
    .adhesion-form {
      padding: 1.5rem;
    }
  }
  </style>