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

  var map;
  initMap = function() {

  }

  function loadMap(data) {
    var location = {
      lat: data.businesses[0].location.coordinate.latitude,
      lng: data.businesses[0].location.coordinate.longitude
       }

      map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 12
    });
  }


  function addMarker(restaurant) {
    var location = {
      lat: restaurant.location.coordinate.latitude,
      lng: restaurant.location.coordinate.longitude
    };

    var marker = new google.maps.Marker({
      map: map,
      position: location,
      title: restaurant.name
    });
  };

//handle submit
//get 'map'
//clear all the markers right now
//add markers from the json returned from the submit list


$(document).ready(function() {
  
  $('.yelpSearch').on('submit',function(e) {
    e.preventDefault();
    $('.result').empty();
    console.log($(this).find('input').first().val());
    $.ajax({
      url: '/search',
      data: {
        search: $(this).find('.term').val(),
        location: $(this).find('.location').val(),
        // sort: $(this).find('.sort option:selected').text()
      },
      method: 'GET',
      success: function(data) {
        loadMap(data);
        for (var i = 0; i <= data.businesses.length; i++){
          if(data.businesses[i].name) {
            console.log(data.businesses[i].name);
            var restaurant = data.businesses[i];
            addMarker(restaurant);
            // debugger
              $('.result').append(
                  'Name: ' + restaurant.name,
                 '<br>', 'Rating: ' + restaurant.rating,
                 '<br>', 'Latitude: ' + restaurant.location.coordinate.latitude,
                 '<br>', 'Longitude: ' + restaurant.location.coordinate.longitude,
                 '<br>', 'City: ' + restaurant.location.city + ', ' + restaurant.location.country_code,
                 '<br><br>');
            
          }
        }
        
        console.log(restaurants);
      }
    })
  });
});