<template>
  <q-page padding class="flex items-center justify-center">
    <div style="width: 60vh;">
      <q-card class="my-card">
        <q-card-section>
          <div align="center" class="text-h6">
            Entrar
          </div>

          <!-- Escolha para Login -->
          <div class="row q-pt-lg" align="center">
            <div class="col-6">
              <div class="text-subtitle2 cursor-pointer q-mx-md" @click="tipoLogin = 1" :style="tipoLogin === 1 ? 'background-color: #88D499; border-radius: 10px;' : ''">Sou cliente</div>
            </div>
            <div class="col-6">
              <div class="text-subtitle2 cursor-pointer q-mx-md" @click="tipoLogin = 2" :style="tipoLogin === 2 ? 'background-color: #88D499; border-radius: 10px;' : ''">Sou prestador</div>
            </div>
          </div>

          <!-- Formulário Cliente -->
          <div class="q-gutter-md q-py-lg" v-if="tipoLogin === 1">
            <q-input v-model="dadosCliente.emailcliente" type="email" filled dense label="Digite seu e-mail..." style="border-radius: 10px;" />
            <q-input v-model="dadosCliente.senhacliente" :type="verSenha ? 'text' : 'password'" filled dense label="Digite sua senha...">
              <template #append>
                <q-btn color="primary" size="sm" flat :icon="verSenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verSenha = !verSenha" style="border-radius: 10px;" />
              </template>
            </q-input>
          </div>

          <!-- Formulário Prestador -->
          <div class="q-gutter-md q-py-lg" v-if="tipoLogin === 2">
            <q-input v-model="dadosPrestador.cpfprestador" type="text" mask="###.###.###-##" unmasked-value filled dense label="Digite seu CPF..." style="border-radius: 10px;" />
            <q-input v-model="dadosPrestador.senhaprestador" :type="verSenha ? 'text' : 'password'" filled dense label="Digite sua senha...">
              <template #append>
                <q-btn color="primary" size="sm" flat :icon="verSenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verSenha = !verSenha" style="border-radius: 10px;" />
              </template>
            </q-input>
          </div>

          <div v-if="loading">
            <q-linear-progress indeterminate color="primary" class="q-mb-lg" />
          </div>

          <div class="q-pb-lg" align="center">
            <q-btn color="primary" label="Entrar" @click="tipoLogin === 1 ? loginCliente() : loginPrestador()" style="border-radius: 10px;" />
          </div>

          <div align="center" class="q-py-lg">
            <div>
              Não possui uma conta?
            </div>
            <div style="color: #8B61C2; text-decoration: underline;" class="text-bold">
              <span class="cursor-pointer" @click="criarContaPage()">
                Criar Conta
              </span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'loginPage',

  data () {
    return {
      tipoLogin: 1,
      loading: false,
      verSenha: false,
      dadosCliente: {
        emailcliente: '',
        senhacliente: ''
      },
      dadosPrestador: {
        cpfprestador: '',
        senhaprestador: ''
      }
    }
  },
  methods: {
    criarContaPage () {
      this.$router.push('/criaConta')
    },

    async loginCliente () {
      this.loading = true
      try {
        const dados = { ...this.dadosCliente }
        await this.$api.post('/clientes/loginCliente', dados).then(response => {
          console.log(response)
          if (response.data === null) {
            this.$q.notify({
              color: 'red',
              position: 'top',
              message: 'E-mail ou senha inválidos!',
              timeout: 3500,
              icon: 'fas fa-times'
            })
          } else {
            this.$q.sessionStorage.setItem('token', response.data.token.token)
            this.$q.sessionStorage.setItem('nome', response.data.nmcliente)
            this.$q.notify({
              color: 'green',
              position: 'top',
              message: 'Login efetuado com sucesso!',
              timeout: 3500,
              icon: 'fas fa-check'
            })
            this.$router.push('/')
          }
          this.loading = false
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style>
.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    height: 40px;
    border-radius: 10px;
}
</style>
