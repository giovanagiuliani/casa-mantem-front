<template>
  <q-page padding>
    <!-- Ilustrações -->
    <div class="q-pt-lg flex items-center justify-evenly">
      <div>
        <q-img
          src="../../public/Ilustração1.jpg"
          no-spinner
          width="390px"
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
        <q-select :style="$q.screen.xs ? '' : 'width: 65%;'" v-model="servico" :options="opt_servicos" label="Procure o serviço que deseja..." filled />
      </div>
      <div :class="$q.screen.xs ? 'col-xs-12 col-sm-6 q-py-sm' : 'col-xs-12 col-sm-6 q-pl-xl q-py-sm'" :align="$q.screen.xs ? '' : 'left'">
        <q-select :style="$q.screen.xs ? '' : 'width: 65%;'" v-model="localidade" :options="opt_localidades" label="Procure a localidade..." filled />
      </div>
    </div>

    <!-- Serviços -->
    <div align="right">
      <div style="font-size: large;" class="text-bold q-py-xl">
        Serviços que encontramos em: Santa Maria - RS <!-- Substituir por variável que armazene a localização do usuário -->
      </div>

      <div>
        <q-card style="width: 70%; border-radius: 10px;" class="my-card">
          <q-card-section>
            <q-list>
              <q-item v-for="(prestador) in lstservicos" :key="prestador.id">
                <q-item-section avatar>
                  <q-avatar size="64px">
                    <img :src="`https://cdn.quasar.dev/img/${prestador.avatar}`">
                  </q-avatar>
                </q-item-section>
                <q-item-section align="left">
                  <div style="font-size: medium;" class="text-bold">
                    {{prestador.name}}
                  </div>
                  <div>
                    <span v-for="(servico, index) in prestador.servicos" :key="index">
                      {{ servico }}{{ index + 1 === prestador.servicos.length ? '' : ', ' }}
                    </span>
                  </div>
                </q-item-section>
                <q-item-section>
                  <div>
                    {{ prestador.cidade }} - {{ prestador.estado }}
                  </div>
                  <div>
                    <q-icon name="fas fa-star" size="12px" />
                    <span class="q-pl-sm">{{ prestador.nota }}</span> • <span>{{prestador.nravaliacoes }} {{ prestador.nravaliacoes === 1 ? 'avaliação' : 'avaliações'}}</span>
                  </div>
                </q-item-section>
                <q-item-section side>
                  <div>
                    <q-btn v-if="!$q.screen.xs" color="primary" label="Contratar" no-caps @click="''" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
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
        nravaliacoes: 23
      }, {
        id: 6,
        name: 'Gabrielle Almeida Ferreira',
        avatar: 'avatar6.jpg',
        servicos: ['Diarista'],
        cidade: 'Santa Maria',
        estado: 'RS',
        nota: 4.9,
        nravaliacoes: 16
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
