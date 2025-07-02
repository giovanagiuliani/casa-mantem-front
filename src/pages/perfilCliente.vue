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
            </div>
            <div class="col-xs-12 col-sm-5">
              <div class="q-gutter-lg q-pt-md">
                <div>
                  <div style="font-size: smaller;" class="text-grey text-bold">
                    Nome completo
                  </div>
                  <div>
                    {{ dadosCliente.nmcliente }}
                  </div>
                </div>

                <div>
                  <div style="font-size: smaller;" class="text-grey text-bold">
                    E-mail
                  </div>
                  <div>
                    {{ dadosCliente.emailcliente }}
                  </div>
                </div>

                <div :align="$q.screen.xs ? 'center' : 'left'">
                  <div class="q-pt-sm">
                    <q-btn color="primary" style="border-radius: 10px; width: 70%;" no-caps @click="fnEditarPerfilCliente()">
                      <q-icon name="fas fa-pen" size="18px" class="q-pr-md" />
                      Editar Perfil
                    </q-btn>
                  </div>

                  <div class="q-pt-sm">
                    <q-btn color="primary" outline no-caps style="border-radius: 10px; width: 70%;" @click="dlg_alterarSenha = true">
                      <q-icon name="fas fa-key" size="18px" class="q-pr-md" />
                      Alterar Senha
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pb-xl">
          <div class="flex items-center justify-between q-pb-xs">
            <div>
              Endereço
            </div>
            <div v-if="enderecos.length === 0">
              <q-btn color="secondary" style="border-radius: 10px;" no-caps @click="dlg_cadEndereco = true">
                <q-icon name="fas fa-plus" size="18px" class="q-pr-sm" />
                Cadastrar Endereço
              </q-btn>
            </div>
          </div>

          <q-separator size="1px" color="black" />

          <div v-if="enderecos.length === 0" class="flex items-center q-pt-xs">
            <q-icon name="fas fa-exclamation-circle" size="14px" class="q-pr-xs" />
            <span>Nenhum endereço cadastrado. Limite de 1 endereço.</span>
          </div>

          <div v-if="enderecos.length === 1">
            <div v-for="endereco in enderecos" :key="endereco.idenderecocliente" class="row q-py-xs">
              <div class="col-xs-12 col-sm-9">
                <div>
                  {{ endereco.cidadecliente }}, {{ endereco.ufcliente }}
                </div>
                <div>
                  {{ formataCEP(endereco.cep) }}
                </div>
                <div>
                  {{ endereco.logradouro }}, {{ endereco.bairro }}{{ endereco.numero ? ', ' + endereco.numero : '' }}{{ endereco.complemento ? ', ' + endereco.complemento : '' }}
                </div>
              </div>

              <div class="flex items-center justify-center col-xs-12 col-sm-3">
                <div class="q-px-xs">
                  <q-btn color="primary" icon="fas fa-pen" style="border-radius: 10px;" @click="fnEditarEndereco(endereco.idenderecocliente)" />
                </div>
                <div class="q-px-xs">
                  <q-btn color="red" icon="fas fa-trash" style="border-radius: 10px;" @click="fnExcluirEndereco(endereco.idenderecocliente)" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Diálogos -->

    <!-- Cadastro de Endereço -->
    <q-dialog v-model="dlg_cadEndereco" persistent @hide="buscaEnderecosCliente()">
      <q-card style="width: 60%; border-radius: 10px;">
        <q-toolbar class="bg-primary text-white">
          <q-icon name="fas fa-location-dot" size="18px" />
          <q-toolbar-title style="font-size: 16px;">
            Cadastrar Endereço
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-times" @click="dlg_cadEndereco = false" />
        </q-toolbar>
        <q-card-section>
          <gerenciaEnderecos @fechaDlgEnderecos="fechaDlgEnderecos" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Confirmar Exclusão Endereço -->
    <q-dialog v-model="dlg_confirmaExcluirEndereco" persistent>
      <q-card style="border-radius: 10px;">
        <q-toolbar class="bg-red text-white">
          <q-icon name="fas fa-trash" size="18px" />
          <q-toolbar-title style="font-size: 16px;">
            Excluir Endereço
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-times" @click="dlg_confirmaExcluirEndereco = false; idExcluirEndereco = 0" />
        </q-toolbar>
        <q-card-section>
          <div class="q-pb-sm text-bold">
            Tem certeza que deseja excluir este endereço?
          </div>
          <div class="row q-pt-sm" align="center">
            <div class="col-6">
              <q-btn style="border-radius: 10px; width: 80%;" color="red" outline label="Cancelar" no-caps @click="dlg_confirmaExcluirEndereco = false; idExcluirEndereco = 0" />
            </div>
            <div class="col-6">
              <q-btn style="border-radius: 10px; width: 80%;" color="red" label="Excluir" no-caps @click="excluirEnderecoCliente()" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Editar Endereço -->
     <q-dialog v-model="dlg_editaEndereco" persistent>
      <q-card style="width: 60%; border-radius: 10px;">
        <q-toolbar class="bg-primary text-white">
          <q-icon name="fas fa-location-dot" size="18px" />
          <q-toolbar-title style="font-size: 16px;">
            Editar Endereço
          </q-toolbar-title>
          <q-btn flat round dense icon="fas fa-times" @click="dlg_editaEndereco = false" />
        </q-toolbar>
        <q-card-section>
          <gerenciaEnderecos :idEditar="idEditarEndereco" @fechaDlgEnderecos="fechaDlgEnderecos" />
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
              <q-input v-model="dadosNovaSenha.novaSenha" :type="verSenha ? 'text' : 'password'" filled dense label="Digite sua nova senha..." reactive-rules :rules="[ val => val === dadosNovaSenha.confirmaSenha || 'Senhas não coincidem.' ]" hide-bottom-space>
                <template #append>
                  <q-btn color="primary" flat size="sm" :icon="verSenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verSenha = !verSenha" style="border-radius: 10px;" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input v-model="dadosNovaSenha.confirmaSenha" :type="verConfirmaSenha ? 'text' : 'password'" filled dense label="Confirme sua nova senha..." reactive-rules :rules="[ val => val === dadosNovaSenha.novaSenha || 'Senhas não coincidem.' ]" hide-bottom-space>
                <template #append>
                  <q-btn color="primary" flat size="sm" :icon="verConfirmaSenha ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="verConfirmaSenha = !verConfirmaSenha" style="border-radius: 10px;" />
                </template>
              </q-input>
            </div>
            <div>
              <q-btn color="primary" style="border-radius: 10px;" icon="fas fa-check" label="Confirmar" @click="alterarSenhaCliente()" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Editar Perfil -->
       <q-dialog v-model="dlg_editarPerfil" persistent>
        <q-card style="width: 30%;">
          <q-toolbar class="bg-primary text-white">
            <q-icon name="fas fa-pen" size="18px" />
            <q-toolbar-title style="font-size: 16px;">
              Editar Perfil
            </q-toolbar-title>
            <q-btn flat round dense icon="fas fa-times" @click="dlg_editarPerfil = false;" />
          </q-toolbar>
          <q-card-section align="center" class="q-gutter-md">
            <div>
              <q-input v-model="dadosEditarPerfil.nmcliente" filled dense type="text" label="Digite seu nome completo..." />
            </div>
            <div>
              <q-input v-model="dadosEditarPerfil.emailcliente" filled dense type="email" label="Digite seu e-mail..." />
            </div>
            <div>
              <q-btn color="primary" style="border-radius: 10px;" icon="fas fa-check" label="Confirmar" @click="atualizarDadosCliente()" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import gerenciaEnderecos from 'src/components/gerenciaEnderecos.vue'

export default {
  name: 'perfilCliente',
  components: {
    gerenciaEnderecos
  },
  data () {
    return {
      dadosCliente: {},
      dadosEditarPerfil: {},
      dadosNovaSenha: {
        novaSenha: '',
        confirmaSenha: ''
      },
      enderecos: [],
      verSenha: false,
      dlg_cadEndereco: false,
      verConfirmaSenha: false,
      dlg_alterarSenha: false,
      dlg_editaEndereco: false,
      dlg_editarPerfil: false,
      dlg_confirmaExcluirEndereco: false,
      idEditarEndereco: 0,
      idExcluirEndereco: 0
    }
  },
  methods: {
    formataCEP (cep) {
      return cep ? cep.replace(/(\d{5})(\d{3})/, '$1-$2') : ''
    },

    fechaDlgEnderecos (val) {
      this.dlg_cadEndereco = val
      this.dlg_editaEndereco = val
      this.idEditarEndereco = 0
      this.buscaEnderecosCliente()
    },

    fnExcluirEndereco (id) {
      this.idExcluirEndereco = id
      this.dlg_confirmaExcluirEndereco = true
    },

    fnEditarEndereco (id) {
      this.idEditarEndereco = id
      this.dlg_editaEndereco = true
    },

    fnFechaDlgSenha () {
      this.dadosNovaSenha.novaSenha = ''
      this.dadosNovaSenha.confirmaSenha = ''
      this.dlg_alterarSenha = false
    },

    fnEditarPerfilCliente () {
      this.dadosEditarPerfil = { ...this.dadosCliente }
      this.dlg_editarPerfil = true
    },

    async buscaDadosCliente () {
      try {
        await this.$api.post('/clientes/buscaDadosCliente', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.dadosCliente = { ...response.data }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async buscaEnderecosCliente () {
      try {
        await this.$api.post('/clientes/buscaEnderecosCliente', {}, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.enderecos = response.data
        })
      } catch (error) {
        console.log(error)
      }
    },

    async excluirEnderecoCliente () {
      try {
        const dados = {}
        dados.idenderecocliente = this.idExcluirEndereco

        await this.$api.post('/clientes/excluirEnderecoCliente', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'red',
            position: 'top',
            timeout: 3500,
            message: 'Endereço excluído com sucesso!',
            icon: 'fas fa-check'
          })
          this.dlg_confirmaExcluirEndereco = false
          this.idExcluirEndereco = 0
          this.buscaEnderecosCliente()
        })
      } catch (error) {
        console.log(error)
      }
    },

    async alterarSenhaCliente () {
      try {
        if (this.dadosNovaSenha.novaSenha === '') return
        if (this.dadosNovaSenha.confirmaSenha === '') return
        if (this.dadosNovaSenha.novaSenha !== this.dadosNovaSenha.confirmaSenha) return

        const dados = { ...this.dadosNovaSenha }

        await this.$api.post('/clientes/alterarSenhaCliente', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
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
    },

    async atualizarDadosCliente () {
      try {
        const dados = { ...this.dadosEditarPerfil }

        await this.$api.post('/clientes/atualizarDadosCliente', dados, { headers: { authorization: this.$q.sessionStorage.getItem('token') } }).then(response => {
          this.$q.notify({
            color: 'green',
            position: 'top',
            timeout: 3500,
            message: 'Perfil editado com sucesso!',
            icon: 'fas fa-check'
          })
          this.dadosEditarPerfil = {}
          this.dlg_editarPerfil = false
          this.buscaDadosCliente()
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    if (!this.$q.sessionStorage.getItem('token')) {
      this.$router.push('/')
    }
  },
  mounted () {
    if (this.$q.sessionStorage.getItem('token')) {
      this.buscaDadosCliente()
      this.buscaEnderecosCliente()
    }
  }
}
</script>
