<template>
  <div>
    <!-- Topo -->
    <div style="height: 100px;" align="center">
      <div class="q-pl-md q-pb-sm" :style="$q.screen.xs ? '' : 'display: flex; position: absolute; left: 0;'">
        <q-avatar v-if="dadosPrestador.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
          <img :src="`https://cdn.quasar.dev/img/${dadosPrestador.fotoprestador}`">
        </q-avatar>
        <q-avatar v-if="!dadosPrestador.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
          <img src="../../public/user-picture.jpg">
        </q-avatar>
      </div>

      <div class="text-bold">
        Disponibilidade de {{ dadosPrestador.nmprestador }}
      </div>
    </div>

    <div class="row">
      <!-- Dia para realização do serviço -->
      <div class="col-xs-12 col-sm-4 q-px-lg">
        <div>
          <div>
            Escolha o dia para realização do serviço
          </div>
          <div>
            <q-separator color="black" size="1px" />
          </div>
        </div>

        <div class="q-pt-lg" align="center">
          <q-date
            style="width: 90%;"
            bordered
            flat
            v-model="dadosAgendamento.dtServico"
            :options="disableDataAnterior"
            minimal
          />
        </div>
      </div>

      <!-- Serviços ofertados e Horário disponíveis -->
      <div class="col-xs-12 col-sm-4 q-px-lg">
        <!-- Serviços ofertados -->
        <div style="height: 160px;">
          <div>
            <div>
              Serviços ofertados
            </div>
            <div>
              <q-separator color="black" size="1px" />
            </div>
          </div>

          <div v-for="servico in servicosOfertados" :key="servico.idservicoprestador" class="q-pt-lg">
            <q-checkbox keep-color color="primary" dense v-model="servico.selecionado" :label="servico.nmservico" />
          </div>
        </div>

        <!-- Horários disponíveis -->
        <div>
          <div>
            <div>
              Horários disponíveis para: <span class="text-bold">{{ fnFormataData(this.dadosAgendamento.dtServico) }}</span>
            </div>
            <div>
              <q-separator color="black" size="1px" />
            </div>
          </div>

          <div class="flex text-center justify-between">
            <div v-for="(hora, index) in horariosOfertados" :key="index" @click="fnSelecionaHorario(hora)" :class="`cursor-pointer q-px-sm q-py-xs q-ma-sm ${ hora.selecionado ? 'bg-primary text-white' : '' }`" :style="`border: 3px solid #8B61C2; border-radius: 10px; width: 100px; font-size: medium; ${ hora.desabilitado ? 'opacity: 40%;' : '' }`">
              <span style="width: 100%;">{{ hora.hora }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Entre em contato com o prestador -->
      <div class="col-xs-12 col-sm-4">
        <div>
          <div>
            Entre em contato com o prestador
          </div>
          <div>
            <q-separator color="black" size="1px" />
          </div>
        </div>

        <div class="q-pt-lg" style="font-size: small;">
          Para combinar valores e efetuar pagamentos, entre em contato com o prestador do serviço. <span class="text-bold">Nossa plataforma não contempla pagamentos online.</span>
        </div>
        <div class="q-pt-lg">
          <div>
            <q-icon name="fas fa-envelope" size="32px" color="secondary" class="q-pr-sm" />
            {{ dadosPrestador.emailprestador }}
          </div>
          <div v-if="dadosPrestador.whatsapp" class="q-pt-md">
            <q-icon name="fab fa-square-whatsapp" size="32px" color="secondary" class="q-pr-sm" />
            {{ dadosPrestador.celularprestador }}
          </div>
        </div>
      </div>
    </div>

    <!-- Revise as informações -->
    <div class="q-pt-xl">
      <div>
        <div class="text-bold">
          Revise as informações
        </div>
        <div>
          <q-separator color="black" size="1px" />
        </div>
      </div>

      <div class="flex items-center justify-around q-pt-md">
        <div>
          Prestador: <span style="font-size: medium;" class="text-bold">{{ dadosPrestador.nmprestador }}</span>
        </div>
        <div>
          <q-icon name="fas fa-arrow-right" color="secondary" size="32px" />
        </div>
        <div>
          Data: <span style="font-size: medium;" class="text-bold">{{ fnFormataData(dadosAgendamento.dtServico) }}</span>
        </div>
        <div>
          <q-icon name="fas fa-arrow-right" color="secondary" size="32px" />
        </div>
        <div>
          Serviço: <span style="font-size: medium;" class="text-bold">{{ servicosOfertados.find(v => v.selecionado === true)?.nmservico || 'Não selecionado' }}</span>
        </div>
        <div>
          <q-icon name="fas fa-arrow-right" color="secondary" size="32px" />
        </div>
        <div>
          Horário: <span style="font-size: medium;" class="text-bold">{{ horariosOfertados.find(v => v.selecionado === true)?.hora || 'Não selecionado' }}</span>
        </div>
      </div>
    </div>

    <div align="center" class="q-pt-xl">
      <div>
        <q-btn color="primary" no-caps label="Solicitar Agendamento" style="border-radius: 10px; width: 300px;" @click="solicitarAgendamento()" />
      </div>
      <div class="text-red q-pt-md">
        A solicitação ficará pendente até que o prestador confirme o agendamento.
      </div>
    </div>
  </div>
</template>

<script>
const dayjs = require('dayjs')
dayjs().format()
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default {
  name: 'agendamentoServico',
  props: {
    idprestador: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      dadosPrestador: {},
      dadosAgendamento: {
        dtServico: dayjs().format('YYYY/MM/DD')
      },
      servicosOfertados: [],
      horariosOfertados: [],
      horariosPrestador: []
    }
  },
  emits: ['fechaDlgAgendamento'],
  methods: {
    disableDataAnterior (date) {
      return date >= dayjs().format('YYYY/MM/DD')
    },

    fnFormataData (data) {
      return data ? dayjs(data).format('DD/MM/YYYY') : ''
    },

    fnSelecionaHorario (hora) {
      if (this.horariosOfertados.filter(v => v.selecionado === true).length === 0) {
        this.horariosOfertados.filter(v => v.hora === hora.hora)[0].selecionado = true
      } else {
        if (hora.hora !== this.horariosOfertados.filter(v => v.selecionado === true)[0].hora) {
          this.horariosOfertados.filter(v => v.selecionado === true)[0].selecionado = false
          this.horariosOfertados.filter(v => v.hora === hora.hora)[0].selecionado = true
        } else {
          this.horariosOfertados.filter(v => v.selecionado === true)[0].selecionado = false
        }
      }
    },

    async buscaDadosPrestador () {
      try {
        const dados = {}
        dados.idprestador = this.idprestador
        await this.$api.post('/prestadores/buscaDadosPrestador', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.dadosPrestador = { ...response.data }
          this.buscaServicosOfertados()
          this.buscaHorariosPrestador()
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaServicosOfertados () {
      try {
        const dados = {}
        dados.idprestador = this.idprestador

        await this.$api.post('/servicos/buscaServicosOfertados', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.servicosOfertados = response.data.map((opt) => ({
            nmservico: opt.nmservico,
            observacao: opt.observacao,
            tipocargahoraria: opt.tipocargahoraria,
            idservicoprestador: opt.idservicoprestador,
            idservico: opt.idservico,
            selecionado: false
          }))
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaHorariosPrestador () {
      try {
        const dados = {}
        dados.idprestador = this.idprestador

        await this.$api.post('/horarios/buscaHorariosPrestador', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.horariosPrestador = [...response.data]
          if (dayjs(this.dadosAgendamento.dtServico).day() > 0 && dayjs(this.dadosAgendamento.dtServico).day() < 6) {
            this.horariosOfertados = this.horariosPrestador.filter(v => v.diadesemana === true)[0].horarios.map(hora => ({
              hora,
              selecionado: false,
              desabilitado: false
            }))
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async solicitarAgendamento () {
      try {
        if (this.servicosOfertados.filter(v => v.selecionado === true).length === 0) return
        if (this.horariosOfertados.filter(v => v.selecionado === true).length === 0) return
        const dados = {}
        dados.idservico = this.servicosOfertados.find(v => v.selecionado).idservicoprestador
        dados.idprestador = this.idprestador
        dados.dtprevisto = dayjs(this.dadosAgendamento.dtServico).toISOString()
        dados.horainicio = this.horariosOfertados.find(v => v.selecionado).hora
        dados.situacao = 1

        await this.$api.post('/servicos/solicitarAgendamento', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Agendamento solicitado com sucesso!',
            icon: 'fas fa-check'
          })
          this.$emit('fechaDlgAgendamento', false)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    if (this.idprestador !== 0) {
      this.buscaDadosPrestador()
    }
  }
}
</script>
