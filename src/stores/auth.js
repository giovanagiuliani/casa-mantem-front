import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    nome: ''
  }),

  actions: {
    carregarSessao ($q) {
      this.token = $q.sessionStorage.getItem('token') || ''
      this.nome = $q.sessionStorage.getItem('nome') || ''
    },

    login (token, nome, $q) {
      this.token = token
      this.nome = nome
      $q.sessionStorage.setItem('token', token)
      $q.sessionStorage.setItem('nome', nome)
    },

    logout ($q) {
      this.token = ''
      this.nome = ''
      $q.sessionStorage.remove('token')
      $q.sessionStorage.remove('nome')
    }
  }
})
