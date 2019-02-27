<template>
<q-page class="row" style="padding:0;">
  <q-page-sticky position="top-left" :offset="[12, 12]">
  <q-btn-toggle
  v-model="visible"
  toggle-color="primary"
  :options="[
    {label: 'Lista', value: 'one'},
    {label: 'Cadastro', value: 'two'},
  ]"
/>
  </q-page-sticky>
      <q-card v-show="visible==='one'" class="col responsive">
         <q-card-title class="text-right">
          Lista Horarios
        </q-card-title>
        <q-card-separator />
        <div class="fit">
          <q-table
            ref="table"
            :data="serverData"
            :columns="columns"
            :filter="filter"
            :filter-method="myFilter"
            :loading="loading"
            selection="single"
          >
          <template slot="body" slot-scope="props">
            <q-tr :props="props">
              <q-td auto-width>
              </q-td>
              <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
              <q-td key="fechamento" :props="props">{{ props.row.fechamento }}</q-td>
              <q-td key="edit" :props="props">
                <q-btn flat round dense dark :icon="'edit'" @click="atualizaModel(props.row)"/>
                <q-btn flat round dense dark :icon="'delete'" @click="excluiModel(props.row.id)"/>
              </q-td>
            </q-tr>
          </template>
          </q-table>
        </div>
      </q-card>
  <q-card v-show="visible==='two'" class="col responsive">
    <q-card-title class="text-right">
    Cadastro
    </q-card-title>
    <q-card-separator />
      <div class="row q-pa-lg gutter-sm justify-center">
        <div class="col-12">
          <q-field
            :count="75"
            helper="Nome do Horário"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.nome"
              float-label="Nome"
              maxlength="75"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="2"
            helper="Horário que o dia termina"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.fechamento"
              float-label="Fechamento"
              maxlength="2"
              v-mask="'##'"
            />
          </q-field>
        </div>
      </div>
      <div class="row q-pa-lg gutter-sm justify-center wrap">
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error.sync="modelo.assinaladosView[0].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[0]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(0)"/>
        </div>
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error.sync="modelo.assinaladosView[1].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[1]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(1)"/>
        </div>
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error="modelo.assinaladosView[2].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[2]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(2)"/>
        </div>
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error="modelo.assinaladosView[3].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[3]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(3)"/>
        </div>
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error="modelo.assinaladosView[4].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[4]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(4)"/>
        </div>
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error="modelo.assinaladosView[5].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[5]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(5)"/>
        </div>
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error="modelo.assinaladosView[6].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[6]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(6)"/>
        </div>
        <div class="col-auto inline">
          <q-field class="inline" helper="Normal" error-label="Assinalado" :error="modelo.assinaladosView[7].teste">
            <q-datetime style="font-size: 6sp" v-model="modelo.horarios[7]" type="time" />
          </q-field>
          <q-btn class="inline" round size="xs" icon="chevron_left" color="teal" @click="mudaEstado(7)"/>
        </div>
      </div>
      <div class="row q-pa-lg gutter-sm justify-center">
          <div class="col-4">
            <q-btn class="fit" color="primary" @click="submit">Gravar</q-btn>
          </div>
          <div class="col-4">
            <q-btn class="fit" color="secondary" @click="clear">Limpar</q-btn>
          </div>
        </div>
  </q-card>
</q-page>

</template>

<script>
import axios from 'axios'
import {date} from 'quasar'
// script part of a Vue component
export default {
  data () {
    return {
      funcLoad: true,
      localLoad: true,
      locais: [],
      url: '',
      text: '',
      visible: 'one',
      responsaveis: [],
      modelo: {
        nome: '',
        fechamento: '',
        inicio: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
        fim: null,
        horarios: [
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        assinalados: [],
        assinaladosView: [
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false}
        ]
      },
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10
      },
      serverData: [],
      columns: [
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'fechamento', label: 'Descrição', field: 'descricao', align: 'left' },
        { name: 'edit', label: 'Ação', align: 'right', field: 'edit' }
      ]
    }
  },
  computed: {
    buttonColor () {
      return this.$q.screen.lt.md
        ? 'primary'
        : 'secondary'
    }
  },
  methods: {
    mudaEstado (i) {
      this.modelo.assinaladosView[i].teste = !this.modelo.assinaladosView[i].teste
    },
    toggleVisibility () {
      this.visible = !this.visible
    },
    submit () {
      this.modelo.assinalados = []
      for (let i = 0; i < this.modelo.assinaladosView.length; i++) {
        this.modelo.assinalados.push(this.modelo.assinaladosView[i].teste)
      }
      axios({
        baseURL: this.modelo.id ? 'http://localhost:8080/horario/' + this.modelo.id : `http://localhost:8080/horario`,
        timeout: 10000,
        method: this.modelo.id ? 'PUT' : 'POST',
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(this.modelo)
      }).then(response => {
        this.request()
        console.log(response)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Gravado com sucesso',
          icon: 'report_problem'
        })
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
    getlocal () {
      axios({
        method: 'get',
        url: 'http://localhost:8080/local',
        headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(response => {
        this.locais = []
        var temp = JSON.parse(JSON.stringify(response.data))
        for (let i = 0; i < temp.length; i++) {
          var element = temp[i]
          this.locais.push({
            label: element.nome,
            value: element
          })
        }
        this.funcLoad = false
      })
    },
    getresponsavel () {
      axios({
        method: 'get',
        url: 'http://localhost:8080/funcionario',
        headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(response => {
        this.responsaveis = []
        var temp = JSON.parse(JSON.stringify(response.data))
        for (let i = 0; i < temp.length; i++) {
          var element = temp[i]
          this.responsaveis.push({
            label: element.nome,
            value: element
          })
        }
        this.funcLoad = false
      })
    },
    clear () {
      this.modelo = {
        nome: '',
        fechamento: '',
        inicio: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
        fim: null,
        horarios: [
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        assinalados: [
        ],
        assinaladosView: [
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false},
          {teste: false}
        ]
      }
      this.$q.notify({
        color: 'positive',
        position: 'top',
        message: 'Formulário limpo',
        icon: 'report_problem'
      })
      console.log(this.modelo)
    },
    fetchData () {
      // carregar coisas
      // console.log(this.modelo)
    },
    request () {
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      axios
        .get(`http://localhost:8080/horario`)
        .then(response => {
          // then we update the rows with the fetched ones
          this.serverData = JSON.parse(JSON.stringify(response.data))

          // finally we tell QTable to exit the "loading" state
          this.loading = false
        })
        .catch(error => {
          this.serverData = [{razao: 'teste', cnpj: '1'}]
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    myFilter (rows, filter, cols, cellValue) {
      const lowerTerms = filter ? filter.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },
    atualizaModel (row) {
      this.visible = 'two'
      this.modelo.id = row.id
      this.modelo.nome = row.nome
      this.modelo.fechamento = row.fechamento
      this.inicio = row.inicio
      this.fim = row.fim
      for (let i = 0; i < row.horarios.length; i++) {
        this.modelo.horarios[i] = row.horarios[i]
      }
      this.modelo.assinaladosView = [
        {teste: false},
        {teste: false},
        {teste: false},
        {teste: false},
        {teste: false},
        {teste: false},
        {teste: false},
        {teste: false}
      ]
      for (let i = 0; i < row.assinalados.length; i++) {
        this.modelo.assinaladosView[i].teste = row.assinalados[i]
      }
    },
    excluiModel (id) {
      this.$q.dialog({
        title: 'Excluir',
        message: 'Confirma a exclusão?.',
        ok: 'Confirmo',
        cancel: 'Cancelo'
      }).then(() => {
        axios({
          method: 'delete',
          url: 'http://localhost:8080/horario/' + id,
          headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
        }).then(response => {
          this.$q.notify({
            color: 'positive',
            message: 'Excluido com sucesso'
          })
          this.request()
        }).catch(() => {
          this.$q.notify('Erro ao excluir!')
        })
      }).catch(() => {
        this.$q.notify({
          color: 'positive',
          message: 'Exclusão Cancelada...'
        })
      })
    }
  },
  beforeMount () {
    this.getlocal()
    this.getresponsavel()
    this.fetchData()
    this.request()
  }
}
</script>
<style>
</style>
