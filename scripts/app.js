// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";




$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!

  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.826, lng: -122.282},
      zoom: 1
    });
  }

  initMap();

$.ajax({


   method: "GET",
   url: `${weekly_quakes_endpoint}`,
  

   success: function( response ) {
    console.log(response);
    console.log(response.features[0]);
    console.log(response.features[0].properties.title);
    console.log(response.features[0].properties.place);
    console.log(response.features[0].properties.mag);
    console.log(response.features[0].geometry.coordinates[0]);
    console.log(response.features[0].geometry.coordinates[1]);
    console.log(response.features[0].properties.title);

    
    // var title = response.features[0].properties.title;
    // var time = response.features[0].properties.time;
    // console.log(`${title} / ${time}`);
    // var addToPage = `${title} / ${time}`;

    for (i=0; i < response.features.length; i++) {
    var title = response.features[i].properties.title;
    var time = response.features[i].properties.time;
    var locationLong = response.features[i].geometry.coordinates[0];
    var locationLat = response.features[i].geometry.coordinates[1];

    console.log(Date.now()-time);
    var milSinceE = Date.now()-time;
    var hours = (milSinceE / (1000 * 60 * 60)).toFixed(1);
    console.log(hours);

    var addToPage = `${title} / ${hours} hours since Earthquake`;
    $('#info').after(`<p>${addToPage}</p>`);
    
    markerLabel = addToPage;

    var marker = new google.maps.Marker({
      position: {lat: locationLat, lng: locationLong},
      map: map,
      icon: 'images/earthquake.png',
      title: addToPage,
      animation: google.maps.Animation.BOUNCE,
      
  

    });
    marker.addListener('click', toggleBounce);
    }

    function toggleBounce() {
      if (marker.getAnimation() !== null ) {
          marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    var marker = new google.maps.Marker({
      position: {lat: 37.826, lng: -122.282},
      map: map,
      title: 'Hello Word'
    });

console.log(Date.now()-time);
var milSinceE = Date.now()-time;
var hours = (milSinceE / (1000 * 60 * 60)).toFixed(1);
console.log(hours)



  },
   error: function() {
    alert("There was an error getting weather data.");
  }
});

// var map;
// function initMap() {
  
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 37.826, lng: -122.282},
//     zoom: 1
//   });
// }
// initMap();
});




// $.ajax({
//   method: "GET",
//   url: "http://api.openweathermap.org/data/2.5/weather?q=",
//   data: {
//       id: 123
//   },
//   success: function( response ) {
//       $('#temp').html("The temperature in Detroit is " + response.temp);
//   },
//   error: function() {
//       alert("There was an error getting weather data.");
//   }
// });