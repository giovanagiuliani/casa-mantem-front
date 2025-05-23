<template>
  <q-page padding class="flex items-center justify-center">
    <div style="width: 75vh;">
      <q-card class="my-card">
        <q-card-section class="q-pt-xl">
          <div class="row">
            <div class="col-xs-12 col-sm-7" align="center">
              <div class="q-pb-sm">
                <q-img
                  src="../../public/user-picture.jpg"
                  height="60%"
                  width="60%"
                  style="border-radius: 10px;"
                  no-spinner
                />
              </div>

              <div align="center">
                <div class="q-pt-sm">
                  <q-btn color="primary" style="border-radius: 10px; width: 60%;" no-caps @click="fnEditarPerfilPrestador()">
                    <q-icon name="fas fa-pen" size="18px" class="q-pr-md" />
                    Editar Perfil
                  </q-btn>
                </div>

                <div class="q-pt-sm">
                  <q-btn color="primary" outline no-caps style="border-radius: 10px; width: 60%;" @click="dlg_alterarSenha = true">
                    <q-icon name="fas fa-key" size="18px" class="q-pr-md" />
                    Alterar Senha
                  </q-btn>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-5">
              <div class="q-gutter-lg q-pt-md">
                <div>
                  <div style="font-size: smaller;" class="text-grey text-bold">
                    Nome completo
                  </div>
                  <div>
                    {{ dadosPrestador.nmprestador }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div style="font-size: smaller;" class="text-grey text-bold">
                      CPF
                    </div>
                    <div>
                      {{ fnFormataCPF(dadosPrestador.cpfprestador) }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div style="font-size: smaller;" class="text-grey text-bold">
                      Celular
                    </div>
                    <div>
                      {{ dadosPrestador.celularprestador }}
                    </div>
                  </div>
                </div>

                <div>
                  <div style="font-size: smaller;" class="text-grey text-bold">
                    E-mail
                  </div>
                  <div>
                    {{ dadosPrestador.emailprestador }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div style="font-size: smaller;" class="text-grey text-bold">
                      Cidade
                    </div>
                    <div>
                      {{ dadosPrestador.cidadeprestador }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div style="font-size: smaller;" class="text-grey text-bold">
                      Estado
                    </div>
                    <div>
                      {{ dadosPrestador.ufprestador }}
                    </div>
                  </div>
                </div>

                <div>
                  <q-icon name="fab fa-whatsapp" />
                  {{ dadosPrestador.whatsapp ? 'Aceita receber mensagens via WhatsApp.' : 'Não aceita receber mensagens via WhatsApp' }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex items-center justify-between q-pb-xs">
            <div>
              Serviços Ofertados
            </div>
            <div>
              <q-btn color="secondary" style="border-radius: 10px;" no-caps @click="dlg_cadServico = true">
                <q-icon name="fas fa-plus" size="18px" class="q-pr-sm" />
                Cadastrar Serviço
              </q-btn>
            </div>
          </div>

          <q-separator size="1px" color="black" />

          <div v-if="servicosOfertados.length === 0" class="flex items-center q-pt-xs">
            <q-icon name="fas fa-exclamation-circle" size="14px" class="q-pr-xs" />
            <span>Nenhum serviço cadastrado.</span>
          </div>

          <div v-if="servicosOfertados.length > 0">
            <div v-for="(servico, index) in servicosOfertados" :key="servico.idservicoprestador">
              <div class="row q-py-md">
                <div class="col-xs-12 col-sm-9">
                  <div>
                    Serviço: {{ servico.nmservico }}
                  </div>
                  <div>
                    Tipo de Carga Horária: {{ servico.tipocargahoraria === 1 ? 'Horário fixo' : 'Período' }}
                  </div>
                  <div v-if="servico.observacao">
                    Observação: {{ servico.observacao }}
                  </div>
                </div>

                <div class="flex items-center justify-center col-xs-12 col-sm-3">
                  <div class="q-px-xs">
                    <q-btn color="primary" icon="fas fa-pen" style="border-radius: 10px;" @click="fnEditarServico(servico.idservicoprestador)" />
                  </div>
                  <div class="q-px-xs">
                    <q-btn color="red" icon="fas fa-trash" style="border-radius: 10px;" @click="fnExcluirServico(servico.idservicoprestador)" />
                  </div>
                </div>
              </div>

              <q-separator v-if="index < servicosOfertados.length - 1" size="1px" color="gray" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Diálogos -->

    <!-- Cadastro de Serviços -->
    <q-dialog v-model="dlg_cadServico" persistent>
    <q-card style="width: 60%; border-radius: 10px;">
      <q-toolbar class="bg-primary text-white">
        <q-icon name="fas fa-clipboard-list" size="18px" />
        <q-toolbar-title style="font-size: 16px;">
          Cadastrar Serviço
        </q-toolbar-title>
        <q-btn flat round dense icon="fas fa-times" @click="dlg_cadServico = false" />
      </q-toolbar>
      <q-card-section>
        <gerenciaServicos @fnDlgServico="fnDlgServico" />
      </q-card-section>
    </q-card>
    </q-dialog>

    <!-- Confirmar Exclusão de Serviço Ofertado -->
    <q-dialog v-model="dlg_confirmaExcluirServico" persistent>
      <q-card>
        <q-toolbar class="bg-red text-white">
          <q-icon name="fas fa-trash" size="18px" />
          <q-toolbar-title style="font-size: 16px;">
            Excluir Serviço
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-times" @click="dlg_confirmaExcluirServico = false; idExcluirServico = 0" />
        </q-toolbar>
        <q-card-section>
          <div class="q-pb-sm text-bold">
            Tem certeza que deseja excluir este serviço?
          </div>
          <div class="row q-pt-sm" align="center">
            <div class="col-6">
              <q-btn style="border-radius: 10px; width: 80%;" color="red" outline label="Cancelar" no-caps @click="dlg_confirmaExcluirServico = false; idExcluirServico = 0" />
            </div>
            <div class="col-6">
              <q-btn style="border-radius: 10px; width: 80%;" color="red" label="Excluir" no-caps @click="excluirServicoOfertado()" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Editar Serviço -->
    <q-dialog v-model="dlg_editarServico" persistent>
      <q-card style="width: 60%; border-radius: 10px;">
        <q-toolbar class="bg-primary text-white">
          <q-icon name="fas fa-clipboard-list" size="18px" />
          <q-toolbar-title style="font-size: 16px;">
            Editar Serviço
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-times" @click="dlg_editarServico = false; idEditarServico = 0" />
        </q-toolbar>
        <q-card-section>
          <gerenciaServicos :idEditar="idEditarServico" @fnDlgServico="fnDlgServico" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Editar Perfil Prestador -->
    <q-dialog v-model="dlg_editarPerfilPrestador" persistent>
      <q-card style="width: 60%; border-radius: 10px;">
        <q-toolbar class="bg-primary text-white">
          <q-icon name="fas fa-clipboard-list" size="18px" />
          <q-toolbar-title style="font-size: 16px;">
            Editar Perfil
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-times" @click="dlg_editarPerfilPrestador = false; idEditarPrestador = 0" />
        </q-toolbar>
        <q-card-section>
          <gerenciaPrestador :dadosEditarPrestador="dadosPrestador" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Alterar Senha -->
    <q-dialog v-model="dlg_alterarSenha" persistent>
      <q-card style="width: 30%;">
        <q-toolbar class="bg-primary text-white">
          <q-icon name="fas fa-key" size="18px" />
          <q-toolbar-title style="font-size: 16px;">
            Alterar Senha
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-times" @click="fnFechaDlgSenha()" />
        </q-toolbar>
        <q-card-section align="center" class="q-gutter-md">
          <div>
            <q-input v-model="dadosNovaSenha.novaSenha" :type="verSenha ? 'text' : 'password'" filled dense label="Digite sua nova senha..." reactive-rules :rules="[ val => val === dadosNovaSenha.confirmaNovaSenha || 'Senhas não coincidem.' ]" hide-bottom-space>
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="verSenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verSenha = !verSenha" style="border-radius: 10px;" />
              </template>
            </q-input>
          </div>
          <div>
            <q-input v-model="dadosNovaSenha.confirmaNovaSenha" :type="verConfirmaSenha ? 'text' : 'password'" filled dense label="Confirme sua nova senha..." reactive-rules :rules="[ val => val === dadosNovaSenha.novaSenha || 'Senhas não coincidem.' ]" hide-bottom-space>
              <template #append>
                <q-btn color="primary" flat size="sm" :icon="verConfirmaSenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verConfirmaSenha = !verConfirmaSenha" style="border-radius: 10px;" />
              </template>
            </q-input>
          </div>
          <div>
            <q-btn color="primary" style="border-radius: 10px;" icon="fas fa-check" label="Confirmar" @click="alterarSenhaPrestador()" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import gerenciaServicos from 'src/components/gerenciaServicos.vue'
import gerenciaPrestador from 'src/components/gerenciaPrestador.vue'

export default {
  name: 'perfilPrestador',
  components: {
    gerenciaServicos, gerenciaPrestador
  },
  data () {
    return {
      dadosPrestador: {},
      dadosNovaSenha: {
        novaSenha: '',
        confirmaNovaSenha: ''
      },
      servicosOfertados: [],
      verSenha: false,
      verConfirmaSenha: false,
      dlg_cadServico: false,
      dlg_alterarSenha: false,
      dlg_editarServico: false,
      dlg_editarPerfilPrestador: false,
      dlg_confirmaExcluirServico: false,
      idEditarServico: 0,
      idExcluirServico: 0
    }
  },
  methods: {
    fnFormataCPF (cpf) {
      return cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : ''
    },

    fnEditarPerfilPrestador () {
      this.dlg_editarPerfilPrestador = true
    },

    fnDlgServico (val) {
      this.dlg_cadServico = val
      this.dlg_editarServico = val
      this.buscaServicosOfertados()
    },

    fnExcluirServico (id) {
      this.idExcluirServico = id
      this.dlg_confirmaExcluirServico = true
    },

    fnEditarServico (id) {
      this.idEditarServico = id
      this.dlg_editarServico = true
    },

    fnFechaDlgSenha () {
      this.dadosNovaSenha.novaSenha = ''
      this.dadosNovaSenha.confirmaNovaSenha = ''
      this.dlg_alterarSenha = false
    },

    async buscaDadosPrestador () {
      try {
        await this.$api.post('/prestadores/buscaDadosPrestador', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.dadosPrestador = { ...response.data }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaServicosOfertados () {
      try {
        await this.$api.post('/servicos/buscaServicosOfertados', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.servicosOfertados = [...response.data]
        })
      } catch (error) {
        console.log(error)
      }
    },

    async excluirServicoOfertado () {
      try {
        const dados = {}
        dados.idservicoprestador = this.idExcluirServico

        await this.$api.post('/servicos/excluirServicoOfertado', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'red',
            position: 'top',
            timeout: 3500,
            message: 'Serviço excluído com sucesso!',
            icon: 'fas fa-check'
          })
          this.dlg_confirmaExcluirServico = false
          this.idExcluirServico = 0
          this.buscaServicosOfertados()
        })
      } catch (error) {
        console.log(error)
      }
    },

    async alterarSenhaPrestador () {
      try {
        if (this.dadosNovaSenha.novaSenha === '') return
        if (this.dadosNovaSenha.confirmaNovaSenha === '') return
        if (this.dadosNovaSenha.novaSenha !== this.dadosNovaSenha.confirmaNovaSenha) return

        const dados = { ...this.dadosNovaSenha }

        await this.$api.post('/prestadores/alterarSenhaPrestador', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Senha alterada com sucesso!',
            icon: 'fas fa-check'
          })
          this.fnFechaDlgSenha()
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.buscaDadosPrestador()
    this.buscaServicosOfertados()
  }
}
</script>

<style>
.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
    height: 40px;
    border-radius: 10px;
}
</style>
