<template>
    <button 
      :class="['btn', variant]" 
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary'].includes(value)
      }
    }
  }
  </script>
  
  <style scoped>
  .btn {
    padding: 0.6rem 2rem;
    border: none;
    border-radius: 1000px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    max-width: 180px;
  }
  
  .primary {
    background-color: transparent;
    border: 2px solid white;
    color: white;
  }
  
  .secondary {
    background-color: white;
    color: black;
  }
  </style>