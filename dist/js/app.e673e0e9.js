(function(t){function e(e){for(var n,a,o=e[0],l=e[1],c=e[2],d=0,p=[];d<o.length;d++)a=o[d],s[a]&&p.push(s[a][0]),s[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,c||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],n=!0,o=1;o<i.length;o++){var l=i[o];0!==s[l]&&(n=!1)}n&&(r.splice(e--,1),t=a(a.s=i[0]))}return t}var n={},s={app:0},r=[];function a(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=n,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(i,n,function(e){return t[e]}.bind(null,n));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;r.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"20bd":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("0fb7"),i("450d");var n=i("f529"),s=i.n(n),r=(i("560b"),i("dcdc")),a=i.n(r),o=(i("be4f"),i("896a")),l=i.n(o),c=(i("1951"),i("eedf")),u=i.n(c),d=(i("10cb"),i("f3ad")),p=i.n(d),f=(i("cadf"),i("551c"),i("f751"),i("097d"),i("2b0e")),g=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:t.loading,expression:"loading",modifiers:{fullscreen:!0}}],attrs:{id:"app","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(111, 111, 111, 0.2)"}},[i("div",{staticClass:"nav"}),i("section",{staticClass:"main-content"},[i("el-input",{staticClass:"search-input",class:t.list.length||t.list2.length?"":"no-content",attrs:{size:"mini",placeholder:"请输入url地址，暂时只支持youtube页面"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.commitLink(e)}},model:{value:t.videoUrl,callback:function(e){t.videoUrl=e},expression:"videoUrl"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.commitLink},slot:"append"})],1),t.list.length||t.list2.length?i("div",{staticClass:"image-and-video"},[i("div",{staticClass:"image-section"},[i("div",{staticClass:"unselected-image"},[i("p",{staticClass:"section-title"},[t._v("\n            视频片段：\n            "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.list.length,expression:"list.length"}],attrs:{size:"mini"},on:{click:t.selectAll}},[i("i",{staticClass:"el-icon-circle-plus"}),t._v(" 全选\n            ")])],1),i("draggable",t._b({staticClass:"list-group",attrs:{tag:"ul",move:t.onMove},on:{start:function(e){t.isDragging=!0},end:function(e){t.isDragging=!1}},model:{value:t.list,callback:function(e){t.list=e},expression:"list"}},"draggable",t.dragOptions,!1),[i("transition-group",{attrs:{type:"transition",name:"flip-list"}},t._l(t.list,function(e,n){return i("li",{key:n,staticClass:"list-group-item",class:e.url===t.currentPlay?"playing":"",style:{backgroundImage:"url("+e.cover+")"}},[i("i",{staticClass:"el-icon-caret-right",on:{click:function(i){return i.stopPropagation(),t.playVideo(e.url)}}})])}),0)],1)],1),i("div",{staticClass:"selected-image"},[i("p",{staticClass:"section-title"},[t._v("已选择：")]),i("draggable",t._b({staticClass:"list-group",attrs:{tag:"ul",move:t.onMove},on:{start:t.dragStart,end:function(e){t.isDragging=!1}},model:{value:t.list2,callback:function(e){t.list2=e},expression:"list2"}},"draggable",t.dragOptions,!1),[i("transition-group",{attrs:{type:"transition",name:"flip-list"}},t._l(t.list2,function(e,n){return i("li",{key:n,staticClass:"list-group-item",class:e.url===t.currentPlay?"playing":"",style:{backgroundImage:"url("+e.cover+")"}},[i("i",{staticClass:"el-icon-caret-right",on:{click:function(i){return i.stopPropagation(),t.playVideo(e.url)}}}),i("i",{staticClass:"el-icon-circle-close",on:{click:function(e){return e.stopPropagation(),t.removeVideo(n)}}})])}),0)],1)],1),i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.list2.length,expression:"list2.length"}],staticClass:"download-btn",attrs:{type:"primary",size:"mini"},on:{click:t.mergeVideo}},[t._v("合成视频")]),i("el-checkbox",{directives:[{name:"show",rawName:"v-show",value:t.list2.length,expression:"list2.length"}],staticClass:"watermark-checkbox",model:{value:t.watermark.show,callback:function(e){t.$set(t.watermark,"show",e)},expression:"watermark.show"}},[t._v("水印遮盖")])],1),i("div",{staticClass:"video-play"},[i("video",{directives:[{name:"show",rawName:"v-show",value:t.currentPlay,expression:"currentPlay"}],staticClass:"video-section",attrs:{src:t.currentPlay,controls:"",autoplay:""}}),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.currentPlay,expression:"!currentPlay"}],staticClass:"video-section no-video"},[t._v("请从左侧选择需要播放的视频片段")]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.watermark.show,expression:"watermark.show"}],staticClass:"video-watermark"},[i("div",{staticClass:"water-mark-filter",style:t.watermarkStyle,on:{mousedown:function(e){return t.setMoveWatermark(e,"move")},mouseup:function(e){return t.setMoveWatermark(e,!1)}}},[i("i",{staticClass:"resize-btn",on:{mousedown:function(e){return e.stopPropagation(),function(e){return t.setMoveWatermark(e,"resize")}(e)},mouseup:function(e){return t.setMoveWatermark(e,!1)}}})])]),i("p",{directives:[{name:"show",rawName:"v-show",value:t.downloadList.length,expression:"downloadList.length"}],staticClass:"section-title",staticStyle:{margin:"10px 0"}},[t._v("任务队列：")]),i("ul",t._l(t.downloadList,function(e,n){return i("li",{key:e.url,staticClass:"download-link",class:"download-status-"+e.status+" "+(e.url===t.currentPlay?"playing":"")},[t._v("\n            视频 "+t._s(n+1)+" - ( "+t._s(t.videoStatus[e.status]||"-")+" )\n            "),i("i",{staticClass:"el-icon-download",on:{click:function(i){return t.downloadLink(e.url)}}}),i("i",{staticClass:"el-icon-caret-right",on:{click:function(i){return t.playVideo(e.url)}}})])}),0)])]):t._e(),i("a",{attrs:{href:"",download:"download",id:"download-video",target:"_blank"}},[t._v("download")])],1)])},h=[],m=(i("7514"),i("6b54"),i("cebc")),v=(i("d263"),i("20d6"),i("6762"),i("2fdb"),i("75fc")),w=i("1980"),y=i.n(w),k=i("795b"),b=i.n(k),C=i("bc3a"),x=i.n(C);x.a.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8";var _=function(t){var e=t.url,i=t.method,n=void 0===i?"post":i,s=t.data,r=void 0===s?null:s,a=new b.a(function(t,i){x()({method:n,url:"http://47.99.169.90:9663"+e,data:r}).then(function(e){var n=e.data,s=n.code,r=n.msg;return 200!==s?i(new Error("请求失败")):t(r||{})}).catch(function(t){console.error("request error: %s",t),i(t)})});return a},O=_,P={name:"app",components:{Draggable:y.a},data:function(){return{loading:!1,videoUrl:"",currentPlay:"",isDragging:!1,list:[],listCache:[],list2:[],dragOptions:{animation:0,group:"description",disabled:!1,ghostClass:"ghost"},message:"",transitionId:"",downloadList:[],videoStatus:{splicing:"合成中...",success:"合成成功",fail:"合成失败"},moveWatermark:!1,currentCursor:{x:0,y:0},watermark:{show:!1,size:{width:80,height:28},position:{top:20,left:20},videoSize:{width:600,height:338}}}},watch:{list2:{handler:function(t){this.list=Object(v["a"])(this.listCache)},deep:!0}},computed:{watermarkStyle:function(){var t=this.watermark,e=t.size,i=e.width,n=e.height,s=t.position,r=s.top,a=s.left;return{width:i+"px",height:n+"px",lineHeight:n-2+"px",top:r+"px",left:a+"px"}}},methods:{commitLink:function(){var t=this;return!!this.videoUrl&&(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(this.videoUrl)?(this.currentPlay="",this.loading=!0,void O({url:"/transitions",data:{url:this.videoUrl}}).then(function(e){t.transitionId=e.id,t.list=[],t.listCache=[],t.getTransitionStatus()}).catch(function(e){console.error(e),t.loading=!1})):(this.$message.error("错误的url格式"),!1))},getTransitionStatus:function(){var t=this,e=this.transitionId;O({url:"/transitions/slice?id=".concat(e),method:"get"}).then(function(e){var i=e.status,n=e.slices,s=void 0===n?[]:n;if(["processing","finished","failed"].includes(i)){var r,a,o=t.list.length?t.list[t.list.length-1].id:null,l=o&&s.length?s.findIndex(function(t){return t.id===o}):-1;(r=t.list).push.apply(r,Object(v["a"])(s.slice(l+1))),(a=t.listCache).push.apply(a,Object(v["a"])(s.slice(l+1)))}return"finished"===e.status?(t.message&&t.message.close()&&(t.message=null),t.loading=!1,!0):"failed"===e.status?(t.message&&t.message.close()&&(t.message=null),t.$message.error("视频切片失败，请稍后再试..."),t.loading=!1,!1):(t.message||(t.message=t.$message({message:"视频切片中，大概需要花费与视频时长相同时间...",type:"info",duration:6e6})),void setTimeout(function(){t.getTransitionStatus()},5e3))}).catch(function(e){t.message&&t.message.close()&&(t.message=null),t.$message.error("视频切片失败，请稍后再试..."),console.error(e)})},selectAll:function(){var t;(t=this.list2).push.apply(t,Object(v["a"])(this.list))},onMove:function(t){var e=t.relatedContext,i=t.draggedContext,n=e.element,s=i.element;return(!n||!n.fixed)&&!s.fixed},dragStart:function(t,e){this.isDragging=!0},playVideo:function(t){this.currentPlay=t},removeVideo:function(t){this.list2.splice(t,1)},setMoveWatermark:function(t,e){this.moveWatermark=e,this.currentCursor={x:t.screenX,y:t.screenY}},movingWatermark:function(t){if(!this.moveWatermark)return!1;var e=this.watermark,i=this.currentCursor,n=this.moveWatermark;if("move"===n){var s=e.position.left-(i.x-t.screenX),r=e.position.top-(i.y-t.screenY);s<0&&(s=0),r<0&&(r=0),s+e.size.width>600&&(s=600-e.size.width),r+e.size.height>338&&(r=338-e.size.height),this.watermark=Object(m["a"])({},e,{position:{left:s,top:r}})}else if("resize"===n){var a=e.size.width-(i.x-t.screenX),o=e.size.height-(i.y-t.screenY);a<20&&(a=20),o<20&&(o=20),a+e.position.left>600&&(a=600-e.position.left),o+e.position.top>338&&(o=338-e.position.top),this.watermark=Object(m["a"])({},e,{size:{width:a,height:o}})}this.currentCursor={x:t.screenX,y:t.screenY}},mergeVideo:function(){var t=this,e=this.list2.map(function(t){return t.id}).filter(function(t){return t}),i=e.toString();if(!e.length)return this.$message.error("没有找到已选择的片段id，请重新选择");if(this.downloadList.some(function(t){return t.videos===i}))return this.$message.error("该合成任务已在队列中，请勿重复提交");this.downloadList.push({videos:i,status:"splicing",url:""});var n={videos:this.list2.map(function(t){return t.id}).filter(function(t){return t}),watermark:this.watermark};O({url:"/concat",data:n}).then(function(e){var n=t.downloadList.find(function(t){return t.videos===i});if(!n)return t.$message.error("合成视频失败");n.url=e.url,n.status="success",t.$forceUpdate(),t.$message.success("合成视频成功")}).catch(function(e){var n=t.downloadList.find(function(t){return t.videos===i});if(!n)return t.$message.error("合成视频失败");n.status="fail",t.$message.error("合成视频失败"),t.$forceUpdate()})},downloadLink:function(t){var e=document.querySelector("#download-video");e.setAttribute("href",t),e.click()}},mounted:function(){var t=this;document.body.addEventListener("mousemove",function(e){t.movingWatermark(e)}),document.body.addEventListener("mouseup",function(){t.moveWatermark=!1})}},$=P,z=(i("7c55"),i("2877")),S=Object(z["a"])($,g,h,!1,null,null,null),j=S.exports;i("20bd");f["default"].use(p.a),f["default"].use(u.a),f["default"].use(l.a),f["default"].use(a.a),f["default"].prototype.$message=s.a,f["default"].config.productionTip=!1,new f["default"]({render:function(t){return t(j)}}).$mount("#app")},"5c48":function(t,e,i){},"7c55":function(t,e,i){"use strict";var n=i("5c48"),s=i.n(n);s.a}});
//# sourceMappingURL=app.e673e0e9.js.map