// Initialize your app
  var myApp = new Framework7({
  		cache:true
  });

  // Export selectors engine
  var $$ = Dom7;

  // Add view
 //  var mainView = myApp.addView('.view-main', {
 //      // Because we use fixed-through navbar we can enable dynamic navbar
 //      dynamicNavbar: true,
 //      domCache: true
 //  });
 // var jobsView = myApp.addView('.view-jobs', {
 //      // Because we use fixed-through navbar we can enable dynamic navbar
 //      dynamicNavbar: true,
 //      domCache: true
 //  });
 $$('#jobs').on('click',function(){
  router.navigate('jobs.html', animate);
 })
  // var calendarDefault = myApp.calendar({
  //     input: '#calendar-default',
  // });  

//Categories: 142=Jobs, 175=scholarships, 277, 149,380,307=Articles, 149=tenders
// myApp.onPageInit('jobs', function (page) {
//     getPosts('Jobs', '142');
//     console.log("page opened");
// });
// myApp.onPageInit('scholarships', function (page) {
//     getPosts('scholarships', '175');
// });
// myApp.onPageInit('tenders', function (page) {
//     getPosts('tenders', '149');
// });
// myApp.onPageInit('articles', function (page) {
//     getPosts('articles', '307');
// });
// myApp.onPageInit('index', function (page) {
//     getPosts('allPosts', '0');
// });

  // $$(document).on('pageInit','.page[data-page="jobs"]',function(e){
  //     getPosts('Jobs', '142');
  // })
  // $$(document).on('pageInit','.page[data-page="scholarships"]',function(e){
  //     getPosts('scholarships', '175');
  // })
  // $$(document).on('pageInit','.page[data-page="tenders"]',function(e){
  //     getPosts('tenders', '149');
  // })
  // $$(document).on('pageInit','.page[data-page="articles"]',function(e){
  //     getPosts('articles', '307');
  // })
  // $$(document).on('pageInit','.page[data-page="index"]',function(e){
  //     getPosts('allPosts', '0');
  // })

  function getData(){
  var storedData = myApp.formGetData('userprofile-form');
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
            '<a  href="#" id="post-bookmark-modal" data-bookmark="'+value.id+'" class="button item-link external bookmark-modal"><i class="f7-icons padtop">bookmark</i></a>'+
            '<a  href="#" data-popup=".popup-doc" data-post="'+value.id+'" id="view-post-btn" class="button open-popup">View</a></div>' +
          '<div class="item-inner"><div class="item-title"></div>');
       //console.log(parseObject.profession);
        //console.log(value.id);
        //Remove T from Date format
        fDate();
        postBookMark();
        if (category == 'allPosts'){
          // myApp.formStoreData('spane-app-offline-data',data);
          myApp.form.storeFormData('spane-app-offline-data',data);
        }
        
      });
  },
  complete: function(){
        $('#loader-image').hide();
      },
  error: function(error){
          // $$('#content-block-main').append('<div class="item-content">' + 
          //     '<div class="item-title"><div class="item-media"></div><center><img style="height:350px" src="img/error.gif"/><br/><a class="button button-raised button-fill color-teal item-link external" style="width:50%;" onClick="location.reload()">No Internet Press to Refresh</a></center></div>');

            myApp.addNotification({
            title: 'Network Problem',
            closeIcon: true,
            closeOnClick: true,
              message: 'Your network seems to have a problem loading new content',
              button: {
                text: 'Close',
                color: 'white',
                close:true
              }
            });
         //getOfflineData();

      //console.log(error);
    }

  });
  //console.log(postURL);
}
getPosts('allPosts', '0');


  //var postid = getUrlParameter('postid');
  $$('#view-post-btn').click(function () {
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
              '<div class="ks-facebook-name">Selibeng.com | LesCAss</div>' +
              '<div class="ks-facebook-date">'+data.date+'</div>' +
            '</div>' +
            '<div class="card-content">' + 
              '<div class="card-content-inner">' +
              '<p><h3>'+data.title.rendered+'</h3></p>' +
               '<p>'+data.content.rendered+'</p>' +
               '<p class="buttons-row"><a href="'+data.link+'" class="button button-raised button-fill color-teal item-link external" style="font-weight:bold;">Read More</a><a  href="whatsapp://send?text='+data.link+'" style="text-align:center;font-weight:bold;" class="button button-raised button-fill color-teal item-link external">Share Post</a></p>'+
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
};
});
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
      myApp.addNotification({
        title: 'Results - Tap to Remove',
        closeIcon: true,
        closeOnClick: true,
          message: 'No Results Found for your Search',
          button: {
            text: 'Close',
            color: 'white',
            close:true
          }
      });
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

        myApp.addNotification({
          title: 'New Update Available',
          closeIcon: true,
          closeOnClick: true,
          close:true,
            message: '<a href="http://spaneapp.com/spaneapp.apk" class="link external">Click here to <b>Download</b> new App version</a>',
            button: {
              text: 'Close',
              color: 'white',
              close:true
            }
        });
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
  var offlineData = myApp.form.getFormData('spane-app-offline-data');
  if(offlineData != null){
    $$('#content-block-main').empty();
      $.each(offlineData, function(index, value) {
            $$('#content-block-main').append('<div class="card ks-facebook-card">' +
              '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><i id="catIcon" class="f7-icons" style="height:34px;width:34px;">bookmark</i></div>' +
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
                '<a  href="#" id="post-bookmark-modal" data-bookmark="'+value.id+'" class="button item-link external bookmark-modal"><i class="f7-icons padtop">bookmark</i></a>'+
                '<a  href="posts.html?postid='+value.id+'" data-popup=".popup-doc" data-post="'+value.id+'" id="view-post-btn" class="button open-popup">View</a></div>' +
              '<div class="item-inner"><div class="item-title"></div>'+
        '</div>');
        fDate();
        $('#loader-image').hide();
        postBookMark();
        });
        // console.log(bookmarks);
    }
}

//list bookmarks on its page
function getBookmarks(){
  var bookmarks = myApp.form.getFormData('spane-app-dev-Bookmarks');
  if(bookmarks != null){
      $.each(bookmarks, function(index, value) {
            $$('#bookmarks-block-main').append('<div class="card ks-facebook-card">' +
              '<div class="card-header">' +
              '<div class="ks-facebook-avatar"><img src="img/selibeng.png" width="34" height="34"/><img src="img/lescass.png" style="margin-right:5px;" width="34" height="34"/></div>' +
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
                '<a href="posts.html?postid='+value.id+'" class="button item-link external" id="bk-content">View</a></div>' +
              '<div class="item-inner"><div class="item-title"></div>'+
        '</div>');
        fDate();
        removeBookmarks(bookmarks);
        $$('#bk-content').click(function(){
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
  
   $$('#post-bookmark-modal').click(function () {
    var bookID = $(this).attr('data-bookmark');
    console.log(rootURL + '/posts/'+bookID);
      if (bookID != undefined){
             $.ajax({
              // type: 'GET',
              url: rootURL + '/posts/'+bookID,
              // dataType: 'json',
              success: function(data){
               //var bookmarksData = myApp.formGetData('spane-app-dev-Bookmarks');
               var bdata = {'id':data.id,'date':data.date,'title':data.title.rendered,'content':data.content.rendered};
               //var arrBookmarks = [];
               var storedBookmarks = myApp.formGetData('spane-app-dev-Bookmarks');
               if(storedBookmarks==null){
                  myApp.formStoreData('spane-app-dev-Bookmarks',[bdata]);
               }
               else{
                  var arrBookmarks = storedBookmarks;
                  //console.log(bdata);
                  arrBookmarks.push(bdata);
                  myApp.formStoreData('spane-app-dev-Bookmarks',arrBookmarks);
               }
               alert('Post bookmarked, check Bookmarks to see your Post');
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
//initialize bookmarks
getBookmarks();
//initialize offline data
getOfflineData();

// getPosts('allPosts', ' ');
// console.log(postURL);
//checkConnection();
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
    $('#bookmark-modal').click(function(){
      //console.log('clicked');
      var indexData = $$(this).attr('data-index');
               //var storedBookmarks = myApp.formGetData('spane-app-dev-Bookmarks');
               offlineData.splice(indexData,1);
               //console.log(indexData);
              
              myApp.formStoreData('spane-app-dev-Bookmarks',offlineData);
              alert('Your Post has been Removed in Bookmarks');
              location.reload(true);
    });
         
}