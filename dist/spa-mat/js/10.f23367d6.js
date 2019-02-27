(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{ixFF:function(o,e,t){"use strict";var a=t("w8zG"),s=t.n(a);s.a},w8zG:function(o,e,t){},ywcj:function(o,e,t){"use strict";t.r(e);var a=function(){var o=this,e=o.$createElement,t=o._self._c||e;return t("q-page",{staticClass:"row",staticStyle:{padding:"0"}},[t("q-page-sticky",{attrs:{position:"top-left",offset:[12,12]}},[t("q-btn-toggle",{attrs:{"toggle-color":"primary",options:[{label:"Lista",value:"one"},{label:"Cadastro",value:"two"}]},model:{value:o.visible,callback:function(e){o.visible=e},expression:"visible"}})],1),t("q-card",{directives:[{name:"show",rawName:"v-show",value:"one"===o.visible,expression:"visible==='one'"}],staticClass:"col responsive"},[t("q-card-title",{staticClass:"text-right"},[o._v("\n          Lista Perfis de jornada\n        ")]),t("q-card-separator"),t("div",{staticClass:"fit"},[t("q-table",{ref:"table",attrs:{data:o.serverData,columns:o.columns,filter:o.filter,"filter-method":o.myFilter,loading:o.loading,selection:"single"},scopedSlots:o._u([{key:"body",fn:function(e){return[t("q-tr",{attrs:{props:e}},[t("q-td",{attrs:{"auto-width":""}}),t("q-td",{key:"nome",attrs:{props:e}},[o._v(o._s(e.row.nome))]),t("q-td",{key:"edit",attrs:{props:e}},[t("q-btn",{attrs:{flat:"",round:"",dense:"",dark:"",icon:"edit"},on:{click:function(t){o.atualizaModel(e.row)}}}),t("q-btn",{attrs:{flat:"",round:"",dense:"",dark:"",icon:"delete"},on:{click:function(t){o.excluiModel(e.row.id)}}})],1)],1)]}}])})],1)],1),t("q-card",{directives:[{name:"show",rawName:"v-show",value:"two"===o.visible,expression:"visible==='two'"}],staticClass:"col responsive"},[t("q-card-title",{staticClass:"text-right"},[o._v("\n    Cadastro\n    ")]),t("q-card-separator"),t("div",{staticClass:"row q-pa-lg gutter-sm justify-center"},[t("div",{staticClass:"col-12"},[t("q-field",{attrs:{count:75,helper:"Nome do Funcionário","error-label":"Some error"}},[t("q-input",{attrs:{"float-label":"Nome",maxlength:"75"},model:{value:o.modelo.nome,callback:function(e){o.$set(o.modelo,"nome",e)},expression:"modelo.nome"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{count:20,helper:"Matricula do Funcionário","error-label":"Some error"}},[t("q-input",{directives:[{name:"mask",rawName:"v-mask",value:"####################",expression:"'####################'"}],attrs:{"float-label":"Matricula",maxlength:"20"},model:{value:o.modelo.matricula,callback:function(e){o.$set(o.modelo,"matricula",e)},expression:"modelo.matricula"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{count:12,helper:"PIS do Funcionário","error-label":"PIS Inválido",error:o.erropis}},[t("q-input",{directives:[{name:"mask",rawName:"v-mask",value:"############",expression:"'############'"}],attrs:{"float-label":"PIS",maxlength:"12"},on:{blur:function(e){o.validapis()}},model:{value:o.modelo.pis,callback:function(e){o.$set(o.modelo,"pis",e)},expression:"modelo.pis"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{count:14,helper:"CPF do Funcionário","error-label":"CPF Inválido",error:o.errocpf}},[t("q-input",{directives:[{name:"mask",rawName:"v-mask",value:"###.###.###-##",expression:"'###.###.###-##'"}],attrs:{"float-label":"CPF",maxlength:"14"},on:{blur:function(e){o.validacpf()}},model:{value:o.modelo.cpf,callback:function(e){o.$set(o.modelo,"cpf",e)},expression:"modelo.cpf"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{count:40,helper:"Função do Funcionário","error-label":"Some error"}},[t("q-input",{attrs:{"float-label":"Função",maxlength:"40"},model:{value:o.modelo.funcao,callback:function(e){o.$set(o.modelo,"funcao",e)},expression:"modelo.funcao"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{count:20,helper:"Login para acesso","error-label":"Some error"}},[t("q-input",{attrs:{"float-label":"login",maxlength:"20"},model:{value:o.modelo.login,callback:function(e){o.$set(o.modelo,"login",e)},expression:"modelo.login"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{helper:"Senha para acesso","error-label":"Some error"}},[t("q-input",{attrs:{"float-label":"Senha",maxlength:"12",type:"password"},model:{value:o.modelo.senha,callback:function(e){o.$set(o.modelo,"senha",e)},expression:"modelo.senha"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{helper:"Departamento associado","error-label":"Some error"}},[t("q-select",{attrs:{options:o.departamentos,disable:o.funcLoad,filter:"","autofocus-filter":"","float-label":"Departamento"},model:{value:o.modelo.departamento,callback:function(e){o.$set(o.modelo,"departamento",e)},expression:"modelo.departamento"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{helper:"Jornada associada","error-label":"Some error"}})],1)]),t("div",{staticClass:"row q-pa-lg gutter-sm justify-center"},[t("div",{staticClass:"col-4"},[t("q-btn",{staticClass:"fit",attrs:{color:"primary"},on:{click:o.submit}},[o._v("Gravar")])],1),t("div",{staticClass:"col-4"},[t("q-btn",{staticClass:"fit",attrs:{color:"secondary"},on:{click:o.clear}},[o._v("Limpar")])],1)])],1)],1)},s=[];a._withStripped=!0;var i=t("vDqi"),r=t.n(i),l=t("LIVi"),n=t.n(l),c={data:function(){return{errocpf:!1,erropis:!1,funcLoad:!0,localLoad:!0,locais:[],url:"",text:"",visible:"one",responsaveis:[],modelo:{nome:"",matricula:0,pis:"",cpf:"",departamento:{},funcao:"",jornada:"",login:"",senha:""},filter:"",loading:!1,serverPagination:{page:1,rowsNumber:10},serverData:[],departamentos:[],columns:[{name:"nome",label:"Nome",field:"nome",align:"left"},{name:"edit",label:"Ação",align:"right",field:"edit"}]}},computed:{buttonColor:function(){return this.$q.screen.lt.md?"primary":"secondary"}},methods:{toggleVisibility:function(){this.visible=!this.visible},submit:function(){var o=this;this.errocpf||this.erropis?this.$q.notify({color:"negative",position:"top",message:"Erro validação",icon:"report_problem"}):r()({baseURL:this.modelo.id?"https://estagio-back.herokuapp.com//funcionario/"+this.modelo.id:"https://estagio-back.herokuapp.com//funcionario",timeout:1e4,method:this.modelo.id?"PUT":"POST",withCredentials:!0,headers:{Accept:"application/json","Content-Type":"application/json"},data:JSON.stringify(this.modelo)}).then(function(e){o.request(),console.log(e),o.$q.notify({color:"positive",position:"top",message:"Gravado com sucesso",icon:"report_problem"}),o.clear()}).catch(function(e){e.response?(console.log(e.response.data),console.log(e.response.status),console.log(e.response.headers)):e.request?console.log(e.request):console.log("Error",e.message),console.log(e.config),o.$q.notify({color:"negative",position:"top",message:"Erro ao gravar",icon:"report_problem"})})},clear:function(){this.modelo={nome:"",matricula:0,pis:"",cpf:"",departamento:{},funcao:"",jornada:"",login:"",senha:""},this.errocpf=!1,this.erropis=!1,this.$q.notify({color:"positive",position:"top",message:"Formulário limpo",icon:"report_problem"})},fetchData:function(){},request:function(){var o=this;this.loading=!0,r.a.get("https://estagio-back.herokuapp.com//funcionario").then(function(e){o.serverData=JSON.parse(JSON.stringify(e.data)),o.loading=!1}).catch(function(e){o.serverData=[{nome:"teste",descricao:"error"}],console.log(e),o.loading=!1})},departCombobox:function(){var o=this,e=[];r.a.get("https://estagio-back.herokuapp.com//departamento").then(function(t){e=JSON.parse(JSON.stringify(t.data));for(var a=0;a<e.length;a++){var s=JSON.parse(JSON.stringify(e[a]));o.departamentos.push({label:s.nome,value:s})}o.funcLoad=!1})},myFilter:function(o,e,t,a){var s=e?e.toLowerCase():"";return o.filter(function(o){return t.some(function(e){return-1!==(a(e,o)+"").toLowerCase().indexOf(s)})})},atualizaModel:function(o){this.visible="two",this.modelo=o;for(var e=0,t=!0;e<this.departamentos.length&&t;e++)this.departamentos[e].value.id===this.modelo.departamento.id&&(this.modelo.departamento=this.departamentos[e].value,t=!1)},excluiModel:function(o){var e=this;this.$q.dialog({title:"Excluir",message:"Confirma a exclusão?.",ok:"Confirmo",cancel:"Cancelo"}).then(function(){r()({method:"delete",url:"https://estagio-back.herokuapp.com//funcionario/"+o,headers:{"content-Type":"application/json",Accept:"application/json"}}).then(function(o){e.$q.notify({color:"positive",message:"Excluido com sucesso"}),e.request()}).catch(function(){e.$q.notify("Erro ao excluir!")})}).catch(function(){e.$q.notify({color:"positive",message:"Exclusão Cancelada..."})})},validapis:function(){this.erropis=!n.a.pis.validate(this.modelo.pis)},validacpf:function(){this.errocpf=!n.a.cpf.validate(this.modelo.cpf)}},beforeMount:function(){this.fetchData(),this.request(),this.departCombobox()}},d=c,p=(t("ixFF"),t("KHd+")),m=Object(p["a"])(d,a,s,!1,null,null,null);e["default"]=m.exports}}]);