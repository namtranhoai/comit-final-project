(this["webpackJsonpcomit-final-project"]=this["webpackJsonpcomit-final-project"]||[]).push([[0],{19:function(e,t,a){e.exports=a(43)},24:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(12),i=a.n(s),l=(a(24),a(13)),r=a(14),o=a(17),d=a(15),m=a(18),u=a(2),h=a.n(u),v=a(16);var f=function(){var e=c.a.useState(""),t=Object(v.a)(e,2);return t[0],t[1],c.a.createElement("div",{className:"loading-container"},c.a.createElement("div",{className:"loading"},"Loading...."))};var E=function(e){return c.a.createElement("header",null,c.a.createElement("input",{className:"searchBox",onChange:e.search,placeholder:"Search ..."}))};var g=function(e){return c.a.createElement("div",{className:"left-categories"},e.categories.map((function(t){return c.a.createElement("div",{className:"category-detail "+(e.catSelectedId===t.id?"active":""),key:t.id,onClick:function(){return e.selectCat(t)}},t.name)})))};var p=function(e){return c.a.createElement("div",{className:"dishes-container"},e.dishes.map((function(t){return c.a.createElement("div",{className:"dish-detail",key:"dish-"+t.id},c.a.createElement("img",{className:"dish-image",src:"https://via.placeholder.com/100"}),c.a.createElement("div",{className:"dish-information"},c.a.createElement("div",null,c.a.createElement("label",{key:t.id},"[",t.id,"]",t.name),c.a.createElement("p",null,t.discription),c.a.createElement("span",{className:"dish-detail-price"},c.a.createElement("i",null,"$"),t.price/100)),c.a.createElement("button",{onClick:function(){return e.selectDish(t)}},"Selected")))})))};var D=function(e){return console.log(e),c.a.createElement("div",{className:"selected-container"},e.selectedDishes.map((function(t){return c.a.createElement("div",{className:"selected-detail",key:"selected-"+t.id},c.a.createElement("div",{className:"selected-information"},c.a.createElement("div",null,c.a.createElement("label",{key:t.id},"[",t.id,"]",t.name)),c.a.createElement("button",{onClick:function(){return e.removeDish(t)}},"Remove")))})))},N=(a(42),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(d.a)(t).call(this,e))).selectCat=function(e){var t=a.state.data.filter((function(t){return t.catid===e.id}));a.setState({catSelected:e,dishes:t})},a.selectDish=function(e){console.log(e);var t=a.state.selectedDishes;t.push(e),a.setState({selectedDishes:t})},a.removeDish=function(e){console.log(e);var t=a.state.selectedDishes.filter((function(t){return t.id!==e.id}));a.setState({selectedDishes:t})},a.search=function(e){var t=e.target.value.toLocaleLowerCase(),n=a.state.data.filter((function(e){return e.name.toLocaleLowerCase().lastIndexOf(t)>-1}));a.setState({dishes:n})},a.state={loading:!1,data:[],categories:[],dishes:[],catSelected:[],selectedDishes:[],favoriesDishes:[]},a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.setState({loading:!0}),h.a.get("./data/menu-cat.json").then((function(t){var a=t.data;e.setState({categories:a,catSelected:a[0]})})).catch((function(e){console.log(e)})),h.a.get("./data/menu1.json").then((function(t){var a=t.data,n=e.state.data.filter((function(t){return t.catid===e.state.catSelected.id}));e.setState({loading:!1,data:a,dishes:n})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return!1===this.state.loading?c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"left-container"},c.a.createElement("h1",null,"Categories"),c.a.createElement(g,{categories:this.state.categories,catSelectedId:this.state.catSelected.id,selectCat:this.selectCat})),c.a.createElement("div",{className:"main-container"},c.a.createElement(E,{search:this.search}),c.a.createElement(p,{dishes:this.state.dishes,selectDish:this.selectDish})),c.a.createElement("div",{className:"right-container"},c.a.createElement(D,{selectedDishes:this.state.selectedDishes,removeDish:this.removeDish}))):c.a.createElement(f,null)}}]),t}(c.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[19,1,2]]]);
//# sourceMappingURL=main.f64c1685.chunk.js.map