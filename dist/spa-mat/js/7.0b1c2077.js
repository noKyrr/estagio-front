(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"4VNs":function(a,o,t){"use strict";t.r(o);var e=function(){var a=this,o=a.$createElement,t=a._self._c||o;return t("div",[t("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"keyboard_arrow_left"},on:{click:function(o){a.opened=!0}}}),t("q-modal",{attrs:{"content-css":{minWidth:"80vw",minHeight:"80vh"}},model:{value:a.opened,callback:function(o){a.opened=o},expression:"opened"}},[t("q-modal-layout",[t("q-toolbar",{attrs:{slot:"header"},slot:"header"},[t("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"keyboard_arrow_left"},on:{click:function(o){a.opened=!1}}}),t("q-toolbar-title",[a._v("\n          Lançamento de Justificativa\n        ")])],1),t("q-toolbar",{attrs:{slot:"footer"},slot:"footer"},[t("div",{staticClass:"row q-pa-lg gutter-sm justify-center wrap"},[t("div",{staticClass:"col-auto inline"},[t("q-btn",{attrs:{color:"secondary",label:"Concluir"},on:{click:a.salvar}})],1),t("div",{staticClass:"col-auto inline"},[t("q-btn",{attrs:{color:"negative",label:"Cancelar"},on:{click:function(o){a.opened=!1}}})],1)])]),t("div",{staticClass:"layout-padding row q-pa-lg gutter-sm"},[t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{helper:"Selecione o funcionário","error-label":"Some error"}},[t("q-select",{attrs:{options:a.funcionarios,disable:0===a.funcionarios.length,filter:"","autofocus-filter":"","float-label":"Funcionários"},model:{value:a.modeloLanc.funcionario,callback:function(o){a.$set(a.modeloLanc,"funcionario",o)},expression:"modeloLanc.funcionario"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{helper:"Selecione a justificativa","error-label":"Some error"}},[t("q-select",{attrs:{options:a.justificativas,disable:0===a.justificativas.length,filter:"","autofocus-filter":"","float-label":"Justificativas"},model:{value:a.modeloLanc.justificativa,callback:function(o){a.$set(a.modeloLanc,"justificativa",o)},expression:"modeloLanc.justificativa"}})],1)],1),t("div",{staticClass:"col-xs-12 col-sm-6 mt-sm"},[t("q-datetime-picker",{staticClass:"fit",attrs:{type:"date"},model:{value:a.modeloLanc.dataOcorrencia,callback:function(o){a.$set(a.modeloLanc,"dataOcorrencia",o)},expression:"modeloLanc.dataOcorrencia"}})],1),t("div",{staticClass:"col-xs-12 col-sm-6 mt-sm"},[t("div",{staticClass:"inline"},[t("q-checkbox",{staticClass:"text-center",attrs:{disable:a.modeloLanc.justificativaParcial||a.modeloLanc.inclusaoManual,label:"Integral"},model:{value:a.modeloLanc.justificativaIntegral,callback:function(o){a.$set(a.modeloLanc,"justificativaIntegral",o)},expression:"modeloLanc.justificativaIntegral"}})],1),t("div",{staticClass:"row gutter-sm wrap"},[t("div",{staticClass:"col-auto inline"},[t("q-checkbox",{staticClass:"text-center",attrs:{disable:a.modeloLanc.justificativaIntegral||a.modeloLanc.inclusaoManual,label:"Parcial"},model:{value:a.modeloLanc.justificativaParcial,callback:function(o){a.$set(a.modeloLanc,"justificativaParcial",o)},expression:"modeloLanc.justificativaParcial"}})],1),t("div",{staticClass:"col-auto inline"},[t("q-field",{staticClass:"inline",attrs:{helper:"Inicio","error-label":"Desabilitado",error:!a.modeloLanc.justificativaParcial},on:{"update:error":function(o){a.$set(!a.modeloLanc,"justificativaParcial",o)}}},[t("q-datetime",{staticStyle:{"font-size":"6sp"},attrs:{disable:!a.modeloLanc.justificativaParcial,type:"time"},model:{value:a.modeloLanc.horaInicio,callback:function(o){a.$set(a.modeloLanc,"horaInicio",o)},expression:"modeloLanc.horaInicio"}})],1)],1),t("div",{staticClass:"col-auto inline"},[t("q-field",{staticClass:"inline",attrs:{helper:"Fim","error-label":"Desabilitado",error:!a.modeloLanc.justificativaParcial},on:{"update:error":function(o){a.$set(!a.modeloLanc,"justificativaParcial",o)}}},[t("q-datetime",{staticStyle:{"font-size":"6sp"},attrs:{disable:!a.modeloLanc.justificativaParcial,type:"time"},model:{value:a.modeloLanc.horaFim,callback:function(o){a.$set(a.modeloLanc,"horaFim",o)},expression:"modeloLanc.horaFim"}})],1)],1)]),t("div",{staticClass:"row gutter-sm wrap mt-sm"},[t("div",{staticClass:"col-auto inline"},[t("q-checkbox",{staticClass:"text-center",attrs:{disable:a.modeloLanc.justificativaIntegral||a.modeloLanc.justificativaParcial,label:"Manual"},model:{value:a.modeloLanc.inclusaoManual,callback:function(o){a.$set(a.modeloLanc,"inclusaoManual",o)},expression:"modeloLanc.inclusaoManual"}})],1),t("div",{staticClass:"col-auto inline"},[t("q-field",{staticClass:"inline",attrs:{helper:"Inicio","error-label":"Desabilitado",error:!a.modeloLanc.inclusaoManual},on:{"update:error":function(o){a.$set(!a.modeloLanc,"inclusaoManual",o)}}},[t("q-datetime",{staticStyle:{"font-size":"6sp"},attrs:{disable:!a.modeloLanc.inclusaoManual,type:"time"},model:{value:a.modeloLanc.inclusaoHorario,callback:function(o){a.$set(a.modeloLanc,"inclusaoHorario",o)},expression:"modeloLanc.inclusaoHorario"}})],1)],1)])]),t("div",{staticClass:"col-xs-12 col-sm-6"},[t("q-field",{attrs:{count:2500,helper:"Observações","error-label":"Some error"}},[t("q-input",{attrs:{"float-label":"Considerações:",maxlength:"2500",type:"textarea"},model:{value:a.modeloLanc.observacoes,callback:function(o){a.$set(a.modeloLanc,"observacoes",o)},expression:"modeloLanc.observacoes"}})],1)],1)])],1)],1)],1)},i=[];e._withStripped=!0;var l=t("vDqi"),s=t.n(l),c={data:function(){return{modeloLanc:{funcionario:"",justificativa:"",dataOcorrencia:"",observacoes:"",horaInicio:"",horaFim:"",justificativaIntegral:!1,justificativaParcial:!1,inclusaoHorario:"",inclusaoManual:!1},funcionarios:[],justificativas:[],opened:!1}},methods:{salvar:function(){var a=this;s()({baseURL:this.modeloLanc.id?"https://estagio-back.herokuapp.com//lancamentojustificativa/"+this.modeloLanc.id:"https://estagio-back.herokuapp.com//lancamentojustificativa",timeout:1e4,method:this.modeloLanc.id?"PUT":"POST",withCredentials:!0,headers:{Accept:"application/json","Content-Type":"application/json"},data:JSON.stringify(this.modeloLanc)}).then(function(o){console.log(o),a.$q.notify({color:"positive",position:"top",message:"Gravado com sucesso",icon:"report_problem"}),a.opened=!1,a.clear()}).catch(function(o){o.response?(console.log(o.response.data),console.log(o.response.status),console.log(o.response.headers)):o.request?console.log(o.request):console.log("Error",o.message),console.log(o.config),a.$q.notify({color:"negative",position:"top",message:"Erro ao gravar",icon:"report_problem"})})},atualizaModel:function(){var a=this;s.a.get("https://estagio-back.herokuapp.com//funcionario").then(function(o){a.funcionarios=[];for(var t=JSON.parse(JSON.stringify(o.data)),e=0;e<t.length;e++){var i=t[e];a.funcionarios.push({label:i.nome,value:i})}}).catch(function(o){a.funcionarios=[{nome:"teste",descricao:"error"}],console.log(o)}),s.a.get("https://estagio-back.herokuapp.com//justificativa").then(function(o){a.justificativas=[];for(var t=JSON.parse(JSON.stringify(o.data)),e=0;e<t.length;e++){var i=t[e];a.justificativas.push({label:i.nome,value:i})}}).catch(function(o){a.justificativa=[{nome:"teste",descricao:"error",text:"error"}],console.log(o)})},clear:function(){this.modeloLanc={funcionario:"",justificativa:"",dataOcorrencia:"",observacoes:"",horaInicio:"",horaFim:"",justificativaIntegral:!1,inclusaoManual:""}}},beforeMount:function(){this.atualizaModel()}},n=c,r=t("KHd+"),u=Object(r["a"])(n,e,i,!1,null,null,null);o["default"]=u.exports}}]);