<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar :style="$q.screen.xs ? 'background-color: #282828; height: 60px; display: flex; align-items: center; text-align: center;' : 'background-color: #282828; height: 80px; display: flex; align-items: center; text-align: center;'">
          <div style="width: 100%;">
            <img src="../../public/Logo_CasaMantem.png" class="cursor-pointer" @click="redirect()" alt="" :height="$q.screen.xs ? '50px' : '70px'">
          </div>

          <!-- Logado -->
          <div v-if="auth.token && (pagina !== '/login' && pagina !== '/criaConta')" style="display: flex; position: absolute; right: 0; align-items: center;" class="flex no-wrap q-pr-md">
            <div v-if="!$q.screen.xs" class="q-pr-md">
              Olá, {{ auth.nome }}!
            </div>
            <div>
              <q-btn-dropdown dropdown-icon="fas fa-user" no-icon-animation color="primary" style="border-radius: 10px;" @click="''">
                <q-list>
                  <q-item clickable v-ripple @click="redirect()">
                    <q-item-section avatar class="q-pr-none">
                      <q-icon color="accent" name="fas fa-home" size="18px" />
                    </q-item-section>
                    <q-item-section style="margin-left: -15px;">Início</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="auth.tipologin === 1 ? fnAcessaPerfilCliente() : fnAcessaPerfilPrestador()">
                    <q-item-section avatar class="q-pr-none">
                      <q-icon color="accent" name="fas fa-user-gear" size="18px" />
                    </q-item-section>
                    <q-item-section style="margin-left: -15px;">Perfil</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="auth.tipologin === 1 ? fnAcessaServicosCliente() : fnAcessaServicosPrestador()">
                    <q-item-section avatar class="q-pr-none">
                      <q-icon color="accent" name="fas fa-clipboard-list" size="18px" />
                    </q-item-section>
                    <q-item-section style="margin-left: -15px;">Serviços</q-item-section>
                  </q-item>
                  <q-item v-if="auth.tipologin === 1" clickable v-ripple @click="fnAcessaFavoritosCliente()">
                    <q-item-section avatar class="q-pr-none">
                      <q-icon color="accent" name="fas fa-star" size="18px" />
                    </q-item-section>
                    <q-item-section style="margin-left: -15px;">Favoritos</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="fnLogout()">
                    <q-item-section avatar class="q-pr-none">
                      <q-icon color="accent" name="fas fa-arrow-right-from-bracket" size="18px" />
                    </q-item-section>
                    <q-item-section style="margin-left: -15px;">Sair</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>

          <!-- Não logado -->
          <div v-if="!auth.token && pagina === '/'" style="display: flex; position: absolute; right: 0;" class="q-pr-md">
            <q-btn color="primary" no-caps class="q-px-md" style="border-radius: 10px;" to="/login" @click="recuperaPagina()">
              <q-icon name="fas fa-user" size="18px" />
              <span v-if="!$q.screen.xs" class="q-pl-sm">Entrar/Cadastrar</span>
            </q-btn>
          </div>
          <div v-if="pagina != '/'" style="display: flex; position: absolute; left: 0;" class="q-pl-md">
            <q-btn color="primary" no-caps class="q-px-md" style="border-radius: 10px;" to="/" @click="recuperaPagina()">
              <q-icon name="fas fa-angle-left" size="18px" />
              <span v-if="!$q.screen.xs" class="q-pl-sm">Voltar</span>
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
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'MainLayout',

  data () {
    return {}
  },
  setup () {
    const auth = useAuthStore()

    return {
      auth
    }
  },
  computed: {
    pagina () {
      return this.recuperaPagina()
    }
  },
  methods: {
    // recuperaToken () {
    //   this.token = this.$q.sessionStorage.getItem('token')
    //   this.nmcliente = this.$q.sessionStorage.getItem('nome')
    // },
    recuperaPagina () {
      return this.$route.path
    },

    redirect () {
      this.$router.push('/')
    },

    fnLogout () {
      this.auth.logout(this.$q)
      this.$router.push('/')
    },

    fnAcessaPerfilCliente () {
      this.$router.push('/perfilCliente')
    },

    fnAcessaPerfilPrestador () {
      this.$router.push('/perfilPrestador')
    },

    fnAcessaServicosCliente () {
      this.$router.push('/servicosCliente')
    },

    fnAcessaFavoritosCliente () {
      this.$router.push('/favoritosCliente')
    },

    fnAcessaServicosPrestador () {
      this.$router.push('/servicosPrestador')
    }
  },
  mounted () {
    this.auth.carregarSessao(this.$q)
  }
})
</script>

<style>
.q-btn .q-icon, .q-btn .q-spinner {
  font-size: 18px;
}
</style>
