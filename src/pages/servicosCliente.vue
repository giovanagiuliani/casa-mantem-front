<template>
  <q-page padding class="flex items-center justify-center">
    <div style="width: 100vh; height: 75vh;">
      <q-card class="my-card">
        <q-card-section>
          <div>
            <div>
              Serviços a realizar
            </div>
            <div>
              <q-separator color="black" size="1px" />
            </div>
          </div>

          <div v-if="lstServicosRealizar.length === 0" class="q-pt-sm">
            <q-icon name="fas fa-circle-exclamation" class="q-pr-xs" />
            Não há serviços a serem realizados.
          </div>

          <div v-if="lstServicosRealizar.length > 0">
            <div v-for="realizar in lstServicosRealizar" :key="realizar.idservicoagendado">
              <div class="row q-py-md">
                <div class="col-xs-2 col-sm-1" align="center">
                  <q-avatar v-if="realizar.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img :src="`https://cdn.quasar.dev/img/${realizar.fotoprestador}`">
                  </q-avatar>
                  <q-avatar v-if="!realizar.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img src="../../public/user-picture.jpg">
                  </q-avatar>
                </div>

                <div class="col-xs-10 col-sm-9">
                  <div>
                    <q-icon :name="realizar.favorito ? 'fas fa-star' : 'far fa-star'" color="primary" class="q-px-sm cursor-pointer" @click="favDesfavPrestador(realizar.idprestador)" />
                    {{ realizar.nmprestador }}
                  </div>
                  <div class="row">
                    <div class="col-xs-12 col-sm-4">
                      <span class="text-bold">Serviço:</span> {{ realizar.nmservico }}
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <span class="text-bold">Data:</span> {{ fnFormataData(realizar.dtprevisto) }}
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <span class="text-bold">Hora:</span> {{ realizar.horainicio }} {{ realizar.horafim ? ' - ' + realizar.horafim : '' }}
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <span class="text-bold">Endereço:</span> {{ realizar.logradouro }}, {{ realizar.bairro }}, {{ realizar.numero }}{{ realizar.complemento ? ', ' + realizar.complemento : '' }}
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <span class="text-bold">Solicitado em:</span> {{ fnFormataData(realizar.dtregistro) }}
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-2 flex items-center">
                  <q-btn color="primary" no-caps style="border-radius: 10px;" label="Cancelar" :disable="fnVerificaDtprevisto(realizar.dtprevisto)" @click="cancelarSolicitacaoServico(realizar.idservicoagendado)">
                    <q-tooltip v-if="fnVerificaDtprevisto(realizar.dtprevisto)">
                      Cancelamentos somente até o dia anterior.
                    </q-tooltip>
                  </q-btn>
                </div>

              </div>
              <q-separator size="1px" color="light-grey" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <div>
              Serviços aguardando confirmação
            </div>
            <div>
              <q-separator color="black" size="1px" />
            </div>
          </div>

          <div v-if="lstServicosAguardando.length === 0" class="q-pt-sm">
            <q-icon name="fas fa-circle-exclamation" class="q-pr-xs" />
            Não há serviços aguardando confirmação.
          </div>

          <div v-if="lstServicosAguardando.length > 0">
            <div v-for="aguardando in lstServicosAguardando" :key="aguardando.idservicoagendado">
              <div class="row q-py-md">
                <div class="col-xs-2 col-sm-1" align="center">
                  <q-avatar v-if="aguardando.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img :src="`https://cdn.quasar.dev/img/${aguardando.fotoprestador}`">
                  </q-avatar>
                  <q-avatar v-if="!aguardando.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img src="../../public/user-picture.jpg">
                  </q-avatar>
                </div>

                <div class="col-xs-10 col-sm-9">
                  <div>
                    <q-icon :name="aguardando.favorito ? 'fas fa-star' : 'far fa-star'" color="primary" class="q-px-sm cursor-pointer" @click="favDesfavPrestador(aguardando.idprestador)" />
                    {{ aguardando.nmprestador }}
                  </div>
                  <div class="row">
                    <div class="col-xs-12 col-sm-4">
                      <span class="text-bold">Serviço:</span> {{ aguardando.nmservico }}
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <span class="text-bold">Data:</span> {{ fnFormataData(aguardando.dtprevisto) }}
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <span class="text-bold">Hora:</span> {{ aguardando.horainicio }} {{ aguardando.horafim ? ' - ' + aguardando.horafim : '' }}
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <span class="text-bold">Endereço:</span> {{ aguardando.logradouro }}, {{ aguardando.bairro }}, {{ aguardando.numero }}{{ aguardando.complemento ? ', ' + aguardando.complemento : '' }}
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <span class="text-bold">Solicitado em:</span> {{ fnFormataData(aguardando.dtregistro) }}
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-2 flex items-center">
                  <q-btn color="primary" no-caps style="border-radius: 10px;" label="Cancelar" @click="cancelarSolicitacaoServico(aguardando.idservicoagendado)" />
                </div>

              </div>
              <q-separator size="1px" color="light-grey" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <div>
              Serviços já realizados
            </div>
            <div>
              <q-separator color="black" size="1px" />
            </div>
          </div>

          <div v-if="lstServicosRealizado.length === 0" class="q-pt-sm">
            <q-icon name="fas fa-circle-exclamation" class="q-pr-xs" />
            Não há serviços realizados.
          </div>

          <div v-if="lstServicosRealizado.length > 0">
            <div v-for="realizado in lstServicosRealizado" :key="realizado.idservicoagendado">
              <div class="row q-py-md">
                <div class="col-xs-2 col-sm-1" align="center">
                  <q-avatar v-if="realizado.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img :src="`https://cdn.quasar.dev/img/${realizado.fotoprestador}`">
                  </q-avatar>
                  <q-avatar v-if="!realizado.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img src="../../public/user-picture.jpg">
                  </q-avatar>
                </div>

                <div class="col-xs-10 col-sm-11">
                  <div class="flex justify-between">
                    <div>
                      <q-icon :name="realizado.favorito ? 'fas fa-star' : 'far fa-star'" color="primary" class="q-px-sm cursor-pointer" @click="favDesfavPrestador(realizado.idprestador)" />
                      {{ realizado.nmprestador }}
                    </div>
                    <!-- <div v-if="!$q.screen.xs" class="flex q-gutter-sm">
                      <div>Avaliação: </div>
                      <div><q-icon name="far fa-star" color="secondary" /></div>
                      <div><q-icon name="far fa-star" color="secondary" /></div>
                      <div><q-icon name="far fa-star" color="secondary" /></div>
                      <div><q-icon name="far fa-star" color="secondary" /></div>
                      <div><q-icon name="far fa-star" color="secondary" /></div>
                    </div> -->
                  </div>
                  <div class="row">
                    <div class="col-xs-12 col-sm-3">
                      <span class="text-bold">Serviço:</span> {{ realizado.nmservico }}
                    </div>
                    <div class="col-xs-6 col-sm-3">
                      <span class="text-bold">Data:</span> {{ fnFormataData(realizado.dtprevisto) }}
                    </div>
                    <div class="col-xs-6 col-sm-4">
                      <span class="text-bold">Hora:</span> {{ realizado.horainicio }} {{ realizado.horafim ? ' - ' + realizado.horafim : '' }}
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <span class="text-bold">Endereço:</span> {{ realizado.logradouro }}, {{ realizado.bairro }}, {{ realizado.numero }}{{ realizado.complemento ? ', ' + realizado.complemento : '' }}
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <span class="text-bold">Solicitado em:</span> {{ fnFormataData(realizado.dtregistro) }}
                    </div>
                  </div>
                </div>

              </div>
              <q-separator size="1px" color="light-grey" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
const dayjs = require('dayjs')
dayjs().format()
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

export default defineComponent({
  name: 'servicosCliente',

  data () {
    return {
      lstServicosRealizar: [],
      lstServicosRealizado: [],
      lstServicosAguardando: []
    }
  },
  methods: {
    fnFormataData (data) {
      return data ? dayjs.tz(data).format('DD/MM/YYYY') : ''
    },

    fnVerificaDtprevisto (dtprevisto) {
      if (dayjs.tz(dtprevisto).format('DD/MM/YYYY') === dayjs.tz().format('DD/MM/YYYY')) {
        return true
      } else {
        return false
      }
    },

    async buscaServicosAguardando () {
      try {
        await this.$api.post('/servicos/buscaServicosAguardando', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.lstServicosAguardando = [...response.data]
        })
      } catch (error) {
        console.log(error)
      }
    },

    async cancelarSolicitacaoServico (idservicoagendado) {
      try {
        const dados = {}
        dados.idservicoagendado = idservicoagendado

        await this.$api.post('/servicos/cancelarSolicitacaoServico', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Solicitação de agendamento cancelada com sucesso!',
            icon: 'fas fa-check'
          })
          this.buscaServicosAguardando()
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaServicosRealizar () {
      try {
        await this.$api.post('/servicos/buscaServicosRealizar', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.lstServicosRealizar = [...response.data]
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaServicosRealizados () {
      try {
        await this.$api.post('/servicos/buscaServicosRealizados', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.lstServicosRealizado = [...response.data]
        })
      } catch (error) {
        console.log(error)
      }
    },

    async favDesfavPrestador (idprestador) {
      try {
        const dados = {}
        dados.idprestador = idprestador

        await this.$api.post('/clientes/favDesfavPrestador', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.buscaServicosAguardando()
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.buscaServicosAguardando()
    this.buscaServicosRealizar()
    this.buscaServicosRealizados()
  }
})
</script>
