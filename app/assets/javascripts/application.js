// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require handlebars

  var map;
  var currentMarkers = [];
  initMap = function() {

  }

  function clearMap() {
    currentMarkers.forEach(function(marker) {
      marker.setMap(null);
    });
    currentMarkers.length = 0;
  }

  function loadMap(data) {
    clearMap()
    var location = {
      lat: data.businesses[0].location.coordinate.latitude,
      lng: data.businesses[0].location.coordinate.longitude
       }

      map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 12
    });
  }


$(document).ready(function() {
  
function addMarker(restaurant) {
    var location = {
      lat: restaurant.location.coordinate.latitude,
      lng: restaurant.location.coordinate.longitude
    };

    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var high_res_img = restaurant.image_url.replace("ms.jpg", "l.jpg")
    var context = {name: restaurant.name,
                  image: high_res_img, 
                  rating: restaurant.rating, 
                  phone: restaurant.display_phone,
                  address: restaurant.location.display_address,
                  url: restaurant.url};
    var html    = template(context);
    var infoWindow = new google.maps.InfoWindow({
      content: html
    });

    var marker = new google.maps.Marker({
      map: map,
      position: location,
      title: restaurant.name
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });

    map.addListener('click', function() {
      infoWindow.close(map, marker);
    })

    //marker, what is my nfo?
    //marker.addListner restaurant.infoString
    currentMarkers.push(marker);
    // debugger
  };


  $('.yelpSearch').on('submit',function(e) {
    e.preventDefault();
    $('.result').empty();
    console.log($(this).find('input').first().val());
    $.ajax({
      url: '/search',
      data: {
        // state: $('.yelpSearch').find('state').val(),
        search: $('.yelpSearch').find('.term').val(),
        location: $('.yelpSearch').find('.location').val(),
        country: $('.yelpSearch').find('.country').val()
      },
      method: 'GET',
      success: function(data) {
        $('.result').empty();
        loadMap(data);
        for (var i = 0; i <= data.businesses.length; i++){
          if(data.businesses[i].name) {
            console.log(data.businesses[i].name);
            var restaurant = data.businesses[i];
            addMarker(restaurant);
          }
        }
        
        console.log(restaurants);
      }
    })
  });
});