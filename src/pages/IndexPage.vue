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
      <div :class="$q.screen.xs ? 'col-xs-12 col-sm-6 q-py-sm' : 'col-xs-12 col-sm-6 q-pr-xl q-py-sm'" :align="$q.screen.xs ? '' : 'right'">
        <q-select behavior="menu" :style="$q.screen.xs ? '' : 'width: 65%;'" v-model="servico" :options="opt_servicos" label="Procure o serviço que deseja..." filled />
      </div>
      <div :class="$q.screen.xs ? 'col-xs-12 col-sm-6 q-py-sm' : 'col-xs-12 col-sm-6 q-pl-xl q-py-sm'" :align="$q.screen.xs ? '' : 'left'">
        <q-select behavior="menu" :style="$q.screen.xs ? '' : 'width: 65%;'" v-model="localidade" :options="opt_localidades" label="Procure a localidade..." filled />
      </div>
    </div>

    <!-- Serviços -->
    <div align="center">
      <div style="font-size: large;" :class="$q.screen.xs ? 'text-bold q-py-lg' : 'text-bold q-py-xl'">
        Serviços que encontramos em: Santa Maria - RS <!-- Substituir por variável que armazene a localização do usuário -->
      </div>

      {{ $q.screen.name }}

      <div>
        <q-card :style="$q.screen.xs ? 'border-radius: 10px;' : 'width: 70%; border-radius: 10px;'" class="my-card">
          <q-card-section align="left">
            <div v-for="(prestador, indice) in lstservicos" :key="prestador.id">
              <div class="row">
                <div class="col-xs-2 col-sm-2 col-md-1 col-lg-1">
                  <q-avatar :size="$q.screen.xs ? '50px' : '64px'">
                    <img :src="`https://cdn.quasar.dev/img/${prestador.avatar}`">
                  </q-avatar>
                </div>
                <div class="flex items-center col-xs-8 col-sm-5 q-px-sm">
                  <div>
                    <div style="font-size: medium;" class="text-bold">
                      {{prestador.name}}
                    </div>
                    <div>
                      <span v-for="(servico, index) in prestador.servicos" :key="index">
                        {{ servico }}{{ index + 1 === prestador.servicos.length ? '' : ', ' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="!$q.screen.xs" class="flex items-center justify-center col-sm-4">
                  <div align="center">
                    <div>
                      {{ prestador.cidade }} - {{ prestador.estado }}
                    </div>
                    <div>
                      <q-icon name="fas fa-star" size="12px" />
                      <span class="q-pl-sm">{{ prestador.nota }}</span> • <span>{{prestador.nravaliacoes }} {{ prestador.nravaliacoes === 1 ? 'avaliação' : 'avaliações'}}</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-end col-xs-2 col-sm-2">
                  <div>
                    <q-btn v-if="$q.screen.xs" color="primary" :icon="prestador.verMais ? 'fas fa-angle-up' : 'fas fa-angle-down'" no-caps class="q-px-sm" @click="prestador.verMais = !prestador.verMais" style="border-radius: 10px;" />
                  </div>
                  <div>
                    <q-btn v-if="!$q.screen.xs" color="primary" label="Contratar" no-caps @click="''" style="border-radius: 10px;" />
                  </div>
                </div>
              </div>
              <div v-if="prestador.verMais && $q.screen.xs">
                <div class="row q-pt-sm" align="center">
                  <div class="col-7">
                    <div>
                      {{ prestador.cidade }} - {{ prestador.estado }}
                    </div>
                    <div>
                      <q-icon name="fas fa-star" size="12px" />
                      <span class="q-pl-sm">{{ prestador.nota }}</span> • <span>{{prestador.nravaliacoes }} {{ prestador.nravaliacoes === 1 ? 'avaliação' : 'avaliações'}}</span>
                    </div>
                  </div>
                  <div class="col-5">
                    <q-btn color="primary" label="Contratar" no-caps @click="''" style="border-radius: 10px;" />
                  </div>
                </div>
              </div>
              <q-separator v-if="indice !== lstservicos.length - 1" size="1px" color="gray" class="q-my-sm" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  data () {
    return {
      lstservicos: [{
        id: 5,
        name: 'Luciana de Souza',
        avatar: 'avatar2.jpg',
        servicos: ['Eletricista', 'Encanador'],
        cidade: 'Santa Maria',
        estado: 'RS',
        nota: 4.8,
        nravaliacoes: 23,
        verMais: false
      }, {
        id: 6,
        name: 'Gabrielle Almeida Ferreira',
        avatar: 'avatar6.jpg',
        servicos: ['Diarista'],
        cidade: 'Santa Maria',
        estado: 'RS',
        nota: 4.9,
        nravaliacoes: 16,
        verMais: false
      }],
      opt_servicos: [],
      opt_localidades: [],
      servico: '',
      localidade: ''
    }
  }
})
</script>

<style>
.q-select--without-input .q-field__control {
    cursor: pointer;
    border-radius: 10px;
}
</style>
