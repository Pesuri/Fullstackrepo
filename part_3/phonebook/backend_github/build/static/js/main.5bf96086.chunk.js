(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(14),c=t.n(r),a=t(3),o=t(1),u=t(0),i=function(e){var n=e.persons,t=e.showAll,r=e.newFilter,c=e.del,a=t?n:n.filter((function(e){return e.name.includes(r)}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Numbers"}),a.map((function(e){return Object(u.jsxs)("div",{children:[e.name," ",e.number,Object(u.jsx)("button",{onClick:function(){return c(e.id,e.name)},children:"delete"})]},e.id)}))]})},l=function(e){var n=e.handleSubmit,t=e.newName,r=e.newNumber,c=e.handleChange;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"add a new"}),"name:",Object(u.jsx)("input",{name:"name",value:t,onChange:c}),Object(u.jsx)("br",{}),"number:",Object(u.jsx)("input",{name:"number",value:r,onChange:c})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){var n=e.newFilter,t=e.handleChange;return Object(u.jsxs)("div",{children:["filter shown with",Object(u.jsx)("input",{name:"filter",value:n,onChange:t})]})},d=t(4),f=t.n(d),b="/api/persons",m={getAll:function(){return f.a.get(b).then((function(e){return e.data}))},create:function(e){return f.a.post(b,e).then((function(e){return e.data}))},update:function(e,n){return f.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},delet:function(e){return f.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))}},j=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)(""),d=Object(a.a)(c,2),f=d[0],b=d[1],j=Object(o.useState)(""),h=Object(a.a)(j,2),O=h[0],v=h[1],g=Object(o.useState)(""),p=Object(a.a)(g,2),x=p[0],w=p[1],S=Object(o.useState)(!0),C=Object(a.a)(S,2),k=C[0],y=C[1],N=Object(o.useState)(null),A=Object(a.a)(N,2),T=A[0],F=A[1],I=Object(o.useState)(!1),D=Object(a.a)(I,2),E=D[0],J=D[1],B=3e3;Object(o.useEffect)((function(){m.getAll().then((function(e){r(e)}))}),[]);var M=function(){var e=t.map((function(e){return e.id+1}));return Math.max(e)+1},P=function(e){var n=e.message,t=(e.error,{color:"green"});return null===n?null:(E&&(t={color:"red"}),console.log(E),Object(u.jsx)("div",{className:"notification",style:t,children:n}))},q=function(e){"name"===e.target.name?b(e.target.value):"number"===e.target.name?v(e.target.value):"filter"===e.target.name&&(w(e.target.value),e.target.value.length>0?y(!1):y(!0))};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(P,{message:T}),Object(u.jsx)(s,{newFilter:x,handleChange:q}),Object(u.jsx)(l,{handleSubmit:function(e){e.preventDefault();var n={name:f,number:O,id:M()};console.log(M());var c=t.filter((function(e){return e.name===n.name}));c.length>0?window.confirm("".concat(f," is already added to phonebook, replace old number with a new one?"))&&m.update(c[0].id,n).then((function(e){r(t.map((function(n){return n.id!==c[0].id?n:e}))),b(""),v(""),F("Changed number for ".concat(n.name)),setTimeout((function(){F(null)}),B)})).catch((function(e){F("Information of ".concat(n.name," has already been removed from server")),J(!0),r(t.filter((function(e){return e.id!==c[0].id}))),setTimeout((function(){F(null),J(!1)}),B)})):m.create(n).then((function(e){r(t.concat(e)),b(""),v(""),F("Added ".concat(n.name)),setTimeout((function(){F(null)}),B)})).catch((function(e){console.log(e.response.data)}))},newName:f,newNumber:O,handleChange:q}),Object(u.jsx)(i,{persons:t,showAll:k,newFilter:x,del:function(e,n){window.confirm("Delete ".concat(n,"?"))&&m.delet(e).then((function(c){r(t.filter((function(n){return n.id!==e}))),F("Information of ".concat(n," was removed from server")),setTimeout((function(){F(null)}),B)})).catch((function(c){F("Information of ".concat(n," has already been removed from server")),J(!0),r(t.filter((function(n){return n.id!==e}))),setTimeout((function(){F(null),J(!1)}),B)}))}})]})};t(38);c.a.render(Object(u.jsx)(j,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.5bf96086.chunk.js.map