<template>
<div>
    <q-btn
          flat
          round
          dense
          @click="opened = true"
          icon="keyboard_arrow_left"
        />
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
          <q-td key="mensagem" :props="props">{{ props.row.mensagem }}</q-td>
          <q-td key="edit" :props="props">
                <q-btn flat round dense dark :icon="'delete'" @click="excluiModel(props.row.id)"/>
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
          Envio de Mensagem
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar slot="footer">
        <div class="row q-pa-lg gutter-sm justify-center wrap">
          <div class="col-auto inline">
            <q-btn
              color="secondary"
              @click="salvar"
              label="Enviar"
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
        <div class="col-12">
          <q-field
            helper="Selecione o destinatário"
            error-label="Some error"
          >
            <q-select
              v-model="modeloLanc.destino"
              :options="funcionarios"
              :disable="funcionarios.length === 0"
              filter
              autofocus-filter
              float-label="Funcionários"
            />
          </q-field>
        </div>
        <div class="col-12">
          <q-field
            :count="2500"
            helper="Mensagem enviada ao usaário"
            error-label="Some error"
          >
            <q-input
              v-model="modeloLanc.mensagem"
              float-label="Mensagem:"
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
        origem: '',
        destino: '',
        mensagem: '',
        data: new Date(),
        lido: false
      },
      funcionarios: [],
      opened: false,
      columns: [
        { name: 'mensagem', label: 'Mensagem', field: 'mensagem', align: 'left' },
        { name: 'edit', label: 'Ação', align: 'right', field: 'edit' }],
      serverData: [],
      mensagens: []
    }
  },
  methods: {
    salvar () {
      this.modeloLanc.origem = this.$store.state.user
      axios({
        baseURL: this.modeloLanc.id ? 'https://estagio-back.herokuapp.com//mensagem/' + this.modeloLanc.id : `https://estagio-back.herokuapp.com//mensagem`,
        timeout: 10000,
        method: this.modeloLanc.id ? 'PUT' : 'POST',
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(this.modeloLanc)
      }).then(response => {
        this.atualizaMensagem()
        console.log(response)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Enviado com sucesso',
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
          message: 'Erro ao Enviar',
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
    },
    atualizaMensagem () {
      axios
        .get(`https://estagio-back.herokuapp.com//mensagem`)
        .then(response => {
          // then we update the rows with the fetched ones
          this.mensagens = []
          this.serverData = JSON.parse(JSON.stringify(response.data))
        })
        .catch(error => {
          this.funcionarios = [{nome: 'teste', descricao: 'error'}]
          // there's an error... do SOMETHING
          console.log(error)
          // we tell QTable to exit the "loading" state
        })
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
          url: 'https://estagio-back.herokuapp.com//mensagem/' + id,
          headers: {'content-Type': 'application/json', 'Accept': 'application/json'}
        }).then(response => {
          this.$q.notify({
            color: 'positive',
            message: 'Excluido com sucesso'
          })
          this.atualizaMensagem()
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
    clear () {
      this.modeloLanc = {
        origem: '',
        destino: '',
        mensagem: '',
        data: new Date(),
        lido: false
      }
    }
  },
  beforeMount () {
    this.atualizaModel()
    this.atualizaMensagem()
  }
}
</script>
