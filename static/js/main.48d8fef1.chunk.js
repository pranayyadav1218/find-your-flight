(this["webpackJsonpfind-your-flight"]=this["webpackJsonpfind-your-flight"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(9),r=n.n(s),i=(n(14),n(15),n(2)),o=(n(16),n(0));var u=function(e){return Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:Object(o.jsxs)("small",{children:["Select Airport ",Object(o.jsx)("i",{children:"(required)"}),": "]})}),Object(o.jsxs)("select",{className:"InputField",value:e.value,onChange:e.onChange,children:[Object(o.jsx)("option",{value:"-",children:"-"}),e.places.map((function(e,t){return Object(o.jsx)("option",{value:e.PlaceId,children:e.PlaceName},t)}))]})]})},l=n(8),d=n(3),b=n.n(d),j=n(6);function h(e){var t=Object(a.useState)([]),n=Object(i.a)(t,2),c=n[0],s=n[1],r=c;return Object(a.useEffect)((function(){var t={method:"GET",headers:{"x-rapidapi-key":"a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521","x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",useQueryString:!0}};function n(){return(n=Object(j.a)(b.a.mark((function n(){var a;return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?"+new URLSearchParams({query:e}),t);case 2:return a=n.sent,n.next=5,a.json();case 5:a=n.sent,s(a.Places);case 7:case"end":return n.stop()}}),n)})))).apply(this,arguments)}""!==e&&function(){n.apply(this,arguments)}()}),[e]),r}function O(e,t,n,c,s,r){var o=Object(a.useState)([]),u=Object(i.a)(o,2),l=u[0],d=u[1];return Object(a.useEffect)((function(){var a={method:"GET",headers:{"x-rapidapi-key":"a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521","x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"}};function i(){return(i=Object(j.a)(b.a.mark((function i(){var o;return b.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/".concat(r,"/en-US/").concat(t,"/").concat(n,"/").concat(c,"/").concat(s),a).catch((function(e){console.log("ERROR: "+e)}));case 2:return o=i.sent,i.next=5,o.json().then((function(t){switch(e){case"Quotes":d(t.Quotes);break;case"Carriers":d(t.Carriers);break;case"Places":d(t.Places);break;case"Currencies":d(t.Currencies);break;case"OutboundDates":void 0!==t.Dates&&d(t.Dates.OutboundDates);break;case"InboundDates":void 0!==t.Dates&&d(t.Dates.InboundDates)}d((function(e){return e}))}));case 5:case"end":return i.stop()}}),i)})))).apply(this,arguments)}""!==t&&""!==n&&void 0!==t&&void 0!==n&&void 0!==r&&"-"!==t&&"-"!==n&&(10===c.length||"anytime"===c)?function(){i.apply(this,arguments)}():d([])}),[e,t,n,c,s,r]),l}function p(e,t,n,c,s,r){var o=Object(a.useState)([]),u=Object(i.a)(o,2),l=u[0],d=u[1];return Object(a.useEffect)((function(){if(void 0!==e){var a=[];e.forEach((function(e){var s={OutboundCarrier:"",OutboundOrigin:"",OutboundDestination:"",OutboundDepartureDate:"",InboundCarrier:"",InboundOrigin:"",InboundDestination:"",InboundDepartureDate:"",PriceSymbol:"",Price:"",Direct:""};void 0!==t&&t.forEach((function(t){t.CarrierId===e.OutboundLeg.CarrierIds[0]&&(s.OutboundCarrier=t.Name),void 0!==e.InboundLeg&&t.CarrierId===e.InboundLeg.CarrierIds[0]&&(s.InboundCarrier=t.Name)})),void 0!==n&&n.forEach((function(t){t.PlaceId===e.OutboundLeg.OriginId&&(s.OutboundOrigin=t.Name),t.PlaceId===e.OutboundLeg.DestinationId&&(s.OutboundDestination=t.Name),void 0!==e.InboundLeg&&(t.PlaceId===e.InboundLeg.OriginId&&(s.InboundOrigin=t.Name),t.PlaceId===e.InboundLeg.DestinationId&&(s.InboundDestination=t.Name))})),void 0!==e.OutboundLeg&&(s.OutboundDepartureDate=e.OutboundLeg.DepartureDate.substring(0,10),s.Direct=e.Direct?"Yes":"No"),void 0!==e.InboundLeg&&(s.InboundDepartureDate=e.InboundLeg.DepartureDate.substring(0,10)),s.PriceSymbol=void 0!==c&&void 0!==c[0]?1===c[0].Symbol.length?c[0].Symbol:c[0].Symbol+" ":"",s.Price=void 0!==e.MinPrice?e.MinPrice:"",a=a.concat([s]),d(a)})),s||d(function(e,t){return m(e,t?0:1)}(a,s))}}),[e,t,n,c,s,r]),l}function m(e,t){var n=e.length/2;return e.length<2?e:function(e,t,n){for(var a=[];0!==e.length&&0!==t.length;)switch(n){case 0:e[0].Price<t[0].Price?a.push(e.shift()):a.push(t.shift());break;case 1:e[0].Price>t[0].Price?a.push(e.shift()):a.push(t.shift())}return[].concat(a,Object(l.a)(e),Object(l.a)(t))}(m(e.splice(0,n),t),m(e,t),t)}n(19);var f=function(e){var t=Object(a.useState)(""),n=Object(i.a)(t,2),c=n[0],s=n[1],r=Object(a.useState)(!1),l=Object(i.a)(r,2),d=l[0],O=l[1],p=h(c),m=Object(a.useState)(""),f=Object(i.a)(m,2),g=f[0],x=f[1],v=h(g),I=Object(a.useState)(!1),D=Object(i.a)(I,2),y=D[0],N=D[1],S=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){var e={method:"GET",headers:{"x-rapidapi-key":"a80276efe6mshdba99d004ae62b1p11b87cjsn61b6448bc521","x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"}};function t(){return(t=Object(j.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies",e);case 2:return n=t.sent,t.next=5,n.json();case 5:n=t.sent,c(n.Currencies);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),n}(),C=(new Date).toISOString().substring(0,10);return Object(o.jsxs)("div",{className:"FlightInfoForm",children:[Object(o.jsx)("big",{children:"Search for Flights:"}),Object(o.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(o.jsxs)("div",{className:"InputArea",children:[Object(o.jsxs)("label",{children:["From: ",Object(o.jsx)("input",{className:"InputField",value:c,onChange:function(e){e.preventDefault(),s(e.target.value),""!==e.target.value?O(!0):O(!1)}})]}),d?Object(o.jsx)(u,{places:p,value:e.origin,onChange:function(t){e.setOrigin(t.target.value)}}):Object(o.jsx)(o.Fragment,{})]}),Object(o.jsx)("div",{className:"InputArea",children:Object(o.jsxs)("label",{children:["To: ",Object(o.jsx)("input",{className:"InputField",value:g,onChange:function(e){e.preventDefault(),x(e.target.value),""!==e.target.value?N(!0):N(!1)}}),y?Object(o.jsx)(u,{places:v,value:e.destination,onChange:function(t){e.setDestination(t.target.value)}}):Object(o.jsx)(o.Fragment,{})]})}),Object(o.jsx)("div",{className:"InputArea",children:Object(o.jsxs)("label",{children:["Departure Date ",Object(o.jsx)("small",{children:Object(o.jsx)("i",{children:"(optional)"})}),": ",Object(o.jsx)("input",{className:"InputField",type:"date",value:e.outboundDate,min:C,max:e.inboundDate,onChange:function(t){""!==t.target.value?e.setOutboundDate(t.target.value):e.setOutboundDate("anytime")}})]})}),Object(o.jsx)("div",{className:"InputArea",children:Object(o.jsxs)("label",{children:["Return Date ",Object(o.jsx)("small",{children:Object(o.jsx)("i",{children:"(optional)"})}),": ",Object(o.jsx)("input",{className:"InputField",type:"date",value:e.inboundDate,min:e.outboundDate,onChange:function(t){e.setInboundDate(t.target.value)}})]})}),Object(o.jsxs)("div",{className:"InputArea",children:[Object(o.jsx)("label",{children:"Currency: "}),Object(o.jsxs)("select",{className:"InputField",value:e.currency,onChange:function(t){e.setCurrency(t.target.value)},style:{width:"80px",maxWidth:"50%"},children:[Object(o.jsx)("option",{children:"USD"}),void 0!==S?S.map((function(e){return Object(o.jsx)("option",{value:e.Code,children:e.Code},e.Code)})):Object(o.jsx)(o.Fragment,{})]})]})]}),Object(o.jsx)("button",{className:"ClearButton",onClick:function(t){t.preventDefault(),s(""),x(""),O(!1),N(!1),e.setOrigin(""),e.setDestination(""),e.setOutboundDate("anytime"),e.setInboundDate(""),e.setCurrency("USD")},children:"Clear"})]})};n(20);var g=function(e){var t=Object(a.useState)(!1),n=Object(i.a)(t,2),c=n[0],s=n[1];return Object(a.useEffect)((function(){s(!1),e.allFlights.forEach((function(e){""!==e.InboundCarrier&&s(!0)}))}),[e.allFlights]),Object(o.jsx)("div",{children:void 0!==e.allFlights?Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("table",{className:"FlightTable",children:[Object(o.jsx)("thead",{children:Object(o.jsxs)("tr",{className:"TableHead",children:[Object(o.jsx)("th",{className:"RowItem",children:"Outbound Flight"}),Object(o.jsx)("th",{className:"RowItem",children:"From"}),Object(o.jsx)("th",{className:"RowItem",children:"To"}),Object(o.jsx)("th",{className:"RowItem",children:"Departure Date"}),c?Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("th",{className:"RowItem",children:"Return Flight"}),Object(o.jsx)("th",{className:"RowItem",children:"From"}),Object(o.jsx)("th",{className:"RowItem",children:"To"}),Object(o.jsx)("th",{className:"RowItem",children:"Departure Date"})]}):Object(o.jsx)(o.Fragment,{}),Object(o.jsx)("th",{className:"RowItem",children:"Direct Flight?"}),Object(o.jsxs)("th",{className:"RowItem",children:[Object(o.jsx)("label",{children:"Price "}),Object(o.jsxs)("select",{className:"sortButton",onChange:e.handleSortSelect,children:[Object(o.jsx)("option",{value:"true",children:"Low to High"}),Object(o.jsx)("option",{value:"false",children:"High to Low"})]})]})]})}),Object(o.jsx)("tbody",{children:e.allFlights.map((function(t,n){var a="TableRow";return e.sortLowToHigh&&0===n?a="CheapestRow":e.sortLowToHigh||n!==e.allFlights.length-1||(a="CheapestRow"),Object(o.jsxs)("tr",{className:a,children:[Object(o.jsx)("td",{className:"RowItem",children:t.OutboundCarrier}),Object(o.jsx)("td",{className:"RowItem",children:t.OutboundOrigin}),Object(o.jsx)("td",{className:"RowItem",children:t.OutboundDestination}),Object(o.jsx)("td",{className:"RowItem",children:t.OutboundDepartureDate}),c?Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("td",{className:"RowItem",children:t.InboundCarrier}),Object(o.jsx)("td",{className:"RowItem",children:t.InboundOrigin}),Object(o.jsx)("td",{className:"RowItem",children:t.InboundDestination}),Object(o.jsx)("td",{className:"RowItem",children:t.InboundDepartureDate})]}):Object(o.jsx)(o.Fragment,{}),Object(o.jsx)("td",{className:"RowItem",children:t.Direct}),Object(o.jsx)("td",{className:"RowItem",children:t.PriceSymbol+""+t.Price})]},n)}))})]})}):Object(o.jsx)("p",{children:"No Flights Available"})})};var x=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(""),r=Object(i.a)(s,2),u=r[0],l=r[1],d=Object(a.useState)("anytime"),b=Object(i.a)(d,2),j=b[0],h=b[1],m=Object(a.useState)(""),x=Object(i.a)(m,2),v=x[0],I=x[1],D=Object(a.useState)("USD"),y=Object(i.a)(D,2),N=y[0],S=y[1],C=Object(a.useState)(!1),w=Object(i.a)(C,2),F=w[0],k=w[1],R=Object(a.useState)(!0),P=Object(i.a)(R,2),L=P[0],E=P[1],T=O("Quotes",n,u,j,v,N),A=O("Carriers",n,u,j,v,N),U=O("Places",n,u,j,v,N),H=O("Currencies",n,u,j,v,N),B=p(T,A,U,H,L,N);return Object(a.useEffect)((function(){T===[]||void 0===T||0===T.length?k(!1):k(!0)}),[T]),Object(o.jsxs)("div",{children:[Object(o.jsx)(f,{origin:n,setOrigin:c,destination:u,setDestination:l,outboundDate:j,setOutboundDate:h,inboundDate:v,setInboundDate:I,currency:N,setCurrency:S,onSubmit:function(e){e.preventDefault();var t=T!==[]&&void 0!==T&&A!==[]&&void 0!==A&&U!==[]&&void 0!==U&&0!==T.length;k(t)}}),F?Object(o.jsx)(g,{allFlights:B,sortLowToHigh:L,handleSortSelect:function(e){"true"===e.target.value?E(!0):"false"===e.target.value&&E(!1)}}):Object(o.jsx)(o.Fragment,{}),n.length>1&&u.length>1&&!F?Object(o.jsx)("p",{children:"No Flights Available"}):Object(o.jsx)(o.Fragment,{})]})};var v=function(){return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)("div",{className:"App-header",children:Object(o.jsxs)("p",{children:["Find ",Object(o.jsx)("i",{children:"your"})," Flight!"]})}),Object(o.jsx)("div",{className:"App-body",children:Object(o.jsx)(x,{})}),Object(o.jsx)("div",{className:"App-footer",children:Object(o.jsxs)("p",{children:[Object(o.jsx)("a",{href:"https://github.com/pyadav1218/",children:"Pranay Yadav"})," | ",Object(o.jsx)("a",{href:"https://reactjs.org/",children:"ReactJS"}),", ",Object(o.jsx)("a",{href:"https://rapidapi.com/skyscanner/api/skyscanner-flight-search",children:"Skyscanner API"})," | March 2021"]})})]})},I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};r.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(v,{})}),document.getElementById("root")),I()}],[[21,1,2]]]);
//# sourceMappingURL=main.48d8fef1.chunk.js.map