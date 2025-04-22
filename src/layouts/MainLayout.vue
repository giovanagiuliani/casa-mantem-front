<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #282828; height: 80px; display: flex; align-items: center; text-align: center;">
          <div style="width: 100%;">
            <img src="../../public/Logo_CasaMantem.png" alt="" height="70px">
          </div>
          <div v-if="!token" style="display: flex; position: absolute; right: 0;" class="q-pr-md">
            <q-btn color="primary" no-caps class="q-px-md" style="border-radius: 10px;" @click="''">
              <q-icon name="fas fa-user" size="18px" />
              <span v-if="!$q.screen.xs" class="q-pl-sm">Entrar/Cadastrar</span>
            </q-btn>
          </div>
          <div v-if="pagina != 'inicial'" style="display: flex; position: absolute; left: 0;" class="q-pl-md">
            <q-btn color="primary" no-caps class="q-px-md" style="border-radius: 10px;" @click="''">
              <q-icon name="fas fa-angle-left" size="18px" />
              <span class="q-pl-sm">Voltar</span>
            </q-btn>
          </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  data () {
    return {
      token: '',
      pagina: 'inicial'
    }
  },
  methods: {
    recuperaToken () {
      this.token = this.$q.sessionStorage.getItem('token')
    },
    recuperaPagina () {
      this.pagina = this.$route.name
    }
  },
  created () {
    this.recuperaToken()
  }
})
</script>
