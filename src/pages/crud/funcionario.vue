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
          Lista Perfis de jornada
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
            helper="Nome do Funcionário"
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
            :count="20"
            helper="Matricula do Funcionário"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.matricula"
              float-label="Matricula"
              maxlength="20"
              v-mask="'####################'"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="12"
            helper="PIS do Funcionário"
            error-label="PIS Inválido"
            :error="erropis"
          >
            <q-input
              @blur="validapis()"
              v-model="modelo.pis"
              float-label="PIS"
              maxlength="12"
              v-mask="'############'"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="14"
            helper="CPF do Funcionário"
            error-label="CPF Inválido"
            :error="errocpf"
          >
            <q-input
              @blur="validacpf()"
              v-model="modelo.cpf"
              float-label="CPF"
              maxlength="14"
              v-mask="'###.###.###-##'"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="40"
            helper="Função do Funcionário"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.funcao"
              float-label="Função"
              maxlength="40"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="20"
            helper="Login para acesso"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.login"
              float-label="login"
              maxlength="20"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Senha para acesso"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.senha"
              float-label="Senha"
              maxlength="12"
              type="password"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Departamento associado"
            error-label="Some error"
          >
            <q-select
              v-model="modelo.departamento"
              :options="departamentos"
              :disable="funcLoad"
              filter
              autofocus-filter
              float-label="Departamento"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Jornada associada"
            error-label="Some error"
          >
          </q-field>
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
import brv from 'br-validations'
// script part of a Vue component
export default {
  data () {
    return {
      errocpf: false,
      erropis: false,
      funcLoad: true,
      localLoad: true,
      locais: [],
      url: '',
      text: '',
      visible: 'one',
      responsaveis: [],
      modelo: {
        nome: '',
        matricula: 0,
        pis: '',
        cpf: '',
        departamento: {},
        funcao: '',
        jornada: '',
        login: '',
        senha: ''
      },
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10
      },
      serverData: [],
      departamentos: [],
      columns: [
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
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
      if (this.errocpf || this.erropis) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Erro validação',
          icon: 'report_problem'
        })
      } else {
        axios({
          baseURL: this.modelo.id ? 'http://localhost:8080/funcionario/' + this.modelo.id : `http://localhost:8080/funcionario`,
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
      }
    },
    clear () {
      this.modelo = {
        nome: '',
        matricula: 0,
        pis: '',
        cpf: '',
        departamento: {},
        funcao: '',
        jornada: '',
        login: '',
        senha: ''
      }
      this.errocpf = false
      this.erropis = false
      this.$q.notify({
        color: 'positive',
        position: 'top',
        message: 'Formulário limpo',
        icon: 'report_problem'
      })
    },
    fetchData () {
    },
    request () {
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      axios
        .get(`http://localhost:8080/funcionario`)
        .then(response => {
          // then we update the rows with the fetched ones
          this.serverData = JSON.parse(JSON.stringify(response.data))
          // finally we tell QTable to exit the "loading" state
          this.loading = false
        })
        .catch(error => {
          this.serverData = [{nome: 'teste', descricao: 'error'}]
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },
    departCombobox () {
      let temp = []
      axios
        .get(`http://localhost:8080/departamento`)
        .then(response => {
          temp = JSON.parse(JSON.stringify(response.data))
          // finally we tell QTable to exit the "loading" state
          for (let i = 0; i < temp.length; i++) {
            var element = JSON.parse(JSON.stringify(temp[i]))
            this.departamentos.push({
              label: element.nome,
              value: element
            })
          }
          this.funcLoad = false
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
      for (let i = 0, j = true; i < this.departamentos.length && j; i++) {
        if (this.departamentos[i].value.id === this.modelo.departamento.id) {
          this.modelo.departamento = this.departamentos[i].value
          j = false
        }
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
          url: 'http://localhost:8080/funcionario/' + id,
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
    },
    validapis () {
      this.erropis = !brv.pis.validate(this.modelo.pis)
    },
    validacpf () {
      this.errocpf = !brv.cpf.validate(this.modelo.cpf)
    }
  },
  beforeMount () {
    this.fetchData()
    this.request()
    this.departCombobox()
  }
}
</script>
<style>
</style>
