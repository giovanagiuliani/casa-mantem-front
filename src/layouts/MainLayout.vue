<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar :style="$q.screen.xs ? 'background-color: #282828; height: 60px; display: flex; align-items: center; text-align: center;' : 'background-color: #282828; height: 80px; display: flex; align-items: center; text-align: center;'">
          <div style="width: 100%;">
            <img src="../../public/Logo_CasaMantem.png" class="cursor-pointer" @click="redirect()" alt="" :height="$q.screen.xs ? '50px' : '70px'">
          </div>
          <div v-if="token && (pagina !== '/login' || pagina !== '/criaConta')" class="flex no-wrap">
            <div>
              Olá, {{ this.nmcliente }}!
            </div>
            <div>
              <q-btn color="primary" style="border-radius: 10px;" @click="''">
                <q-icon name="fas fa-user" size="18px" />
              </q-btn>
            </div>
          </div>
          <div v-if="!token && pagina === '/'" style="display: flex; position: absolute; right: 0;" class="q-pr-md">
            <q-btn color="primary" no-caps class="q-px-md" style="border-radius: 10px;" to="/login" @click="recuperaPagina()">
              <q-icon name="fas fa-user" size="18px" />
              <span v-if="!$q.screen.xs" class="q-pl-sm">Entrar/Cadastrar</span>
            </q-btn>
          </div>
          <div v-if="pagina != '/'" style="display: flex; position: absolute; left: 0;" class="q-pl-md">
            <q-btn color="primary" no-caps class="q-px-md" style="border-radius: 10px;" to="/" @click="recuperaPagina()">
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
      nmcliente: ''
    }
  },
  computed: {
    pagina () {
      return this.recuperaPagina()
    }
  },
  methods: {
    recuperaToken () {
      this.token = this.$q.sessionStorage.getItem('token')
      this.nmcliente = this.$q.sessionStorage.getItem('nome')
    },
    recuperaPagina () {
      return this.$route.path
    },
    redirect () {
      this.$router.push('/')
    }
  },
  created () {
    this.recuperaToken()
    this.recuperaPagina()
  }
})
</script>
