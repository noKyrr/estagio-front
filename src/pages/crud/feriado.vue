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
          Lista Feriados
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
            helper="Nome do feriado"
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
            helper="Descrição do feriado"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.descricao"
              float-label="Descrição"
              maxlength="75"
            />
          </q-field>
        </div>
        <div class="col-12 mt-sm">
          <q-datetime-picker class="fit" v-model="modelo.data" type="date" />
        </div>
        <div class="col-12 mt-sm text-center pa-sm">
          <q-checkbox class="text-center" v-model="modelo.conf_he" label="Não calcular horas extras para esse dia" />
          <div>
              <br/>
            <p class="q-headline text-center"> Departamentos afetados</p>
          </div>
          <q-table
            ref="table"
            :data="tableDepartamento"
            :columns="columns"
            :filter="filter"
            :filter-method="myFilter"
            :loading="loading"
            selection="multiple"
            :selected.sync="modelo.departamentos"
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
      tableDepartamento: [],
      modelo: {
        nome: '',
        descricao: '',
        data: '',
        conf_he: false,
        departamentos: []
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
        baseURL: this.modelo.id ? 'https://estagio-back.herokuapp.com//feriado/' + this.modelo.id : `https://estagio-back.herokuapp.com//feriado`,
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
    getDepartamentos () {
      axios({
        method: 'get',
        url: 'https://estagio-back.herokuapp.com//departamento',
        headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(response => {
        this.tableDepartamento = JSON.parse(JSON.stringify(response.data))
      })
    },
    clear () {
      this.modelo = {
        nome: '',
        descricao: '',
        data: '',
        conf_he: false,
        departamentos: []
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
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      axios
        .get(`https://estagio-back.herokuapp.com//feriado`)
        .then(response => {
          this.serverData = JSON.parse(JSON.stringify(response.data))
          this.loading = false
        })
        .catch(error => {
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
      for (let i = 0; i < this.modelo.departamentos.length; i++) { // atualiza os dados das empresas com base no fk enviado pelo json
        const element = this.modelo.departamentos[i]
        axios({
          method: 'get',
          url: 'https://estagio-back.herokuapp.com//departamento/' + element.id,
          headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
        }).then(response => {
          this.modelo.departamentos[i] = JSON.parse(JSON.stringify(response.data))
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
          url: 'https://estagio-back.herokuapp.com//feriado/' + id,
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
    this.getDepartamentos()
    this.fetchData()
    this.request()
  }
}
</script>
<style>
</style>
