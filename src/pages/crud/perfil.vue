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
            helper="Nome do Perfil"
            error-label="Some error"
          >
            <q-input
              v-model="modelo.nome"
              float-label="Perfil"
              maxlength="75"
            />
          </q-field>
        </div>
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Dias úteis"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.col_extra_ut"
              float-label="Extras"
              maxlength="3"
            />
          </q-field>
        </div>
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Sabado"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.col_extra_sab"
              float-label="Extras"
              maxlength="3"
            />
          </q-field>
        </div>
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Domingos"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.col_extra_dom"
              float-label="Extras"
              maxlength="3"
            />
          </q-field>
        </div>
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Feriados"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.col_extra_fer"
              float-label="Extras"
              maxlength="3"
            />
          </q-field>
        </div>
        <q-checkbox class="text-center q-mt-lg" v-model="modelo.conf_bh_habilita" label="Utilizar Banco de horas" />
      </div>
      <div v-show="modelo.conf_bh_habilita" class="row q-pa-lg gutter-sm justify-center">
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Dias úteis"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.conf_bh_ut"
              float-label="Banco Horas"
              maxlength="3"
            />
          </q-field>
        </div>
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Sabado"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.conf_bh_sab"
              float-label="Banco Horas"
              maxlength="3"
            />
          </q-field>
        </div>
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Domingos"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.conf_bh_dom"
              float-label="Banco Horas"
              maxlength="3"
            />
          </q-field>
        </div>
        <div class="col-3">
          <q-field
            :count="3"
            helper="% Feriados"
            error-label="Some error"
            v-mask="'###'"
          >
            <q-input
              v-model="modelo.conf_bh_fer"
              float-label="Banco Horas"
              maxlength="3"
            />
          </q-field>
        </div>
        <div class="col-6">
          <q-field
            :count="5"
            helper="DD/MM (31/12)"
            error-label="Some error"
            v-mask="'##/##'"
          >
            <q-input
              v-model="modelo.conf_bh_fechamento"
              float-label="Fechamento BH"
              maxlength="5"
            />
          </q-field>
        </div>
        <div class="col-6">
          <q-checkbox class="text-center q-mt-lg" v-model="modelo.conf_bh_deduzirFalta" label="Deduzir horas falta do BH" />
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
      modelo: {
        nome: '',
        col_extra_ut: 50,
        col_extra_sab: 50,
        col_extra_dom: 100,
        col_extra_fer: 100,
        conf_bh_ut: 0,
        conf_bh_sab: 0,
        conf_bh_dom: 0,
        conf_bh_fer: 0,
        conf_bh_deduzirFalta: false,
        conf_bh_habilita: false,
        conf_bh_fechamento: '31/12'
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
      axios({
        baseURL: this.modelo.id ? 'https://estagio-back.herokuapp.com//perfiljornada/' + this.modelo.id : `https://estagio-back.herokuapp.com//perfiljornada`,
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
    clear () {
      this.modelo = {
        nome: '',
        col_extra_ut: 50,
        col_extra_sab: 50,
        col_extra_dom: 100,
        col_extra_fer: 100,
        conf_bh_ut: 0,
        conf_bh_sab: 0,
        conf_bh_dom: 0,
        conf_bh_fer: 0,
        conf_bh_deduzirFalta: false,
        conf_bh_habilita: false,
        conf_bh_fechamento: '31/12'
      }
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
        .get(`https://estagio-back.herokuapp.com//perfiljornada`)
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
    myFilter (rows, filter, cols, cellValue) {
      const lowerTerms = filter ? filter.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },
    atualizaModel (row) {
      this.visible = 'two'
      this.modelo = row
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
          url: 'https://estagio-back.herokuapp.com//perfiljornada/' + id,
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
    this.fetchData()
    this.request()
  }
}
</script>
<style>
</style>
