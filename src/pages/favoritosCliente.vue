<template>
  <q-page padding class="flex items-center justify-center">
    <div style="width: 75vh;">
      <q-card class="my-card" style="height: 70vh;">
        <q-card-section>
          <div>
            <div>
              Prestadores favoritados
            </div>
            <div>
              <q-separator size="1px" color="black" />
            </div>
          </div>

          <div v-if="lstFavoritos.length === 0" class="q-pt-sm">
            <q-icon name="fas fa-exclamation-circle" />
            Não há prestadores favoritados.
          </div>

          <div v-for="favorito in lstFavoritos" :key="favorito.idfavoritocliente">
            <div class="row q-py-md">
              <div class="col-xs-2 col-sm-2" align="center">
                <q-avatar v-if="favorito.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                  <img :src="`https://cdn.quasar.dev/img/${favorito.fotoprestador}`">
                </q-avatar>
                <q-avatar v-if="!favorito.fotoprestador" :size="$q.screen.xs ? '50px' : '64px'">
                  <img src="../../public/user-picture.jpg">
                </q-avatar>
              </div>
              <div class="col-xs-10 col-sm-9">
                <div>
                  <q-icon :name="favorito.favorito ? 'fas fa-star' : 'far fa-star'" color="primary" class="q-px-sm cursor-pointer" @click="favDesfavPrestador(favorito.idprestador)" />
                  {{ favorito.nmprestador }}
                </div>

                <div class="text-bold">
                  {{ favorito.cidadeprestador }} - {{ favorito.ufprestador }}
                </div>

                <div class="flex q-gutter-md">
                  <div>
                    <q-icon name="fas fa-envelope" color="secondary" size="18px" />
                    {{ favorito.emailprestador }}
                  </div>
                  <div>
                    <q-icon :name="favorito.whatsapp ? 'fab fa-square-whatsapp' : 'fas fa-phone'" color="secondary" size="18px" />
                    {{ favorito.celularprestador }}
                  </div>
                </div>

                <div v-for="(servico, index) in favorito.servicos" :key="index">
                  <span class="text-bold">Serviço(s): </span>{{ servico.nmservico }}{{ index + 1 === favorito.servicos.length ? '' : ', ' }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'favoritosCliente',
  data () {
    return {
      lstFavoritos: []
    }
  },
  methods: {
    async buscaPrestadoresFavoritos () {
      try {
        await this.$api.post('/clientes/buscaPrestadoresFavoritos', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.lstFavoritos = [...response.data]
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
          this.buscaPrestadoresFavoritos()
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.buscaPrestadoresFavoritos()
  }
}
</script>
