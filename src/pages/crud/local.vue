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
          Lista Locais
        </q-card-title>
        <q-card-separator />
        <div class="fit">
          <q-table
            ref="table"
            :data="serverData"
            :columns="[
              { name: 'razao', label: 'Razão Social', field: 'razao', align: 'left' },
              { name: 'cnpj', label: 'CNPJ', field: 'cnpj', align: 'left' },
              { name: 'edit', label: 'Ação', align: 'right', field: 'edit' }
            ]"
            :filter="filter"
            :filter-method="myFilter"
            :loading="loading"
            selection="single"
          >
          <template slot="body" slot-scope="props">
            <q-tr :props="props">
              <q-td auto-width>
              </q-td>
              <q-td key="razao" :props="props">{{ props.row.razao }}</q-td>
              <q-td key="cnpj" :props="props">{{ props.row.cnpj }}</q-td>
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
    Cadastro Local
    </q-card-title>
    <q-card-separator />
      <div class="row q-pa-lg gutter-sm justify-center">
        <div class="col-12">
          <q-field
            :count="75"
            helper="Nome do Local de Trabalho"
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
            helper="Rua/Avenida"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.endereco"
              float-label="Endereço"
              maxlength="75"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="8"
            helper="CEP do Local"
            error-label="CEP Inválido"
            :error="validacep"
          >
            <q-input
             @blur="valida()"
              type="text"
              v-model="modelo.cep"
              float-label="CEP"
              v-mask="'########'"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            :count="75"
            helper="Bairro do Local"
            error-label="Bairro Inválido"
          >
            <q-input
              type="text"
              v-model="modelo.bairro"
              float-label="Bairro"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Selecione a Cidade"
            error-label="Some error"
          >
            <q-select
              v-model="modelo.cidade"
              :options="cidades"
              :disable="cidades.length === 0"
              filter
              autofocus-filter
              float-label="Cidade"
            />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-field
            helper="Selecione a UF"
            error-label="Some error"
          >
            <q-select
              v-model="modelo.estado"
              :options="estados"
              :disable="estados.length === 0"
              filter
              autofocus-filter
              float-label="Estado"
            />
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
import cpf from 'node-cpf-cnpj'
import cnpj from 'node-cnpj'
// script part of a Vue component
export default {
  data () {
    return {
      validacep: false,
      funcLoad: true,
      localLoad: true,
      locais: [],
      url: '',
      text: '',
      visible: 'one',
      cidades: [],
      estados: [],
      modelo: {
        nome: '',
        endereco: '',
        cep: '',
        bairro: '',
        estado: ''
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
      if (this.validacep) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Erro validação',
          icon: 'report_problem'
        })
      } else {
        axios({
          baseURL: this.modelo.id ? 'https://estagio-back.herokuapp.com//empresa/' + this.modelo.id : `https://estagio-back.herokuapp.com//empresa`,
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
    getlocal () {
      axios({
        method: 'get',
        url: 'https://estagio-back.herokuapp.com//local',
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
        url: 'https://estagio-back.herokuapp.com//funcionario',
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
        razao: '',
        fantasia: '',
        cnpj: '',
        responsavel: '',
        cpf: '',
        local: ''
      }
      this.validacnpj = false
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
        .get(`https://estagio-back.herokuapp.com//empresa`)
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
      this.modelo = row
      for (let i = 0, j = true; i < this.responsaveis.length && j; i++) {
        if (this.responsaveis[i].value.id === this.modelo.responsavel.id) {
          this.modelo.responsavel = this.responsaveis[i].value
          j = false
        }
      }
      for (let i = 0, j = true; i < this.locais.length && j; i++) {
        if (this.locais[i].value.id === this.modelo.local.id) {
          this.modelo.local = this.locais[i].value
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
          url: 'https://estagio-back.herokuapp.com//empresa/' + id,
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
    validacpf () {
      this.validacnpj = !cpf.isValid(`346.184.588-44`)
      console.log(this.validacnpj)
    },
    valida () {
      this.validacnpj = !cnpj.validate(this.modelo.cnpj)
      console.log(this.validacnpj)
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
