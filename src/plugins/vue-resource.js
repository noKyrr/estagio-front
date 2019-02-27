// import something here
import vueresource from 'vue-resource'
import VueTheMask from 'vue-the-mask'
import cpfcnpj from 'node-cpf-cnpj'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(vueresource)
  Vue.use(VueTheMask)
  Vue.use(cpfcnpj)
  Vue.use(VCalendar, {
    formats: {
      title: 'MMMM YYYY',
      weekdays: 'W',
      navMonths: 'MMM',
      input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
      dayPopover: 'L',
      data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD']
    }
  })
}
