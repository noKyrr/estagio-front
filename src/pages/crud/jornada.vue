<template>
<q-page class="row" style="padding:0;">
  <q-page-sticky position="top-left" :offset="[12, 12]">
  </q-page-sticky>
      <q-card v-show="visible==='one'" class="col responsive">
        <q-btn-toggle
          class="q-mt-md q-ml-md"
          v-model="visible"
          toggle-color="primary"
          :options="[
            {label: 'Lista', value: 'one'},
            {label: 'Cadastro', value: 'two'},
          ]"
        />
         <q-card-title class="text-right">
          Lista Jornada
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
      <q-btn-toggle
        class="q-ma-md"
        v-model="visible"
        toggle-color="primary"
        :options="[
          {label: 'Lista', value: 'one'},
          {label: 'Cadastro', value: 'two'},
        ]"
      />
     <q-tabs
        class="col responsive"
        v-model="tabsModel"
        inverted>
        <q-tab name="xtab-1" icon="today" label="Mensal" slot="title" />
        <q-tab name="xtab-2" icon="access_alarm" label="Semanal" slot="title" />
        <q-tab name="xtab-3" icon="update" label="12x36" slot="title" />
        <q-tab-pane name="xtab-1">
            <div class="row q-pa-lg gutter-sm justify-center">
              <div class="col-12">
                <q-field
                  :count="75"
                  helper="Nome da jornada"
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
              </div>
              <div class="col-12 mt-sm row q-pa-lg gutter-sm">
                <div class="col-xs-12 col-sm-6 mt-sm">
                  <q-field
                    label="Escala"
                  >
                    <v-calendar style="width:100%" :attributes='attrs'>
                    </v-calendar>
                  </q-field>
                  <div class="row">
                    <div class="col-12">
                      <q-field
                        helper="Selecione o perfil"
                        error-label="Some error"
                      >
                        <q-select
                          v-model="modelo.perfil"
                          :options="perfilJornada"
                          :disable="perfilJornada.length === 0"
                          filter
                          autofocus-filter
                          float-label="Perfil"
                        />
                      </q-field>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-6 mt-sm">
                  <q-field
                    label="Seleção"
                  >
                    <!--<v-date-picker
                    style="width:100%"
                      :formats='formats'
                      v-model='myDate'
                      mode='multiple'
                      is-inline=true>
                    </v-date-picker> -->
                    <v-date-picker
                      v-model='myDate'
                      mode='multiple'
                      is-inline=true>
                      <input
                        type='text'
                        slot-scope='{ inputValue, updateValue }'
                        :value='inputValue'
                        @change='console.log("teste")'>
                    </v-date-picker>
                  </q-field>
                  <div class="row justify-end">
                    <div class="col-12">
                      <q-field
                        helper="Selecione o horário"
                        error-label="Some error"
                      >
                        <q-select
                          v-model="modelo.horario"
                          :options="horarios"
                          :disable="horarios.length === 0"
                          filter
                          autofocus-filter
                          float-label="Horarios"
                        />
                      </q-field>
                    </div>
                  </div>
                  <div class="row justify-end">
                    <q-btn class="col-sm-12 col-md-6 q-mt-sm"
                    label="Inserir"
                    icon='chevron_left'
                    color="primary"
                    @click="teste()"
                    :disable='!this.modelo.horario'/>
                  </div>
                </div>
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
        </q-tab-pane>
        <q-tab-pane name="xtab-2">Tab Two</q-tab-pane>
        <q-tab-pane name="xtab-3">Tab Three</q-tab-pane>
      </q-tabs>
  </q-card>
</q-page>

</template>

<script>
import axios from 'axios'
import { date } from 'quasar'
// script part of a Vue component
export default {
  data () {
    return {
      horarios: [],
      perfilJornada: [],
      selectedDate: null,
      myDate: null,
      usedDates: [],
      formats: {
        title: 'MMMM YYYY',
        weekdays: 'W',
        navMonths: 'MMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'], // Only for `v-date-picker`
        dayPopover: 'L', // Only for `v-date-picker`
        data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'] // For attribute dates
      },
      attrs: [],
      funcLoad: true,
      localLoad: true,
      locais: [],
      url: '',
      text: '',
      visible: 'one',
      tableDepartamento: [],
      modelo: {
        listaHorarios: [],
        perfil: '',
        horario: '',
        nome: ''
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
        { name: 'edit', label: 'Ação', align: 'right', field: 'edit' }
      ]
    }
  },
  computed: {
    buttonColor () {
      return this.$q.screen.lt.md
        ? 'primary'
        : 'secondary'
    },
    inputState () {
      if (!this.selectedValue) {
        return {
          type: 'is-danger',
          message: 'Date required.'
        }
      }
      return {
        type: 'is-primary',
        message: ''
      }
    }
  },
  methods: {
    teste () {
      for (let h = 0; h < this.myDate.length; h++) {
        const element = this.myDate[h]
        if (this.usedDates.includes(element)) {
          this.$q.notify({
            color: 'negative',
            message: 'Dia ' + date.formatDate(element, 'DD/MM/YYYY') + ' em duplicidade, favor rever a seleção.'
          })
          return
        }
      }
      let find = false
      for (let i = 0; i < this.attrs.length; i++) {
        const element = this.attrs[i]
        if (element.key === this.modelo.horario) {
          // adiciona horario apenas
          element.dates = element.dates.concat(this.myDate)
          this.usedDates = this.usedDates.concat(this.myDate)
          find = true
          break
        }
      }
      if (!find) {
        this.usedDates = this.usedDates.concat(this.myDate)
        this.attrs.push({
          key: this.modelo.horario,
          highlight: {
            backgroundColor: this.getRandomColor()
            // Other properties are available too, like `height` & `borderRadius`
          },
          dates: [].concat(this.myDate),
          popover: {
            label: this.modelo.horario.nome
          }
        })
      }
    },
    getRandomColor () {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    toggleVisibility () {
      this.visible = !this.visible
    },
    submit () {
      this.modelo.listaHorarios = []
      this.attrs.forEach(element => {
        element.dates.forEach(element2 => {
          this.modelo.listaHorarios.push({
            data: element2,
            horario: element.key
          })
        })
      })
      axios({
        baseURL: this.modelo.id ? 'https://estagio-back.herokuapp.com//jornadamensal/' + this.modelo.id : `https://estagio-back.herokuapp.com//jornadamensal`,
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
    getHorarios () {
      axios({
        method: 'get',
        url: 'https://estagio-back.herokuapp.com//horario',
        headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(response => {
        this.horarios = []
        var temp = JSON.parse(JSON.stringify(response.data))
        for (let i = 0; i < temp.length; i++) {
          var element = temp[i]
          this.horarios.push({
            label: element.nome,
            value: element
          })
        }
      })
    },
    getPerfil () {
      axios({
        method: 'get',
        url: 'https://estagio-back.herokuapp.com//perfiljornada',
        headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(response => {
        this.perfilJornada = []
        var temp = JSON.parse(JSON.stringify(response.data))
        for (let i = 0; i < temp.length; i++) {
          var element = temp[i]
          this.perfilJornada.push({
            label: element.nome,
            value: element
          })
        }
      })
    },
    clear () {
      this.modelo = {
        listaHorarios: [],
        perfil: '',
        horario: '',
        nome: ''
      }
      this.usedDates = []
      this.attrs = []
      this.myDate = []
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
        .get(`https://estagio-back.herokuapp.com//jornada`)
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
      this.modelo.listaHorarios = []
      this.modelo = row
      for (let i = 0; i < this.modelo.listaHorarios.length; i++) { // atualiza os dados das empresas com base no fk enviado pelo json
        const element = this.modelo.listaHorarios[i]
        axios({
          method: 'get',
          url: 'https://estagio-back.herokuapp.com//jornadamensalitem/' + element.id,
          headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
        }).then(response => {
          this.modelo.listaHorarios.push(JSON.parse(JSON.stringify(response.data)))
        })
      }
      for (let k = 0; k < this.modelo.listaHorarios.length; k++) {
        const elementPai = this.modelo.listaHorarios[k]
        let find = false
        for (let i = 0; i < this.attrs.length; i++) {
          const element = this.attrs[i]
          if (element.key === this.elementPai.horario) {
            // adiciona horario apenas
            element.dates = element.dates.concat(elementPai.data)
            this.usedDates = this.usedDates.concat(elementPai.data)
            find = true
            break
          }
        }
        if (!find) {
          this.usedDates = this.usedDates.concat(elementPai.data)
          this.attrs.push({
            key: elementPai.horario,
            highlight: {
              backgroundColor: this.getRandomColor()
              // Other properties are available too, like `height` & `borderRadius`
            },
            dates: [].concat(elementPai.data),
            popover: {
              label: elementPai.horario.nome
            }
          })
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
          url: 'https://estagio-back.herokuapp.com//jornada/' + id,
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
    this.getHorarios()
    this.getPerfil()
    this.fetchData()
    this.request()
  }
}
</script>
<style>
</style>
