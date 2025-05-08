<template>
  <q-page padding class="flex items-center justify-center">
    <div style="width: 40vh;">
      <q-card class="my-card">
        <q-card-section>
          <div align="center" class="text-h6">
            Criar Conta
          </div>

          <!-- Escolha para Criar Conta -->
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
            <q-input v-model="dadosCliente.nmcliente" filled dense type="text" label="Digite seu nome completo..." />
            <q-input v-model="dadosCliente.nrcelular" filled dense type="text" label="Digite seu e-mail..." />
            <q-input v-model="dadosCliente.emailcliente" filled dense type="email" label="Digite seu número de celular..." />
            <q-input v-model="dadosCliente.senhacliente" filled dense :type="versenha ? 'text' : 'password'" label="Digite sua senha..." >
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="versenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="versenha = !versenha" style="border-radius: 10px;" />
              </template>
            </q-input>
            <q-input v-model="dadosCliente.confirmasenha" filled dense :type="verconfirmasenha ? 'text' : 'password'" label="Confirme sua senha...">
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="verconfirmasenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verconfirmasenha = !verconfirmasenha" style="border-radius: 10px;" />
              </template>
            </q-input>
           </div>

           <!-- Formulário Prestador -->
            <div class="q-gutter-md q-py-lg" v-if="tipoLogin === 2">
              <q-input v-model="dadosPrestador.nmprestador" filled dense type="text" label="Digite seu nome completo..." />
              <q-input v-model="dadosPrestador.cpfprestador" filled dense type="text" mask="###.###.###-##" unmasked-value label="Digite seu CPF..." />
              <q-input v-model="dadosPrestador.emailprestador" filled dense type="email" label="Digite seu e-mail..." />
              <q-input v-model="dadosPrestador.telefoneprestador" filled dense type="text" label="Digite seu telefone para contato..." />
              <q-input v-model="dadosPrestador.ufprestador" filled dense type="text" label="Selecione seu estado..." />
              <q-input v-model="dadosPrestador.cidadeprestador" filled dense type="text" label="Selecione sua cidade..." />
              <q-input v-model="dadosPrestador.senhaprestador" filled dense :type="versenha ? 'text' : 'password'" label="Digite sua senha..." >
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="versenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="versenha = !versenha" style="border-radius: 10px;" />
              </template>
            </q-input>
              <q-input v-model="dadosPrestador.confirmasenha" filled dense :type="verconfirmasenha ? 'text' : 'password'" label="Confirme sua senha...">
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="verconfirmasenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verconfirmasenha = !verconfirmasenha" style="border-radius: 10px;" />
              </template>
            </q-input>
            </div>

           <div class="q-pb-lg" align="center">
            <q-btn color="primary" label="Entrar" @click="''" style="border-radius: 10px;" />
          </div>

          <div align="center" class="q-py-lg">
            <div>
              Já possui uma conta?
            </div>
            <div style="color: #8B61C2; text-decoration: underline;" class="text-bold">
              <span class="cursor-pointer" @click="loginPage()">
                Fazer Login
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
  name: 'criaContaPage',

  data () {
    return {
      tipoLogin: 1,
      dadosCliente: {
        nmcliente: '',
        nrcelular: '',
        emailcliente: '',
        senhacliente: '',
        confirmasenha: ''
      },
      dadosPrestador: {
        nmprestador: '',
        cpfprestador: '',
        emailprestador: '',
        cidadeprestador: '',
        ufprestador: '',
        telefoneprestador: '',
        senhaprestador: '',
        confirmasenha: ''
      },
      versenha: false,
      verconfirmasenha: false,
      ufs: []
    }
  },
  methods: {
    loginPage () {
      this.$router.push('/login')
    }

    // async buscaUFs () {
    //   try {
    //     await this.$api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
    //       console.log(response)
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
})
</script>

<style>
.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    height: 40px;
    border-radius: 10px;
}
</style>
