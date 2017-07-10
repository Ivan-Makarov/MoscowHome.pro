var map;
$(document).ready(function(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 55.73155322736534, lng: 397.2098187866211},
		zoom: 11,
		styles:
		[
			{
				"featureType": "administrative",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"saturation": -100
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"saturation": -100
					},
					{
						"lightness": 40
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"saturation": -10
					},
					{
						"lightness": 30
					}
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					},
					{
						"saturation": -60
					},
					{
						"lightness": 10
					}
				]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					},
					{
						"saturation": -60
					},
					{
						"lightness": 60
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					},
					{
						"saturation": -100
					},
					{
						"lightness": 60
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					},
					{
						"saturation": -100
					},
					{
						"lightness": 60
					}
				]
			}
		]
	});
	var icon = {

		url: "/images/marker.svg",
		fillColor: '#da3b53',
		anchor: new google.maps.Point(22,72),
		size:new google.maps.Size(44, 72),
	}
	var marker = new google.maps.Marker({
		position: {lat: 55.727252, lng: 37.204347},
		map: map,
		draggable: false,
		icon: icon
	});
});