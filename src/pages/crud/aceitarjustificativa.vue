<template>
<div>
  <div class="fit">
      <q-table
        ref="table"
        :data="serverData"
        :columns="columns"
        selection="single"
      >
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td auto-width>
          </q-td>
          <q-td key="observacoes" :props="props">{{ props.row.observacoes }}</q-td>
          <q-td key="edit" :props="props">
                <q-btn flat round dense dark :icon="'keyboard_arrow_right'" @click="onClick(props.row)"/>
          </q-td>
        </q-tr>
      </template>
      </q-table>
    </div>
  <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          @click="opened = false"
          icon="keyboard_arrow_left"
        />
        <q-toolbar-title>
          Aceitação de Justificativa
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar slot="footer">
        <div class="row q-pa-lg gutter-sm justify-center wrap">
          <div class="col-auto inline">
            <q-btn
              color="secondary"
              @click="salvar"
              label="Aceitar"
            />
          </div>
          <div class="col-auto inline">
            <q-btn
              color="negative"
              @click="opened=false"
              label="Cancelar"
            />
          </div>
        </div>
      </q-toolbar>
      <div class="layout-padding row q-pa-lg gutter-sm">
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Selecione o funcionário"
            error-label="Some error"
          >
            <q-select
              v-model="modeloLanc.funcionario"
              :options="funcionarios"
              :disable="funcionarios.length === 0"
              filter
              autofocus-filter
              float-label="Funcionários"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Selecione a justificativa"
            error-label="Some error"
          >
            <q-select
              v-model="modeloLanc.justificativa"
              :options="justificativas"
              :disable="justificativas.length === 0"
              filter
              autofocus-filter
              float-label="Justificativas"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6 mt-sm">
          <q-datetime-picker class="fit" v-model="modeloLanc.dataOcorrencia" type="date" />
        </div>
      <div class="col-xs-12 col-sm-6 mt-sm">
        <div class="inline">
              <q-checkbox class="text-center" v-model="modeloLanc.justificativaIntegral" :disable="modeloLanc.justificativaParcial || modeloLanc.inclusaoManual" label="Integral"/>
        </div>
        <div class="row gutter-sm wrap">
          <div class="col-auto inline">
              <q-checkbox class="text-center" v-model="modeloLanc.justificativaParcial" :disable="modeloLanc.justificativaIntegral || modeloLanc.inclusaoManual" label="Parcial"/>
          </div>
          <div class="col-auto inline">
            <q-field class="inline" helper="Inicio" error-label="Desabilitado" :error.sync="!modeloLanc.justificativaParcial">
              <q-datetime style="font-size: 6sp" v-model="modeloLanc.horaInicio" :disable="!modeloLanc.justificativaParcial" type="time" />
            </q-field>
          </div>
          <div class="col-auto inline">
            <q-field class="inline" helper="Fim" error-label="Desabilitado" :error.sync="!modeloLanc.justificativaParcial">
              <q-datetime style="font-size: 6sp" v-model="modeloLanc.horaFim" :disable="!modeloLanc.justificativaParcial" type="time" />
            </q-field>
          </div>
        </div>
        <div class="row gutter-sm wrap mt-sm">
          <div class="col-auto inline">
              <q-checkbox class="text-center" v-model="modeloLanc.inclusaoManual" :disable="modeloLanc.justificativaIntegral || modeloLanc.justificativaParcial" label="Manual"/>
          </div>
          <div class="col-auto inline">
            <q-field class="inline" helper="Inicio" error-label="Desabilitado" :error.sync="!modeloLanc.inclusaoManual">
              <q-datetime style="font-size: 6sp" v-model="modeloLanc.inclusaoHorario" :disable="!modeloLanc.inclusaoManual" type="time" />
            </q-field>
          </div>
        </div>
      </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="2500"
            helper="Observações"
            error-label="Some error"
          >
            <q-input
              v-model="modeloLanc.observacoes"
              float-label="Considerações:"
              maxlength="2500"
              type="textarea"
            />
          </q-field>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      modeloLanc: {
        funcionario: '',
        justificativa: '',
        dataOcorrencia: '',
        observacoes: '',
        horaInicio: '',
        horaFim: '',
        justificativaIntegral: false,
        justificativaParcial: false,
        inclusaoHorario: '',
        inclusaoManual: false
      },
      funcionarios: [],
      justificativas: [],
      opened: false,
      lancamentos: [],
      columns: [
        { name: 'observacoes', label: 'Justificativa', field: 'observacoes', align: 'left' },
        { name: 'edit', label: 'Ação', align: 'right', field: 'edit' }],
      serverData: []
    }
  },
  methods: {
    salvar () {
      axios({
        baseURL: this.modeloLanc.id ? 'https://estagio-back.herokuapp.com//lancamentojustificativa/' + this.modeloLanc.id : `https://estagio-back.herokuapp.com//lancamentojustificativa`,
        timeout: 10000,
        method: this.modeloLanc.id ? 'PUT' : 'POST',
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(this.modeloLanc)
      }).then(response => {
        console.log(response)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Gravado com sucesso',
          icon: 'report_problem'
        })
        this.opened = false
        this.clear()
      }).catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        console.log(error.config)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Erro ao gravar',
          icon: 'report_problem'
        })
      })
    },
    atualizaModel () {
      axios
        .get(`https://estagio-back.herokuapp.com//funcionario`)
        .then(response => {
          // then we update the rows with the fetched ones
          this.funcionarios = []
          var temp = JSON.parse(JSON.stringify(response.data))
          for (let i = 0; i < temp.length; i++) {
            var element = temp[i]
            this.funcionarios.push({
              label: element.nome,
              value: element
            })
          }
          // finally we tell QTable to exit the "loading" state
        })
        .catch(error => {
          this.funcionarios = [{nome: 'teste', descricao: 'error'}]
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
        })
      axios
        .get(`https://estagio-back.herokuapp.com//justificativa`)
        .then(response => {
          // then we update the rows with the fetched ones
          this.justificativas = []
          var temp = JSON.parse(JSON.stringify(response.data))
          for (let i = 0; i < temp.length; i++) {
            var element = temp[i]
            this.justificativas.push({
              label: element.nome,
              value: element
            })
          }
          // finally we tell QTable to exit the "loading" state
        })
        .catch(error => {
          this.justificativa = [{nome: 'teste', descricao: 'error', text: 'error'}]
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
        })
    },
    atualizaLista () {
      axios
        .get(`https://estagio-back.herokuapp.com//lancamentojustificativa`)
        .then(response => {
          // then we update the rows with the fetched ones
          this.lancamentos = []
          this.serverData = JSON.parse(JSON.stringify(response.data))
        })
        .catch(error => {
          this.lancamentos = [{nome: 'teste', descricao: 'error'}]
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
        })
    },
    onClick (modelo) {
      this.modeloLanc = modelo
      this.modeloLanc.dataOcorrencia = modelo.dataOcorrencia
      for (let i = 0, j = true; i < this.funcionarios.length && j; i++) {
        if (this.funcionarios[i].value.id === this.modeloLanc.funcionario.id) {
          this.modeloLanc.funcionario = this.funcionarios[i].value
          j = false
        }
      }
      this.modeloLanc.id = modelo.id
      this.modeloLanc.inclusaoManual = modelo.inclusaoManual
      for (let i = 0, j = true; i < this.justificativas.length && j; i++) {
        if (this.justificativas[i].value.id === this.modeloLanc.justificativa.id) {
          this.modeloLanc.justificativa = this.justificativas[i].value
          j = false
        }
      }
      this.modeloLanc.justificativaIntegral = modelo.justificativaIntegral
      this.modeloLanc.justificativaParcial = modelo.justificativaParcial
      this.modeloLanc.observacoes = modelo.observacoes
      this.opened = true
    },
    clear () {
      this.modeloLanc = {
        funcionario: '',
        justificativa: '',
        dataOcorrencia: '',
        observacoes: '',
        horaInicio: '',
        horaFim: '',
        justificativaIntegral: false,
        inclusaoManual: ''
      }
    }
  },
  beforeMount () {
    this.atualizaModel()
    this.atualizaLista()
  }
}
</script>
