<template>
  <div>
    <div>
      <div v-if="loadingCEP === true" class="flex items-center q-pb-none">
        <q-linear-progress indeterminate color="primary" class="q-mb-lg" />
      </div>

      <q-input v-model="dadosEndereco.cep" filled dense type="text" label="Digite o CEP..." class="q-py-sm" mask="#####-###" unmasked-value @keyup="buscaCEP(dadosEndereco.cep)">
        <template #label>
          Digite o CEP... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosEndereco.logradouro" filled dense type="text" label="Digite o logradouro..." class="q-py-sm" :disable="loadingCEP === true">
        <template #label>
          Digite o logradouro... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosEndereco.bairro" filled dense type="text" label="Digite o bairro..." class="q-py-sm" :disable="loadingCEP === true">
        <template #label>
          Digite o bairro... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosEndereco.cidadecliente" filled dense type="text" label="Digite a cidade..." class="q-py-sm" :disable="loadingCEP === true">
        <template #label>
          Digite a cidade... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosEndereco.ufcliente" filled dense type="text" label="Digite o estado..." class="q-py-sm" maxlength="2" :disable="loadingCEP === true">
        <template #label>
          Digite o estado... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosEndereco.numero" filled dense type="text" label="Digite o número..." class="q-py-sm">
        <template #label>
          Digite o número...
        </template>
      </q-input>
      <q-input v-model="dadosEndereco.complemento" filled dense type="text" label="Digite o complemento..." class="q-py-sm">
        <template #label>
          Digite o complemento...
        </template>
      </q-input>

      <div class="text-red" style="font-size: smaller;">
        * Campos obrigatórios.
      </div>

      <div align="center" class="q-pt-md">
        <q-btn color="primary" :label="idEditar === 0 ? 'Cadastrar' : 'Atualizar'" no-caps style="border-radius: 10px;" @click="idEditar === 0 ? cadastrarEnderecoCliente() : atualizarEnderecoCliente()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gerenciaEnderecos',
  props: {
    idEditar: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dadosEndereco: {
        cep: '',
        bairro: '',
        logradouro: '',
        numero: '',
        complemento: '',
        cidadecliente: '',
        ufcliente: ''
      },
      loadingCEP: false
    }
  },
  emits: ['fechaDlgEnderecos'],
  methods: {
    async buscaCEP (cep) {
      this.loadingCEP = true
      if (cep.length === 8) {
        await this.$api.get(`https://viacep.com.br/ws/${cep}/json/`, { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }).then(response => {
          this.dadosEndereco.logradouro = response.data.logradouro
          this.dadosEndereco.bairro = response.data.bairro
          this.dadosEndereco.cidadecliente = response.data.localidade
          this.dadosEndereco.ufcliente = response.data.uf
          this.loadingCEP = false
        }).catch(() => {
          this.$q.notify({
            color: 'red',
            position: 'top',
            timeout: 3500,
            message: 'Erro ao buscar CEP. Verifique o CEP digitado.',
            icon: 'fas fa-times'
          })
          this.loadingCEP = false
        })
      }
    },

    async cadastrarEnderecoCliente () {
      try {
        if (this.dadosEndereco.cep === '') return
        if (this.dadosEndereco.bairro === '') return
        if (this.dadosEndereco.logradouro === '') return
        if (this.dadosEndereco.cidadecliente === '') return
        if (this.dadosEndereco.ufcliente === '') return
        const dados = { ...this.dadosEndereco }

        await this.$api.post('/clientes/cadastrarEnderecoCliente', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Endereço cadastrado com sucesso!',
            icon: 'fas fa-check'
          })
          this.$emit('fechaDlgEnderecos', false)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaDadosEndereco () {
      try {
        const dados = {}
        dados.idenderecocliente = this.idEditar

        await this.$api.post('/clientes/buscaDadosEndereco', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.dadosEndereco = { ...response.data }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async atualizarEnderecoCliente () {
      try {
        if (this.dadosEndereco.cep === '') return
        if (this.dadosEndereco.bairro === '') return
        if (this.dadosEndereco.logradouro === '') return
        if (this.dadosEndereco.cidadecliente === '') return
        if (this.dadosEndereco.ufcliente === '') return
        const dados = { ...this.dadosEndereco }

        await this.$api.post('/clientes/atualizarEnderecoCliente', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Endereço atualizado com sucesso!',
            icon: 'fas fa-check'
          })
          this.$emit('fechaDlgEnderecos', false)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    if (this.idEditar > 0) {
      this.buscaDadosEndereco()
    }
  }
}
</script>

<style>
.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    height: 40px;
    border-radius: 10px;
}
</style>
