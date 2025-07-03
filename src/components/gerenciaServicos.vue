<template>
  <div>
    <div class="q-gutter-md" align="center">
      <div>
        <q-select v-model="dadosServicoOfertado.idservico" :options="opt_servicos" label="Escolha o serviço a ser ofertado..." filled dense use-input map-options />
      </div>

      <div align="left">
        <div class="q-pl-sm">
          Carga Horária
        </div>
        <div>
          <q-radio v-model="dadosServicoOfertado.tipocargahoraria" :val="1" label="Horário fixo" />
          <q-radio v-model="dadosServicoOfertado.tipocargahoraria" :val="2" label="Período" class="q-pl-md" />
        </div>
        <div class="q-pl-sm text-bold text-grey" style="font-size: smaller;">
          Exemplo: {{ dadosServicoOfertado.tipocargahoraria === 1 ? 'às 14:00' : 'das 13:00 às 17:00' }}
        </div>
      </div>

      <div>
        <q-input v-model="dadosServicoOfertado.observacao" type="text" label="Digite uma observação (opcional)..." filled dense />
      </div>

      <div align="left">
        <div>
          Carga Horária
        </div>
        <div>
          <q-separator size="1px" color="black" />
        </div>

        <div class="q-pt-xs" style="font-size: smaller">
          A plataforma sugere alguns horários padrões para começar, mas você pode <span class="text-bold">adicionar</span> novos horários e <span class="text-bold">remover</span> horários existentes.
        </div>

        <div class="q-pt-md">
          <div class="text-bold">
            Dias de semana
          </div>
          <div class="flex text-center">
            <div v-for="(horarios1, index) in diasDeSemanaDefault" :key="index" class="q-px-sm q-py-xs q-ma-sm" style="border: 3px solid #8B61C2; border-radius: 10px; width: 100px;">
              <span style="width: 100%;">{{ horarios1 }}</span>
            </div>
          </div>
        </div>

        <div class="q-pt-md">
          <div class="text-bold">
            Sábados
          </div>
          <div class="flex text-center">
            <div v-for="(horarios2, index) in sabadosDefault" :key="index" class="q-px-sm q-py-xs q-ma-sm" style="border: 3px solid #8B61C2; border-radius: 10px; width: 100px;">
              <span style="width: 100%;">{{ horarios2 }}</span>
            </div>
          </div>
        </div>

        <div class="q-pt-md">
          <div class="text-bold">
            Domingos e Feriados
          </div>
          <div class="flex text-center">
            <div v-for="(horarios3, index) in domingoferiDefault" :key="index" class="q-px-sm q-py-xs q-ma-sm" style="border: 3px solid #8B61C2; border-radius: 10px; width: 100px;">
              <span style="width: 100%;">{{ horarios3 }}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <q-btn color="primary" icon="fas fa-check" :label="idEditar === 0 ? 'Cadastrar' : 'Atualizar'" style="border-radius: 10px;" @click="idEditar === 0 ? cadastrarServicoOfertado() : atualizarServicoOfertado()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gerenciaServicos',
  props: {
    idEditar: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      dadosServicoOfertado: {
        idservico: '',
        observacao: '',
        tipocargahoraria: 1
      },
      opt_servicos: [],
      sabadosDefault: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'],
      domingoferiDefault: ['09:00', '10:00', '11:00'],
      diasDeSemanaDefault: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      sabadosPrestador: [],
      domingoferiPrestador: [],
      diasDeSemanaPrestador: []
    }
  },
  emits: ['fnDlgServico'],
  methods: {
    async buscaListaServicos () {
      try {
        await this.$api.post('/servicos/buscaListaServicos', {}).then(response => {
          this.opt_servicos = [...response.data]
        })
      } catch (error) {
        console.log(error)
      }
    },

    async cadastrarServicoOfertado () {
      try {
        const dados = { ...this.dadosServicoOfertado }

        await this.$api.post('/servicos/cadastrarServicoOfertado', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Serviço cadastrado com sucesso!',
            icon: 'fas fa-check'
          })
          this.$emit('fnDlgServico', false)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaDadosServicoOfertado () {
      try {
        const dados = {}
        dados.idservicoprestador = this.idEditar

        await this.$api.post('/servicos/buscaDadosServicoOfertado', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.dadosServicoOfertado = { ...response.data }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async atualizarServicoOfertado () {
      try {
        const dados = { ...this.dadosServicoOfertado }
        dados.idservicoprestador = this.idEditar

        await this.$api.post('/servicos/atualizarServicoOfertado', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Serviço atualizado com sucesso!',
            icon: 'fas fa-check'
          })
          this.$emit('fnDlgServico', false)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.buscaListaServicos()
    if (this.idEditar > 0) {
      this.buscaDadosServicoOfertado()
    }
  }
}
</script>
