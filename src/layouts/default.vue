<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header
    no-border>
      <q-toolbar
        no-border
        color="primary"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Gerir - Ponto
          <div slot="subtitle">Hospital Iamada</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      no-border
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2 bg-primary' : 'bg-primary' "
    >
      <q-scroll-area class="full-height">
        <q-list
        class="bg-primary full-height"
          no-border
          link
          dark
        >
        <div class="q-pa-lg text-center">
          <img style="width: 100px" src="\statics\quasar-logo.png" alt="Logotipo"/>
        </div>
          <q-item to="/" exact>
            <q-item-side icon="home" />
            <q-item-main label="Home" />
          </q-item>
          <q-item to="/empresa" exact>
            <q-item-side icon="school" />
            <q-item-main label="Empresa" sublabel="Dados da empresa" />
          </q-item>
          <q-item to="/relogio" exact>
            <q-item-side icon="work" />
            <q-item-main label="Relógio" sublabel="Equipamentos da empresa" />
          </q-item>
          <q-item to="/feriado" exact>
            <q-item-side icon="flight_takeoff" />
            <q-item-main label="Feriados" sublabel="Feriados cadastrados" />
          </q-item>
          <q-item to="/justificativa" exact>
            <q-item-side icon="gavel" />
            <q-item-main label="Justificativa" sublabel="Tipos de Justificativas" />
          </q-item>
          <q-item to="/horario" exact>
            <q-item-side icon="av_timer" />
            <q-item-main label="Horario" sublabel="Variações de horário" />
          </q-item>
          <q-item to="/departamento" exact>
            <q-item-side icon="location_city" />
            <q-item-main label="Departamento" sublabel="Departamentos disponíveis" />
          </q-item>
          <q-item class="bg-primary" to="/perfil" exact>
            <q-item-side icon="build" />
            <q-item-main label="Perfil" sublabel="Perfis de jornada" />
          </q-item>
          <q-item class="bg-primary" to="/ocorrencia" exact>
            <q-item-side icon="report_off" />
            <q-item-main label="Ocorrências" sublabel="Ocorrências de jornada" />
          </q-item>
          <q-item class="bg-primary" to="/funcionario" exact>
            <q-item-side icon="portrait" />
            <q-item-main label="Funcionários" sublabel="Cadastro dos colaboradores" />
          </q-item>
          <q-item class="bg-primary" to="/local" exact>
            <q-item-side icon="person_pin" />
            <q-item-main label="Local" sublabel="Local de Trabalho" />
          </q-item>
          <q-item class="bg-primary" to="/lancarocorrencia" exact>
            <q-item-side icon="portrait" />
            <q-item-main label="Lançar Ocorrência" sublabel="Ocorrências Administrativas" />
          </q-item>
          <q-item class="bg-primary" to="/lancarjustificativa" exact>
            <q-item-side icon="portrait" />
            <q-item-main label="Lançar Justificativa" sublabel="Justificativa na Jornada" />
          </q-item>
          <q-item class="bg-primary" to="/enviarmensagem" exact>
            <q-item-side icon="portrait" />
            <q-item-main label="Enviar Mensagem" sublabel="Mensagem para Usuários" />
          </q-item>
          <q-item class="bg-primary" to="/trocarhorario" exact>
            <q-item-side icon="portrait" />
            <q-item-main label="Trocar Horario" sublabel="Trocar horário entre funcionários" />
          </q-item>
            <q-item class="bg-primary" to="/aceitarjustificativa" exact>
            <q-item-side icon="portrait" />
            <q-item-main label="Aceitar Justificativa" sublabel="Aceitar Justificativa de funcionários" />
          </q-item>
            <q-item class="bg-primary" to="/jornada" exact>
            <q-item-side icon="today" />
            <q-item-main label="Lançar Jornada" sublabel="Lançamento de jornada" />
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div v-show="!logado" class="fullscreen bg-primary">
      <div class="fixed-center full-height bg-white text-dark q-pa-xl">
        <div class="q-pa-lg text-center">
          <img style="width: 100px" src="\statics\quasar-logo.png" alt="Logotipo"/>
        </div>
        <div>
          <q-field
            text-dark
            :count="20"
            helper="Login para acesso"
            error-label="Some error"
          >
            <q-input
              v-model="usuario.login"
              float-label="login"
              maxlength="20"
            />
          </q-field>
        </div>
        <div class="">
          <q-field
            helper="Senha para acesso"
            error-label="Some error"
          >
            <q-input
              v-model="usuario.senha"
              float-label="Senha"
              maxlength="12"
              type="password"
            />
          </q-field>
        </div>
        <div class="row q-pa-lg gutter-sm justify-center">
          <div>
            <q-btn class="fit" color="primary" @click="logar">Logar</q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import axios from 'axios'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      usuario: {
        login: '',
        senha: ''
      },
      logado: false
    }
  },
  methods: {
    openURL,
    logar () {
      axios
        .post(`https://estagio-back.herokuapp.com//login/auth`, this.usuario)
        .then(response => {
          this.$store.commit('setUser', response.data)
          this.logado = true
          this.$q.notify({
            color: 'positive',
            message: 'Logado com sucesso',
            icon: 'report_problem'
          })
        }).catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Usuário ou senha inválidos',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>

<style>
  .tab{
    background-color: primary
  }
</style>
