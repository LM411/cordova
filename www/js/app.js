// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

var calendarModal = app.calendar.create({
  inputEl: '#demo-calendar-modal',
  openIn: 'customModal',
  header: true,
  footer: true,
  dateFormat: 'MM dd yyyy',
});

function getData(){
  var storedData = app.formGetData('userprofile-form');
  if(storedData) {
    var JsonString = JSON.stringify(storedData)
    var parseObject = JSON.parse(JsonString);
    alert(parseObject.profession);
  }
  else {
    alert('There is no stored data for this form yet. Try to change any field')
  }
}

function loadURL(url){
      navigator.app.loadUrl(url, { openExternal:true });
      return false;
    } 
//Get parameters from URL
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function fDate(){
   $('.ks-facebook-date').text(function () {
          return $(this).text().replace('T', ' '); 
    });
}

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
  mainView.router.loadContent(
      '<!-- Top Navbar-->' +
      '<div class="navbar">' +
      '  <div class="navbar-inner">' +
      '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
      '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
      '  </div>' +
      '</div>' +
      '<div class="pages">' +
      '  <!-- Page, data-page contains page name-->' +
      '  <div data-page="dynamic-pages" class="page">' +
      '    <!-- Scrollable page content-->' +
      '    <div class="page-content">' +
      '      <div class="content-block">' +
      '        <div class="content-block-inner">' +
      '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
      '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>'
    );
  return;
}



var rootURL = 'https://www.selibeng.com/wp-json/wp/v2';

function getPosts(category, categoryNum){
var postURL = rootURL+ '/posts';
if (category != 'allPosts'){
  postURL = postURL+'?categories='+categoryNum;
}
$.ajax({
  // type: 'GET',
  url: postURL,
  // dataType: 'json',
  success: function(data){
      $$('#content-block-main').empty();
      $.each(data, function(index, value) {
        $$('#content-block-main').append('<div class="card ks-facebook-card">' +
          '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><i class="f7-icons">bookmark</i></div>' +
              '<div class="ks-facebook-name">Selibeng.com | LesCAss</div>' +
              '<div class="ks-facebook-date">'+value.date+'</div>' +
            '</div>' +
            '<div class="card-content">' + 
              '<div class="card-content-inner">' +
               '<p>'+value.title.rendered+'</p>' +
                //'<p class="more-content">Views: '+value.link+'</p>' +
              '</div>' +
            '</div>' +
            '<div class="card-footer">' +
            '<a  href="whatsapp://send?text='+value.link+'" class="button item-link external"><img src="img/whatsapp_share.png" height="20px" style="margin-top:8px;"></a>'+
            '<a  href="#" data-bookmark="'+value.id+'" class="button item-link external bookmark-modal post-bookmark-modal"><i class="f7-icons padtop">bookmark</i></a>'+
            '<a  href="#" data-popup=".popup-post" data-post="'+value.id+'" class="button popup-open view-post-btn">View</a></div>' +
          '<div class="item-inner"><div class="item-title"></div>');
       //console.log(parseObject.profession);
        //console.log(value.id);
        //Remove T from Date format
        fDate();
        singlePosts();
        postBookMark();
        if (category == 'allPosts'){
          // app.formStoreData('spane-app-offline-data',data);
          app.form.storeFormData('spane-app-offline-data',data);
        }
        
      });
  },
  complete: function(){
        $('#loader-image').hide();
      },
  error: function(error){
          // $$('#content-block-main').append('<div class="item-content">' + 
          //     '<div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>');

            app.notification.create({
            title: 'Network Problem',
            closeIcon: true,
            closeOnClick: true,
            closeButton: true,
            text: 'Your network seems to have a problem loading new content',
            closeTimeout: 3000,
            }).open();
         //getOfflineData();

      //console.log(error);
    }

  });
  //console.log(postURL);
}
getPosts('allPosts', '0');

 function singlePosts(){
  //var postid = getUrlParameter('postid');
  $$('.view-post-btn').off('click').on('click', function () {
  var postid = $(this).attr('data-post');
  //postid = getUrlParameter('postid');
  console.log(postid);
  if (postid != null){
     $.ajax({
      // type: 'GET',
      url: rootURL + '/posts/'+postid,
      // dataType: 'json',
      success: function(data){
        $$('#block-popup-content').empty();
        $$('#block-popup-content').append('<div class="card ks-facebook-card">' +
          '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><i class="f7-icons">bookmark</i></div>' +
              '<div class="ks-facebook-name">'+data.title.rendered+'</div>' +
              '<div class="ks-facebook-date">'+data.date+'</div>' +
            '</div>' +
            '<div class="card-content">' + 
              '<div class="card-content-inner">' +
               '<p>'+data.content.rendered+'</p>' +
               '<p class="buttons-row"><a onClick="openBrowser('+data.link+')" class="button button-raised button-fill color-teal item-link external" style="font-weight:bold;">Read More</a><br/><a  href="whatsapp://send?text='+data.link+'" style="text-align:center;font-weight:bold;" class="button button-raised button-fill color-teal item-link external">Share Post</a></p>'+
                // '<p class="color-gray">Views: '+value.link+'</p>' +
              '</div>' +
            '</div>' +
          '<div class="item-inner"><div class="item-title"></div>');
        //console.log(value.title);
        fDate();
        //$$('a').addClass('external');
      },
      complete: function(){
        $('#loader-spinner').hide();
      },
      error: function(error){
          $$('.post-content-block').append('<div class="item-content">' + 
              '<div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>');
      console.log(error);
      }
  });
}
});
  }
//Implement Search Filter 

//ovewrite JQuery Case Sensitive
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};
//Then Search
var search_txt = $('#search-input').val();
$('#search-input').keyup( function(){
    $('.card').hide();
   var search_txt = $('#search-input').val();
   $('.card:contains("'+search_txt+'")').show();
   //show notification if results are empty
   if($('.card:contains("'+search_txt+'")').length === 0){
      app.notification.create({
        title: 'Results - Tap to Remove',
        closeIcon: true,
        closeOnClick: true,
        closeButton: true,
        text: 'No Results Found for your Search',
        closeTimeout: 3000,
      }).open();
   }
});

//Check update
var updateVersion = 0;
var currentVersion = 1.1; //need to connect to device API (suspended for now)
var updateURL = 'http://spaneapp.com';
$.ajax({
  url: updateURL + '/app-params.json',
  success: function(data){
        updateVersion = data.jUpdateVersion;
        if(updateVersion > currentVersion){

        app.notification.create({
          title: 'New Update Available',
          closeIcon: true,
          closeOnClick: true,
          closeButton: true,
          text: '<a href="http://spaneapp.com/spaneapp.apk" class="link external">Click here to <b>Download</b> new App version</a>',
          closeTimeout: 3000,
          }).open();
     }
     console.log(updateVersion);
  },
  error: function(error){
     //console.log(error);
  }

});


// $$('a').addClass('external');

//Display your last displayed data
function getOfflineData(){
  var offlineData = app.form.getFormData('spane-app-offline-data');
  if(offlineData != null){
     $$('#content-block-main').empty();
      $.each(offlineData, function(index, value) {
            $$('#content-block-main').append('<div class="card ks-facebook-card">' +
             '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><i class="f7-icons">bookmark</i></div>' +
              '<div class="ks-facebook-name">Selibeng.com | LesCAss</div>' +
              '<div class="ks-facebook-date">'+value.date+'</div>' +
            '</div>' +
                '<div class="card-content">' + 
                  '<div class="card-content-inner">' +
                   '<p>'+value.title.rendered+'</p>' +
                    //'<p class="more-content">Views: '+value.link+'</p>' +
                  '</div>' +
                '</div>' +
                '<div class="card-footer">' +
                '<a  href="whatsapp://send?text='+value.link+'" class="button item-link external"><img src="img/whatsapp_share.png" height="20px" style="margin-top:8px;"></a>'+
                '<a  href="#"  data-bookmark="'+value.id+'" class="button item-link external bookmark-modal post-bookmark-modal"><i class="f7-icons padtop">bookmark</i></a>'+
                '<a  href="#" data-popup=".popup-post" data-post="'+value.id+'" class="button popup-open view-post-btn">View</a></div>' +
              '<div class="item-inner"><div class="item-title"></div>'+
        '</div>');
        fDate();
        $('#loader-image').hide();
        singlePosts();
        postBookMark();
        });
        // console.log(bookmarks);
    }
}

//list bookmarks on its page
function getBookmarks(){
  var bookmarks = app.form.getFormData('spane-app-dev-Bookmarks');
  if(bookmarks != null){
    $$('#bookmarks-block-main').empty();
      $.each(bookmarks, function(index, value) {
            $$('#bookmarks-block-main').append('<div class="card ks-facebook-card">' +
              '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><i class="f7-icons">bookmark</i></div>' +
              '<div class="ks-facebook-name">Selibeng.com | LesCAss</div>' +
              '<div class="ks-facebook-date">'+value.date+'</div>' +
            '</div>' +
                '<div class="card-content">' + 
                  '<div class="card-content-inner">' +
                   '<p>'+value.title+'</p>' +
                    // '<div class="more-content" id="more-content">'+value.content+'</div>' +
                  '</div>' +
                '</div>' +
                '<div class="card-footer">' +
                '<a  href="whatsapp://send?text='+value.link+'" class="button item-link external"><img src="img/whatsapp_share.png" height="20px" style="margin-top:8px;"></a>'+
                '<a  href="#" id="bookmark-modal" class="button item-link external bookmark-modal" data-index="'+bookmarks.indexOf(value)+'">Remove</a>'+
                '<a  href="#" data-popup=".popup-post" data-post="'+value.id+'" class="button popup-open view-post-btn">View</a></div>' +
              '<div class="item-inner"><div class="item-title"></div>'+
        '</div>');
        fDate();
        removeBookmarks(bookmarks);
        $$('#bk-content').on('click', function(){
            $('#more-content').hide();
        });
        // console.log(bookmarks);

     //    $$('#bk-content').click(function(){
     //     $('#more-content').hide();
      //  console.log('Clicked me');
        
       });
    }
}

//Global Variables Used
//var rootURL = 'https://www.selibeng.com/wp-json/wp/v2';
//Bookmarks

function postBookMark(){
  
   $$('.post-bookmark-modal').off('click').on('click', function () {
    var bookID = $(this).attr('data-bookmark');
    console.log(bookID);
      // if (bookID != undefined){
             $.ajax({
              // type: 'GET',
              url: rootURL + '/posts/'+bookID,
              // dataType: 'json',
              success: function(data){
               //var bookmarksData = app.formGetData('spane-app-dev-Bookmarks');
               var bdata = {'id':data.id,'date':data.date,'title':data.title.rendered,'content':data.content.rendered};
               //var arrBookmarks = [];
               var storedBookmarks = app.form.getFormData('spane-app-dev-Bookmarks');
               if(storedBookmarks==null){
                  app.form.storeFormData('spane-app-dev-Bookmarks',[bdata]);
               }
               else{
                  var arrBookmarks = storedBookmarks;
                  //console.log(bdata);
                  arrBookmarks.push(bdata);
                  app.form.storeFormData('spane-app-dev-Bookmarks',arrBookmarks);
               }
               // alert('Post bookmarked, check Bookmarks to see your Post');
               app.notification.create({
                    title: 'Your Post has been Bookmarked',
                    closeIcon: true,
                    closeOnClick: true,
                    closeButton: true,
                    text: data.title.rendered,
                    closeTimeout: 3000,
                    
                  }).open();
              },
              complete: function(){
                $('#loader-spinner').hide();
              },
              error: function(error){
                  $$('.post-content-block').append('<div class="item-content">' + 
                      '<div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>');
              console.log(error);
              }
          });
    // }
  });
      
}
function clearModal(){
  $$('.popup-close').on('click', function () {
    $$('#block-popup-content').empty();
    $$('#block-popup-content').append('<div id="loader-spinner"><center><img src="img/spinner_posts.gif" style="display: block;margin:30% auto;" height="60%" width="60%"></center></div>');
  });
}

 $$('.tab-2').on('click', function(){
     getBookmarks();
     console.log('cliecked me');
 });


function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

//Categories: 142=Jobs, 175=scholarships, 277, 149,380,307=Articles, 149=tenders
function iconCategories(categoryId){
  if(categoryId=='307'){
    $$('#catIcon').append('<i class="f7-icons">bookmark</i>');
  }
  else if(categoryId=='142'){
    $$('#catIcon').append('<i class="f7-icons">briefcase_fill</i>');
  }
  else if(categoryId=='149'){
    $$('#catIcon').append('<i class="f7-icons">star_fill</i>');
  }
  else if(categoryId=='142'){
    $$('#catIcon').append('<i class="f7-icons">persons</i>');
  }
  else if(categoryId=='380'){
    $$('#catIcon').append('<i class="f7-icons">graph_square_fill</i>');
  }
}

//Remove Bookmarks
function removeBookmarks(offlineData, value){
    $('.bookmark-modal').on('click', function(){
      //console.log('clicked');
      var indexData = $$(this).attr('data-index');
               //var storedBookmarks = app.formGetData('spane-app-dev-Bookmarks');
               offlineData.splice(indexData,1);
               //console.log(indexData);
              
              app.form.storeFormData('spane-app-dev-Bookmarks',offlineData);
              // alert('Your Post has been Removed in Bookmarks');
              app.notification.create({
                    title: 'Bookmark Removed',
                    closeIcon: true,
                    closeOnClick: true,
                    closeButton: true,
                    text: 'Your Post has been Removed in Bookmarks',
                    closeTimeout: 3000,
                    
                  }).open();
              //location.reload(true);
    });
         
}

//Set Calendar reminder
function setReminder(){
  $$('.calendar-day').on('click', function(){
      var remDate = $(this).attr('data-date');
      console.log(remDate);
      alert('Calender');
    });
  }
  clearModal();
  //initialize bookmarks
  // getBookmarks();
  //initialize offline data
getOfflineData();
// singlePosts();
// getPosts('allPosts', ' ');
// console.log(postURL);
//checkConnection();
setReminder();

//open inapp browser
function openBrowser(url_link) {
   var url = url_link;
   var target = '_blank';
   var options = "location = yes"
   var ref = cordova.InAppBrowser.open(url, target, options);
   
   ref.addEventListener('loadstart', loadstartCallback);
   ref.addEventListener('loadstop', loadstopCallback);
   ref.addEventListener('loadloaderror', loaderrorCallback);
   ref.addEventListener('exit', exitCallback);

   function loadstartCallback(event) {
      console.log('Loading started: '  + event.url)
   }

   function loadstopCallback(event) {
      console.log('Loading finished: ' + event.url)
   }

   function loaderrorCallback(error) {
      console.log('Loading error: ' + error.message)
   }

   function exitCallback() {
      console.log('Browser is closed...')
   }
}