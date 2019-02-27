<template>
<div>
    <q-btn
          flat
          round
          dense
          @click="opened = true"
          icon="keyboard_arrow_left"
        />
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
          Trocar Horario entre Funcionários
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar slot="footer">
        <div class="row q-pa-lg gutter-sm justify-center wrap">
          <div class="col-auto inline">
            <q-btn
              color="secondary"
              @click="salvar"
              label="Concluir"
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
            helper="Selecione o primeiro funcionário"
            error-label="Some error"
          >
            <q-select
              v-model="modeloLanc.func1"
              :options="funcionarios"
              :disable="funcionarios.length === 0"
              filter
              autofocus-filter
              :float-label="modelHorario.hor1"
              @change=this.atualizaExibicao()
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Selecione o segundo funcionário"
            error-label="Some error"
          >
            <q-select
              v-model="modeloLanc.func2"
              :options="funcionarios"
              :disable="funcionarios.length === 0"
              filter
              autofocus-filter
              :float-label="modelHorario.hor2"
              :v-on:change="atualizaExibicao()"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6 mt-sm">
          <q-datetime-picker class="fit" v-model="modeloLanc.data" type="date" />
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
        func1: '',
        func2: '',
        data: ''
      },
      modelHorario: {
        func1: '',
        func2: '',
        data: '',
        hor1: 'Não Definido',
        hor2: 'Não Definido'
      },
      funcionarios: [],
      opened: false
    }
  },
  methods: {
    salvar () {
      axios({
        baseURL: 'http://localhost:8080/alterarhorariosubmit/alterahorario  ',
        timeout: 10000,
        method: 'POST',
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
          message: 'Alterado com sucesso',
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
          message: 'Erro ao Alterar',
          icon: 'report_problem'
        })
      })
    },
    atualizaExibicao () {
      this.modelHorario.func1 = this.modeloLanc.func1
      this.modelHorario.func2 = this.modeloLanc.func2
      this.modelHorario.data = this.modeloLanc.data
      axios
        .post(`http://localhost:8080/alterarhorariosubmit/horariodia`, this.modelHorario)
        .then(response => {
          let temp = JSON.parse(JSON.stringify(response.data))
          this.modelHorario.hor1 = temp.hor1 ? temp.hor1 : 'Não Definido'
          this.modelHorario.hor2 = temp.hor2 ? temp.hor2 : 'Não Definido'
        })
    },
    atualizaModel () {
      axios
        .get(`http://localhost:8080/funcionario`)
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
    },
    clear () {
      this.modeloLanc = {
        func1: '',
        func2: '',
        data: ''
      }
      this.modelHorario = {
        func1: '',
        func2: '',
        data: '',
        hor1: 'Não Definido',
        hor2: 'Não Definido'
      }
    }
  },
  beforeMount () {
    this.atualizaModel()
  }
}
</script>
