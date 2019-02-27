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
          Lista Relógios
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
              <q-td key="descricao" :props="props">{{ props.row.descricao }}</q-td>
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
            helper="Nome do equipamento"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.nome"
              float-label="Nome"
              maxlength="75"
            />
          </q-field>
        </div>
        <div class="col-12">
          <q-field
            :count="75"
            helper="Descrição do equipamento"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.descricao"
              float-label="Descrição"
              maxlength="75"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="17"
            helper="Numero de série"
            error-label="Some error"
          >
            <q-input
              type="text"
              v-model="modelo.serie"
              float-label="Série"
              maxlength="17"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="50"
            helper="Modelo do equipamento"
            error-label="Some error"
          >
            <q-input
              type="text"
              v-model="modelo.modelo"
              float-label="Modelo"
              maxlength="50"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="15"
            helper="Número IPV4 na rede"
            error-label="Some error"
          >
            <q-input
              type="text"
              v-model="modelo.ip"
              float-label="IP"
              v-mask="'###.###.###.###'"
              maxlength="15"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Selecione a Empresa"
            error-label="Some error"
          >
            <q-select
              v-model="modelo.empresa"
              :options="empresas"
              :disable="funcLoad"
              filter
              autofocus-filter
              float-label="Empresa"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Selecione o local de trabalho"
            error-label="Some error"
          >
            <q-select
              :value="modelo.local"
              @change="val => { modelo.local = val }"
              :options="locais"
              filter
              autofocus-filter
              :disable="funcLoad"
              float-label="Local de trabalho"
            />
          </q-field>
        </div>
        <div class="col-12 mt-sm">
          <div class="text-center">
              <br/>
            <p class="q-headline text-center"> Empresas associadas</p>
          </div>
          <q-table
            ref="table"
            :data="listEmpresas"
            :columns="[
              { name: 'razao', label: 'Razão Social', field: 'razao', align: 'left' },
              { name: 'cnpj', label: 'CNPJ', field: 'cnpj', align: 'left' }
            ]"
            :filter="filter"
            :filter-method="myFilter"
            :loading="loading"
            selection="multiple"
            :selected.sync="modelo.empresaAdicional"
          >
          </q-table>
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
      empresas: [],
      listEmpresas: [],
      modelo: {
        nome: '',
        descricao: '',
        local: '',
        serie: '',
        modelo: '',
        ip: '',
        empresa: '',
        empresaAdicional: []
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
        { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left' },
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
    toggleVisibility () {
      this.visible = !this.visible
    },
    submit () {
      axios({
        baseURL: this.modelo.id ? 'http://localhost:8080/relogio/' + this.modelo.id : `http://localhost:8080/relogio`,
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
    getEmpresas () {
      axios
        .get(`http://localhost:8080/empresa`)
        .then(response => {
          this.empresas = []
          var temp = JSON.parse(JSON.stringify(response.data))
          for (let i = 0; i < temp.length; i++) {
            var element = temp[i]
            this.empresas.push({
              label: element.razao,
              value: element
            })
          }
          this.funcLoad = false
        })
    },
    tableEmpresas () {
      axios
        .get(`http://localhost:8080/empresa`)
        .then(response => {
          this.listEmpresas = []
          this.listEmpresas = JSON.parse(JSON.stringify(response.data))
        })
    },
    clear () {
      this.modelo = {
        nome: '',
        descricao: '',
        local: '',
        serie: '',
        modelo: '',
        ip: '',
        empresa: '',
        empresaAdicional: [{}]
      }
      this.$q.notify({
        color: 'positive',
        position: 'top',
        message: 'Formulário limpo',
        icon: 'report_problem'
      })
    },
    fetchData () {
      // carregar coisas
      // console.log(this.modelo)
    },
    request () {
      this.loading = true
      axios
        .get(`http://localhost:8080/relogio`)
        .then(response => {
          this.serverData = JSON.parse(JSON.stringify(response.data))
          this.loading = false
        })
        .catch(error => {
          this.serverData = [{nome: 'error', descricao: '1'}]
          console.log(error)
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
      this.modelo = row
      for (let i = 0, j = true; i < this.empresas.length && j; i++) {
        if (this.empresas[i].value.id === this.modelo.empresa.id) {
          this.modelo.empresa = this.empresas[i].value
          j = false
        }
      }
      for (let i = 0, j = true; i < this.locais.length && j; i++) {
        if (this.locais[i].value.id === this.modelo.local.id) {
          this.modelo.local = this.locais[i].value
          j = false
        }
      }
      for (let i = 0; i < this.modelo.empresaAdicional.length; i++) { // atualiza os dados das empresas com base no fk enviado pelo json
        const element = this.modelo.empresaAdicional[i]
        axios({
          method: 'get',
          url: 'http://localhost:8080/empresa/' + element.id,
          headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
        }).then(response => {
          this.modelo.empresaAdicional[i] = JSON.parse(JSON.stringify(response.data))
        })
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
          url: 'http://localhost:8080/relogio/' + id,
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
    this.getEmpresas()
    this.tableEmpresas()
  }
}
</script>
<style>
</style>
