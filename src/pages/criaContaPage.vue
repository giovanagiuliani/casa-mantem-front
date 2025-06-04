<template>
  <q-page padding class="flex items-center justify-center">
    <div style="width: 60vh;">
      <q-card class="my-card">
        <q-card-section>
          <div align="center" class="text-h6">
            Criar Conta {{  tipoLogin === 1 ? 'como Cliente' : 'como Prestador' }}
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
            <q-input v-model="dadosCliente.nmcliente" filled dense type="text" label="Digite seu nome completo...">
              <template #label>
                Digite seu nome completo... <span class="text-red">*</span>
              </template>
            </q-input>
            <q-input v-model="dadosCliente.emailcliente" filled dense type="email" label="Digite seu e-mail...">
              <template #label>
                Digite seu e-mail... <span class="text-red">*</span>
              </template>
            </q-input>
            <q-input v-model="dadosCliente.senhacliente" filled dense :type="versenha ? 'text' : 'password'" label="Digite sua senha..." reactive-rules :rules="[ val => val === dadosCliente.confirmasenha || 'Senhas não coincidem.' ]" hide-bottom-space>
              <template #label>
                Digite sua senha... <span class="text-red">*</span>
              </template>
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="versenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="versenha = !versenha" style="border-radius: 10px;" />
              </template>
            </q-input>
            <q-input v-model="dadosCliente.confirmasenha" filled dense :type="verconfirmasenha ? 'text' : 'password'" label="Confirme sua senha..." reactive-rules :rules="[ val => val === dadosCliente.senhacliente || 'Senhas não coincidem.' ]" hide-bottom-space>
              <template #label>
                Confirme sua senha... <span class="text-red">*</span>
              </template>
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="verconfirmasenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verconfirmasenha = !verconfirmasenha" style="border-radius: 10px;" />
              </template>
            </q-input>
            <div class="text-red" style="font-size: smaller;">
              * Campos obrigatórios.
            </div>
          </div>

          <!-- Formulário Prestador -->
          <div class="q-gutter-md q-py-lg" v-if="tipoLogin === 2">
            <q-input v-model="dadosPrestador.nmprestador" filled dense type="text" label="Digite seu nome completo...">
              <template #label>
                Digite seu nome completo... <span class="text-red">*</span>
              </template>
            </q-input>
            <q-input v-model="dadosPrestador.cpfprestador" filled dense type="text" mask="###.###.###-##" unmasked-value label="Digite seu CPF...">
              <template #label>
                Digite seu CPF... <span class="text-red">*</span>
              </template>
            </q-input>
            <q-input v-model="dadosPrestador.emailprestador" filled dense type="email" label="Digite seu e-mail...">
              <template #label>
                Digite seu e-mail... <span class="text-red">*</span>
              </template>
            </q-input>
            <q-input v-model="dadosPrestador.celularprestador" filled dense type="text" mask="(##) # ####-####" label="Digite seu telefone para contato...">
              <template #label>
                Digite seu telefone para contato... <span class="text-red">*</span>
              </template>
            </q-input>
            <q-checkbox v-model="dadosPrestador.whatsapp" dense label="Aceito receber mensagens no WhatsApp deste número." />
            <q-select v-model="dadosPrestador.ufprestador" use-input dense filled maxlength="2" :options="opt_UFs" label="Selecione seu estado..." @filter="fnFiltraUFs" @update:model-value="buscaCidades()">
              <template #label>
                Selecione seu estado... <span class="text-red">*</span>
              </template>
            </q-select>
            <q-select v-model="dadosPrestador.cidadeprestador" use-input filled dense :options="opt_cidades" label="Selecione sua cidade..." :disable="dadosPrestador.ufprestador === ''" @filter="fnFiltraCidades">
              <template #label>
                Selecione sua cidade... <span class="text-red">*</span>
              </template>
            </q-select>
            <q-input v-model="dadosPrestador.senhaprestador" filled dense :type="versenha ? 'text' : 'password'" label="Digite sua senha..." reactive-rules :rules="[ val => val === dadosPrestador.confirmasenha || 'Senhas não coincidem.' ]" hide-bottom-space>
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="versenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="versenha = !versenha" style="border-radius: 10px;" />
              </template>
              <template #label>
                Digite sua senha... <span class="text-red">*</span>
              </template>
            </q-input>
            <q-input v-model="dadosPrestador.confirmasenha" filled dense :type="verconfirmasenha ? 'text' : 'password'" label="Confirme sua senha..." reactive-rules :rules="[ val => val === dadosPrestador.senhaprestador || 'Senhas não coincidem.' ]" hide-bottom-space>
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="verconfirmasenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verconfirmasenha = !verconfirmasenha" style="border-radius: 10px;" />
              </template>
              <template #label>
                Confirme sua senha... <span class="text-red">*</span>
              </template>
            </q-input>
            <div class="text-red" style="font-size: smaller;">
              * Campos obrigatórios.
            </div>
          </div>

          <div class="q-pb-lg" align="center">
            <q-btn color="primary" label="Cadastrar" @click="tipoLogin === 1 ? cadastrarCliente() : cadastrarPrestador()" style="border-radius: 10px;" />
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
        celularprestador: '',
        senhaprestador: '',
        confirmasenha: '',
        whatsapp: false
      },
      versenha: false,
      verconfirmasenha: false,
      cidades: [],
      opt_UFs: [],
      opt_cidades: [],
      unidadesFederativas: []
    }
  },
  methods: {
    loginPage () {
      this.$router.push('/login')
    },

    limpaCampos () {
      this.dadosCliente = {
        nmcliente: '',
        emailcliente: '',
        senhacliente: '',
        confirmasenha: ''
      }
      this.dadosPrestador = {
        nmprestador: '',
        cpfprestador: '',
        emailprestador: '',
        cidadeprestador: '',
        ufprestador: '',
        celularprestador: '',
        senhaprestador: '',
        confirmasenha: ''
      }
    },

    fnFiltraUFs (val, update) {
      if (val === '') {
        update(() => {
          this.opt_UFs = [...this.unidadesFederativas]
        })
        return
      }

      update(() => {
        this.opt_UFs = this.unidadesFederativas.filter(v => v.label.includes(val.toUpperCase()))
      })
    },

    fnFiltraCidades (val, update) {
      if (val === '') {
        update(() => {
          this.opt_cidades = [...this.cidades]
        })
        return
      }

      update(() => {
        this.opt_cidades = this.cidades.filter(v => (v.label.toUpperCase()).includes(val.toUpperCase()))
      })
    },

    async cadastrarCliente () {
      try {
        if (this.dadosCliente.nmcliente === '') return
        if (this.dadosCliente.emailcliente === '') return
        if (this.dadosCliente.senhacliente === '') return
        if (this.dadosCliente.confirmasenha === '') return

        const dados = { ...this.dadosCliente }

        await this.$api.post('/clientes/cadastrarCliente', dados).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            message: 'Conta criada com sucesso! Faça seu login!',
            timeout: 3500,
            icon: 'fas fa-check'
          })
          this.limpaCampos()
          this.$router.push('/login')
        })
      } catch (error) {
        console.log(error)
      }
    },

    async cadastrarPrestador () {
      try {
        if (this.dadosPrestador.nmprestador === '') return
        if (this.dadosPrestador.cpfprestador === '') return
        if (this.dadosPrestador.emailprestador === '') return
        if (this.dadosPrestador.cidadeprestador === '') return
        if (this.dadosPrestador.ufprestador === '') return
        if (this.dadosPrestador.celularprestador === '') return
        if (this.dadosPrestador.senhaprestador === '') return
        if (this.dadosPrestador.confirmasenha === '') return

        const dados = { ...this.dadosPrestador }
        await this.$api.post('/prestadores/cadastrarPrestador', dados).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            message: 'Conta criada com sucesso! Faça seu login!',
            timeout: 3500,
            icon: 'fas fa-check'
          })
          this.limpaCampos()
          this.$router.push('/login')
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaUnidadesFederativas () {
      try {
        await this.$api.post('/prestadores/buscaUnidadesFederativas').then(response => {
          this.unidadesFederativas = response.data.map((uf) => ({
            label: uf.sigla,
            value: uf.id
          }))
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaCidades () {
      try {
        if (this.dadosPrestador.ufprestador === '') return
        const dados = {}
        dados.ufprestador = this.dadosPrestador.ufprestador?.value
        await this.$api.post('/prestadores/buscaCidades', dados).then(response => {
          this.cidades = response.data.map((cidade) => ({
            label: cidade.nome,
            value: cidade.id
          }))
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.buscaUnidadesFederativas()
  }
})
</script>

<style>
.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    height: 40px;
    border-radius: 10px;
}
</style>
