<template>
  <div>
    <div class="q-gutter-md">
      <q-input v-model="dadosPrestador.nmprestador" filled dense type="text" label="Digite seu nome completo...">
        <template #label>
          Digite seu nome completo... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosPrestador.cpfprestador" filled dense type="text" mask="###.###.###-##" unmasked-value label="Digite seu CPF...">
        <template #label>
          Digite seu CPF... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosPrestador.emailprestador" filled dense type="email" label="Digite seu e-mail...">
        <template #label>
          Digite seu e-mail... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-input v-model="dadosPrestador.celularprestador" filled dense type="text" mask="(##) # ####-####" label="Digite seu telefone para contato...">
        <template #label>
          Digite seu telefone para contato... <span class="text-red">*</span>
        </template>
      </q-input>
      <q-checkbox v-model="dadosPrestador.whatsapp" dense label="Aceito receber mensagens no WhatsApp deste número." />
      <q-select v-model="dadosPrestador.ufprestador" use-input dense filled maxlength="2" :options="opt_unidadesFederativas" label="Selecione seu estado...">
        <template #label>
          Selecione seu estado... <span class="text-red">*</span>
        </template>
      </q-select>
      <q-select v-model="dadosPrestador.cidadeprestador" use-input filled dense :options="opt_cidades" label="Selecione sua cidade...">
        <template #label>
          Selecione sua cidade... <span class="text-red">*</span>
        </template>
      </q-select>

      <div align="center">
        <q-btn color="primary" icon="fas fa-check" label="Atualizar" no-caps style="border-radius: 10px;" @click="''" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gerenciaPrestador',
  props: {
    dadosEditarPrestador: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      dadosPrestador: {
        nmprestador: '',
        cpfprestador: '',
        emailprestador: '',
        cidadeprestador: '',
        ufprestador: '',
        celularprestador: '',
        whatsapp: false
      },
      opt_cidades: [],
      opt_unidadesFederativas: []
    }
  },
  mounted () {
    if (this.dadosEditarPrestador) {
      this.dadosPrestador = { ...this.dadosEditarPrestador }
    }
  }
}
</script>
