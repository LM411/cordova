var $$=Dom7,theme="auto";document.location.search.indexOf("theme=")>=0&&(theme=document.location.search.split("theme=")[1].split("&")[0]);var app=new Framework7({id:"io.framework7.testapp",root:"#app",theme:theme,data:function(){return{user:{firstName:"John",lastName:"Doe"}}},methods:{helloWorld:function(){app.dialog.alert("Hello World!")}},routes:routes,vi:{placementId:"pltd4o7ibb9rc653x14"}});$$(document).on("page:init",'.page[data-name="scholarships"]',function(e){getPosts("scholarships","175")}),$$(document).on("page:init",'.page[data-name="jobs"]',function(e){getPosts("Jobs","142")}),$$(document).on("page:init",'.page[data-name="tenders"]',function(e){getPosts("tenders","149")}),$$(document).on("page:init",'.page[data-name="blogs"]',function(e){getPosts("blogs","307")});var calendarModal=app.calendar.create({inputEl:"#demo-calendar-modal",openIn:"customModal",header:!0,footer:!0,dateFormat:"m/d/yyyy",on:{calendarDayClick:function(e,o,a,t,n){var i=Number(t)+1+"/"+n+"/"+a;console.log(i),app.dialog.prompt("Please Enter Post title below",'Setting a Reminder on <span class="greenl">'+i+"</span>",function(e){setReminder(e,i)})}}});function getData(){var e=app.formGetData("userprofile-form");if(e){var o=JSON.stringify(e),a=JSON.parse(o);alert(a.profession)}else alert("There is no stored data for this form yet. Try to change any field")}function loadURL(e){return navigator.app.loadUrl(e,{openExternal:!0}),!1}var getUrlParameter=function(e){var o,a,t=decodeURIComponent(window.location.search.substring(1)).split("&");for(a=0;a<t.length;a++)if((o=t[a].split("="))[0]===e)return void 0===o[1]||o[1]};function fDate(){$(".ks-facebook-date").text(function(){return $(this).text().replace("T"," ")})}var dynamicPageIndex=0;function createContentPage(){mainView.router.loadContent('\x3c!-- Top Navbar--\x3e<div class="navbar">  <div class="navbar-inner">    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>    <div class="center sliding">Dynamic Page '+ ++dynamicPageIndex+'</div>  </div></div><div class="pages">  \x3c!-- Page, data-page contains page name--\x3e  <div data-page="dynamic-pages" class="page">    \x3c!-- Scrollable page content--\x3e    <div class="page-content">      <div class="content-block">        <div class="content-block-inner">          <p>Here is a dynamic page created on '+new Date+' !</p>          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>        </div>      </div>    </div>  </div></div>')}var rootURL="https://www.selibeng.com/wp-json/wp/v2";function getPosts(e,o){var a=rootURL+"/posts";"allPosts"!=e&&(a=a+"?categories="+o,console.log(a)),$.ajax({type:"GET",url:a,success:function(o){$$(".content-block-main").empty(),$.each(o,function(t,n){$$(".content-block-main").append('<div class="card ks-facebook-card"><div class="card-header"><div class="ks-facebook-avatar"><i class="catIcon'+n.id+'"></i></div><div class="ks-facebook-name"><span class="postType'+n.id+'"></span></div><div class="ks-facebook-date">'+n.date+'</div></div><div class="card-content"><p style="margin-left:5px">'+n.title.rendered+'</p></div><div class="card-footer"><a  href="whatsapp://send?text='+n.link+'" class="button item-link external"><img src="img/whatsapp_share.png" height="20px" style="margin-top:8px;"></a><a  href="#" data-bookmark="'+n.id+'" class="button item-link external post-bookmark-modal"><i class="f7-icons padtop">bookmark</i></a><a  href="#" data-popup=".popup-post" data-post="'+n.id+'" class="button popup-open view-post-btn">View</a></div><div class="item-inner"><div class="item-title"></div>'),fDate(),singlePosts(),postBookMark(),console.log(a),"allPosts"==e&&app.form.storeFormData("spane-app-offline-data",o),iconCategories(n.categories,n.id),titleCategories(n.categories,n.id)})},complete:function(){$("#loader-spinner").hide()},error:function(e){app.notification.create({title:"Network Problem",closeIcon:!0,closeOnClick:!0,closeButton:!0,text:"Your network seems to have a problem loading new content",closeTimeout:3e3}).open()}})}function singlePosts(){$$(".view-post-btn").off("click").on("click",function(){var e=$(this).attr("data-post");console.log(e),null!=e&&$.ajax({url:rootURL+"/posts/"+e,success:function(e){$$(".block-popup-content").empty(),$$(".block-popup-content").append('<div class="card ks-facebook-card"><div class="card-header"><div class="ks-facebook-avatar"><i class="f7-icons">bookmark</i></div><div class="ks-facebook-name">'+e.title.rendered+'</div><div class="ks-facebook-date">'+e.date+'</div></div><div class="card-content"><div class="card-content-inner"><p>'+e.content.rendered+'</p><p class="buttons-row"><a href="'+e.link+'" id="read" class="button button-raised button-fill color-teal item-link external" style="font-weight:bold;">Read More</a><br/><a  href="whatsapp://send?text='+e.link+'" style="text-align:center;font-weight:bold;" class="button button-raised button-fill color-teal item-link external">Share Post</a></p></div></div><div class="item-inner"><div class="item-title"></div>'),fDate()},complete:function(){$("#loader-spinner").hide()},error:function(e){$$(".post-content-block").append('<div class="item-content"><div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>'),console.log(e)}})})}getPosts("allPosts","0"),jQuery.expr[":"].contains=function(e,o,a){return jQuery(e).text().toUpperCase().indexOf(a[3].toUpperCase())>=0};var search_txt=$("#search-input").val();$("#search-input").keyup(function(){$(".card").hide();var e=$("#search-input").val();$('.card:contains("'+e+'")').show(),0===$('.card:contains("'+e+'")').length&&app.notification.create({title:"Results - Tap to Remove",closeIcon:!0,closeOnClick:!0,closeButton:!0,text:"No Results Found for your Search",closeTimeout:3e3}).open()});var updateVersion=0,currentVersion=2.0,updateURL="http://spaneapp.com";function getOfflineData(){var e=app.form.getFormData("spane-app-offline-data");null!=e&&($$("#content-block-main").empty(),$.each(e,function(o,a){$$("#content-block-main").append('<div class="card ks-facebook-card"><div class="card-header"><div class="ks-facebook-avatar"><i class="catIcon'+a.id+'"></i></div><div class="ks-facebook-name"><span class="postType'+a.id+'"></span></div><div class="ks-facebook-date">'+a.date+'</div></div><div class="card-content"><i class="blogPicture"></i><p style="margin-left:5px">'+a.title.rendered+'</p></div><div class="card-footer"><a  href="whatsapp://send?text='+a.link+'" class="button item-link external"><img src="img/whatsapp_share.png" height="20px" style="margin-top:8px;"></a><a  href="#" data-bookmark="'+a.id+'" class="button item-link external post-bookmark-modal" data-index="'+e.indexOf(a)+'" ><i class="f7-icons padtop">bookmark</i></a><a  href="#" data-popup=".popup-post" data-post="'+a.id+'"  data-index="'+e.indexOf(a)+'" class="button popup-open view-post-btn">View</a></div><div class="item-inner"><div class="item-title"></div>'),$("#read").click(function(){app.notification.create({title:"Content Explorer",titleRightText:"Selibeng.com",text:"Loading More Information",closeOnClick:!0,closeTimeout:5e3}).open()}),iconCategories(a.categories,a.id),titleCategories(a.categories,a.id),fDate(),$("#loader-spinner").hide(),getOfflinePost(e,"spane-app-offline-data"),postBookMarkOffline()}))}function getBookmarks(){var e=app.form.getFormData("spane-app-dev-Bookmarks");null!=e?($$("#bookmarks-block-main").empty(),$.each(e,function(o,a){$$("#bookmarks-block-main").append('<div class="card ks-facebook-card"><div class="card-header"><div class="ks-facebook-avatar"><i class="fa fa-bookmark fa-2x" style="color:#008e96;"></i></div><div class="ks-facebook-name"><span class="postType'+a.id+'">Bookmark</span></div><div class="ks-facebook-date">'+a.date+'</div></div><div class="card-content"><div class="card-content-inner"><p>'+a.title.rendered+'</p></div></div><div class="card-footer"><a  href="whatsapp://send?text='+a.link+'" class="button item-link external"><img src="img/whatsapp_share.png" height="20px" style="margin-top:8px;"></a><a  href="#" id="bookmark-modal" class="button item-link external bookmark-modal" data-index="'+e.indexOf(a)+'"><i class="fa fa-trash fa-2x" style="padding-top:5px;"></i></a><a  href="#" data-popup=".popup-post" data-post="'+a.id+'" data-index="'+e.indexOf(a)+'" class="button popup-open view-post-btn">View</a></div><div class="item-inner"><div class="item-title"></div></div>'),fDate(),removeBookmarks(e),$$("#bk-content").on("click",function(){$("#more-content").hide()}),getOfflinePost(e,"spane-app-dev-Bookmarks")})):($$("#bookmarks-block-main").empty(),$$("#bookmarks-block-main").append('<center><img style="width:80%;margin-top:30%;" src="img/nobookmarks.png"/></center>'))}function postBookMark(){$$(".post-bookmark-modal").off("click").on("click",function(){var e=$(this).attr("data-bookmark");console.log(e),$.ajax({url:rootURL+"/posts/"+e,success:function(e){var o={id:e.id,date:e.date,title:{rendered:e.title.rendered},content:{rendered:e.content.rendered}},a=app.form.getFormData("spane-app-dev-Bookmarks");if(null==a)app.form.storeFormData("spane-app-dev-Bookmarks",[o]);else{var t=a;t.push(o),app.form.storeFormData("spane-app-dev-Bookmarks",t)}app.notification.create({title:"Your Post has been Bookmarked",closeIcon:!0,closeOnClick:!0,closeButton:!0,text:e.title.rendered,closeTimeout:3e3}).open()},complete:function(){$("#loader-spinner").hide()},error:function(e){$$(".post-content-block").append('<div class="item-content"><div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>'),console.log(e)}})})}function postBookMarkOffline(){$$(".post-bookmark-modal").off("click").on("click",function(){var e=$$(this).attr("data-index");console.log(e),offlineData=app.form.getFormData("spane-app-offline-data");var o=offlineData[e],a={id:o.id,date:o.date,title:{rendered:o.title.rendered},content:{rendered:o.content.rendered}},t=app.form.getFormData("spane-app-dev-Bookmarks");if(null==t)app.form.storeFormData("spane-app-dev-Bookmarks",[a]);else{var n=t;n.push(o),app.form.storeFormData("spane-app-dev-Bookmarks",n)}app.notification.create({title:"Your Post has been Bookmarked",closeIcon:!0,closeOnClick:!0,closeButton:!0,text:o.title.rendered,closeTimeout:3e3}).open()})}function clearModal(){$$(".popup-close").on("click",function(){$$("#block-popup-content").empty(),$$("#block-popup-content").append('<div id="loader-spinner"><center><img src="img/spinner_posts.gif" style="display: block;margin:30% auto;" height="60%" width="60%"></center></div>')})}function checkConnection(){var e=navigator.connection.type,o={};o[Connection.UNKNOWN]="Unknown connection",o[Connection.ETHERNET]="Ethernet connection",o[Connection.WIFI]="WiFi connection",o[Connection.CELL_2G]="Cell 2G connection",o[Connection.CELL_3G]="Cell 3G connection",o[Connection.CELL_4G]="Cell 4G connection",o[Connection.CELL]="Cell generic connection",o[Connection.NONE]="No network connection",alert("Connection type: "+o[e])}function iconCategories(e,o){"142"==e||"380"==e||"277"==e||"655"==e?$$(".catIcon"+o).append('<i class="fa fa-briefcase fa-2x" style="color:#008e96;"></i>'):"175"==e?$$(".catIcon"+o).append('<i class="fa fa-graduation-cap fa-2x" style="color:#008e96;"></i>'):"149"==e?$$(".catIcon"+o).append('<i class="fa fa-archive fa-2x" style="color:#008e96;">'):$$(".catIcon"+o).append('<i class="fa fa-rss-square fa-2x" style="color:#008e96;"></i>')}function titleCategories(e,o){"142"==e||"380"==e||"277"==e||"655"==e?$$(".postType"+o).append("Job Information"):"175"==e?$$(".postType"+o).append("Scholarships"):"149"==e?$$(".postType"+o).append("Tender Information"):$$(".postType"+o).append("Blogs & Articles")}function removeBookmarks(e,o){$(".bookmark-modal").off("click").on("click",function(){app.dialog.confirm("Are you sure you want to remove bookmark?","Bookmark Removal",function(){var o=$$(this).attr("data-index");e.splice(o,1),app.form.storeFormData("spane-app-dev-Bookmarks",e),app.notification.create({title:"Bookmark Removed",closeIcon:!0,closeOnClick:!0,closeButton:!0,text:"Your Post has been Removed in Bookmarks",closeTimeout:3e3}).open(),getBookmarks()})})}function getOfflinePost(e,o){$$(".view-post-btn").off("click").on("click",function(){e=app.form.getFormData(o);var a=$$(this).attr("data-index"),t=e[a];$$(".block-popup-content").empty(),$$(".block-popup-content").append('<div class="card ks-facebook-card"><div class="card-header"><div class="ks-facebook-avatar"><i class="f7-icons">bookmark</i></div><div class="ks-facebook-name">'+t.title.rendered+'</div><div class="ks-facebook-date">'+t.date+'</div></div><div class="card-content"><div class="card-content-inner"><p>'+t.content.rendered+'</p><p class="buttons-row"><br/><a  href="whatsapp://send?text='+t.link+'" style="text-align:center;font-weight:bold;" class="button button-raised button-fill color-teal item-link external">Share Post</a></p></div></div><div class="item-inner"><div class="item-title"></div>'),fDate()})}function setReminder(e,o){var a={title:e,date:o},t=app.form.getFormData("spane-app-dev-reminders");if(null==t)app.form.storeFormData("spane-app-dev-reminders",[a]);else{var n=t;n.push(a),app.form.storeFormData("spane-app-dev-reminders",n)}}function checkReminders(){var e=app.form.getFormData("spane-app-dev-reminders");if(null!=e){var o=(new Date).toLocaleDateString();$.each(e,function(e,a){a.date===o&&app.notification.create({title:"Reminder! Reminder",closeIcon:!0,closeOnClick:!0,closeButton:!0,text:"You have reminders that are due today,"+a.title+" You might wanna check your bookmarks",closeTimeout:4e3}).open()})}}function openBrowser(e){var o=e,a=cordova.InAppBrowser.open(o,"_blank","location = yes");a.addEventListener("loadstart",function(e){console.log("Loading started: "+e.url)}),a.addEventListener("loadstop",function(e){console.log("Loading finished: "+e.url)}),a.addEventListener("loadloaderror",function(e){console.log("Loading error: "+e.message)}),a.addEventListener("exit",function(){console.log("Browser is closed...")})}$.ajax({url:updateURL+"/app-params.json",success:function(e){(updateVersion=e.jUpdateVersion)>currentVersion&&app.notification.create({title:"New Update Available",closeIcon:!0,closeOnClick:!0,closeButton:!0,text:'<a href="http://spaneapp.com/spaneapp.apk" class="link external">Click here to <b>Download</b> new App version</a>',closeTimeout:3e3}).open(),console.log(updateVersion)},error:function(e){}}),$$(".tab-2").on("click",function(){getBookmarks()}),$$(".tab-1").on("click",function(){getOfflineData()}),$$(".popup-close").on("click",function(){$$(".block-popup-content").empty(),getOfflineData()}),clearModal(),getOfflineData(),checkReminders();