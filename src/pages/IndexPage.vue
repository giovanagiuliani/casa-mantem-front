<template>
  <q-page padding>
    <!-- Ilustrações -->
    <div class="q-pt-lg flex items-center justify-evenly">
      <div>
        <q-img
          src="../../public/Ilustração1.jpg"
          no-spinner
          :width="$q.screen.xs ? '290px' : '390px'"
        />
      </div>
      <div v-if="!$q.screen.xs">
        <q-img
          src="../../public/Ilustração2.jpg"
          no-spinner
          width="580px"
        />
      </div>
    </div>

    <!-- Selects -->
    <div class="q-pt-lg row">
      <div :class="$q.screen.xs ? 'col-xs-12 col-sm-4 q-py-sm' : 'col-xs-12 col-sm-4 q-py-sm'" :align="$q.screen.xs ? '' : 'right'">
        <q-select behavior="menu" :style="$q.screen.xs ? '' : 'width: 80%;'" v-model="servico" :options="opt_servicos" label="Procure o serviço que deseja..." @filter="fnFiltraServicos" @update:model-value="buscaPrestadoresLocal()" filled use-input />
      </div>
      <div :class="$q.screen.xs ? 'col-xs-12 col-sm-4 q-py-sm' : 'col-xs-12 col-sm-4 q-py-sm'" :align="$q.screen.xs ? '' : 'center'">
        <q-select behavior="menu" :style="$q.screen.xs ? '' : 'width: 80%;'" v-model="uf" :options="opt_UFs" label="Procure o estado..." @filter="fnFiltraUFs" @update:model-value="buscaCidades()" filled use-input />
      </div>
      <div :class="$q.screen.xs ? 'col-xs-12 col-sm-4 q-py-sm' : 'col-xs-12 col-sm-4 q-py-sm'" :align="$q.screen.xs ? '' : 'left'">
        <q-select behavior="menu" :style="$q.screen.xs ? '' : 'width: 80%;'" v-model="cidade" :options="opt_cidades" label="Procure a cidade..." @filter="fnFiltraCidades" @update:model-value="formatLocalInterface(cidade?.label, uf.nome)" :disable="uf === ''" filled use-input />
      </div>
    </div>

    <!-- Serviços -->
    <div align="center">
      <div v-if="loadingPrestadores === true || lstprestadores.length > 0" style="font-size: large;" :class="$q.screen.xs ? 'text-bold q-py-lg' : 'text-bold q-py-xl'">
        Serviços que encontramos em: {{ localInterface.cidade }} - {{ localInterface.uf }}
      </div>
      <div v-if="loadingPrestadores === false && lstprestadores.length === 0" style="font-size: large;" :class="$q.screen.xs ? 'text-bold q-py-lg' : 'text-bold q-py-xl'">
        Não encontramos serviços em: {{ localInterface.cidade }} - {{ localInterface.uf }}
      </div>

      <div>
        <div v-if="loadingPrestadores">
          <q-linear-progress indeterminate color="primary" class="q-mb-lg" :style="$q.screen.xs ? '' : 'width: 70%;'" />
        </div>
        <q-card v-if="lstprestadores.length > 0" :style="$q.screen.xs ? 'border-radius: 10px;' : 'width: 70%; border-radius: 10px;'" class="my-card">
          <q-card-section align="left">
            <div v-for="(prestador, indice) in lstprestadores" :key="prestador.idprestador">
              <div class="row">
                <div class="col-xs-2 col-sm-2 col-md-1 col-lg-1">
                  <q-avatar v-if="prestador.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img :src="`https://cdn.quasar.dev/img/${prestador.fotoprestador}`">
                  </q-avatar>
                  <q-avatar v-if="!prestador.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                    <img src="../../public/user-picture.jpg">
                  </q-avatar>
                </div>
                <div class="flex items-center col-xs-8 col-sm-5 q-px-sm">
                  <div>
                    <div style="font-size: medium;" class="text-bold">
                      {{ prestador.nmprestador }}
                    </div>
                    <div>
                      <span v-for="(servico, index) in prestador.servicos" :key="index">
                        {{ servico.nmservico }}{{ index + 1 === prestador.servicos.length ? '' : ', ' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="!$q.screen.xs" class="flex items-center justify-center col-sm-4">
                  <div align="center">
                    <div>
                      {{ prestador.cidadeprestador }} - {{ prestador.ufprestador }}
                    </div>
                    <!-- <div>
                      <q-icon name="fas fa-star" size="12px" />
                      <span class="q-pl-sm">{{ prestador.nota }}</span> • <span>{{prestador.nravaliacoes }} {{ prestador.nravaliacoes === 1 ? 'avaliação' : 'avaliações'}}</span>
                    </div> -->
                    <div>
                      <span>Sem avaliações</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-end col-xs-2 col-sm-2">
                  <div>
                    <q-btn v-if="$q.screen.xs" color="primary" :icon="prestador.verMais ? 'fas fa-angle-up' : 'fas fa-angle-down'" no-caps class="q-px-sm" @click="prestador.verMais = !prestador.verMais" style="border-radius: 10px;" />
                  </div>
                  <div>
                    <q-btn v-if="!$q.screen.xs" color="primary" label="Contratar" no-caps @click="fnAbreDlgAgendamento(prestador.idprestador)" style="border-radius: 10px;" />
                  </div>
                </div>
              </div>
              <div v-if="prestador.verMais && $q.screen.xs">
                <div class="row q-pt-sm" align="center">
                  <div class="col-7">
                    <div>
                      {{ prestador.cidadeprestador }} - {{ prestador.ufprestador }}
                    </div>
                    <!-- <div>
                      <q-icon name="fas fa-star" size="12px" />
                      <span class="q-pl-sm">{{ prestador.nota }}</span> • <span>{{prestador.nravaliacoes }} {{ prestador.nravaliacoes === 1 ? 'avaliação' : 'avaliações'}}</span>
                    </div> -->
                    <div>
                      <span>Sem avaliações</span>
                    </div>
                  </div>
                  <div class="col-5">
                    <q-btn color="primary" label="Contratar" no-caps @click="fnAbreDlgAgendamento(prestador.idprestador)" style="border-radius: 10px;" />
                  </div>
                </div>
              </div>
              <q-separator v-if="indice !== lstprestadores.length - 1" size="1px" color="gray" class="q-my-sm" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Agendamento de Serviço -->
    <q-dialog v-model="dlg_agendamento" full-width full-height :maximized="$q.screen.xs" persistent>
        <q-card style="border-radius: 10px;">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title style="font-size: 16px;">
              Contratar Serviço
            </q-toolbar-title>
            <q-btn flat round dense icon="fas fa-times" @click="dlg_agendamento = false;" />
          </q-toolbar>
          <q-card-section>
            <agendamentoServico :idprestador="idprestador" @fechaDlgAgendamento="fnFechaDlgAgendamento" />
          </q-card-section>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import agendamentoServico from 'src/components/agendamentoServico.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    agendamentoServico
  },
  data () {
    return {
      uf: '',
      cidade: '',
      servico: '',
      localidade: '',
      idprestador: 0,
      dlg_agendamento: false,
      loadingPrestadores: false,
      opt_UFs: [],
      cidades: [],
      opt_cidades: [],
      lstservicos: [],
      opt_servicos: [],
      lstprestadores: [],
      opt_localidades: [],
      unidadesFederativas: [],
      geolocUsuario: {
        latitude: '',
        longitude: ''
      },
      localInterface: {
        cidade: '',
        uf: ''
      }
    }
  },
  methods: {
    locUsuario () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.geolocUsuario.latitude = position.coords.latitude
            this.geolocUsuario.longitude = position.coords.longitude
            this.buscarEndereco()
          },
          (error) => {
            console.error('Erro ao obter localização:', error.message)
          }
        )
      }
    },

    formatLocalInterface (nomeCidade, nomeEstado) {
      this.localInterface.cidade = nomeCidade
      const filter = this.unidadesFederativas.find(v => v.nome === nomeEstado)
      this.localInterface.uf = filter.label

      if (this.localInterface.cidade !== '' && this.localInterface.uf !== '') {
        this.buscaPrestadoresLocal()
      }
    },

    fnFiltraServicos (val, update) {
      if (val === '') {
        update(() => {
          this.opt_servicos = [...this.lstservicos]
        })
        return
      }

      update(() => {
        this.opt_servicos = this.lstservicos.filter(v => v.label.toUpperCase().includes(val.toUpperCase()))
      })
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

    fnAbreDlgAgendamento (idprestador) {
      this.idprestador = idprestador
      this.dlg_agendamento = true
    },

    fnFechaDlgAgendamento (value) {
      this.dlg_agendamento = value
    },

    async buscarEndereco () {
      this.loadingPrestadores = true
      const lat = this.geolocUsuario.latitude
      const lon = this.geolocUsuario.longitude

      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`

      try {
        const resposta = await fetch(url, {
          headers: {
            'User-Agent': 'casamantem/1.0 (giovanagiuliani@gmail.com)',
            'Accept-Language': 'pt-BR'
          }
        })

        const dados = await resposta.json()
        const endereco = dados.address

        const cidade = endereco.city || endereco.town || endereco.village
        const estado = endereco.state

        this.formatLocalInterface(cidade, estado)
      } catch (erro) {
        console.error('Erro ao buscar endereço:', erro)
      }
    },

    async buscaUnidadesFederativas () {
      try {
        await this.$api.post('/prestadores/buscaUnidadesFederativas').then(response => {
          this.unidadesFederativas = response.data.map((uf) => ({
            label: uf.sigla,
            value: uf.id,
            nome: uf.nome
          }))
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaCidades () {
      try {
        console.log(this.uf)
        if (this.uf === '') return
        const dados = {}
        dados.ufprestador = this.uf?.value

        await this.$api.post('/prestadores/buscaCidades', dados).then(response => {
          this.cidades = response.data.map((cidade) => ({
            label: cidade.nome,
            value: cidade.id
          }))
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaPrestadoresLocal () {
      this.loadingPrestadores = true
      try {
        const dados = {
          cidade: this.localInterface.cidade,
          uf: this.localInterface.uf,
          idservico: this.servico === '' ? null : this.servico.value
        }

        await this.$api.post('/prestadores/buscaPrestadoresLocal', dados).then(response => {
          this.lstprestadores = [...response.data]
          this.loadingPrestadores = false
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaListaServicos () {
      try {
        await this.$api.post('/servicos/buscaListaServicos').then(response => {
          this.lstservicos = [...response.data]
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.buscaUnidadesFederativas()
  },
  mounted () {
    this.locUsuario()
    this.buscaListaServicos()
  }
})
</script>

<style>
.q-select--with-input .q-field__control {
    cursor: pointer;
    border-radius: 10px;
}
</style>
