import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    nome: '',
    tipologin: 1
  }),

  actions: {
    carregarSessao ($q) {
      this.token = $q.sessionStorage.getItem('token') || ''
      this.nome = $q.sessionStorage.getItem('nome') || ''
      this.tipologin = $q.sessionStorage.getItem('tipologin') || ''
    },

    login (token, nome, tipologin, $q) {
      this.token = token
      this.nome = nome
      this.tipologin = tipologin
      $q.sessionStorage.setItem('token', token)
      $q.sessionStorage.setItem('nome', nome)
      $q.sessionStorage.setItem('tipologin', tipologin)
    },

    logout ($q) {
      this.token = ''
      this.nome = ''
      this.tipologin = 1
      $q.sessionStorage.remove('token')
      $q.sessionStorage.remove('nome')
      $q.sessionStorage.remove('tipologin')
    }
  }
})
