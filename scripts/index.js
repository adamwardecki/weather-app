/*
Weather App Javascript | MIT License
This weather app fetches the weather data of a city and continually updates it
*/

// Setup
var localData;
var BASE_URL = "YOUR WEBHOOK GOES HERE";
var syncano = new Syncano({
	apiKey: 'YOUR API KEY GOES HERE',
	instance: 'YOUR INSTANCE NAME GOES HERE'
});

//Map of conditions to weather icon class for matching
var condition = {
	mist: 'wi-day-sprinkle',
	fog: 'wi-day-fog',
	clear: 'wi-day-sunny',
	drizzle: 'wi-day-sprinkle',
	rain: 'wi-day-rain',
	thunderstorm: 'wi-day-thunderstorm',
	snow: 'wi-day-snow',
	cloud: 'wi-day-cloudy',
	haze: 'wi-day-haze'
};

//helper function to return correct weather icon
function getWeatherIcon(desc) {
	var keys = Object.keys(condition);

	for (var i = 0; i < keys.length; i++) {
		var r = new RegExp(keys[i], 'i');
		if (desc.match(r)) {
			return condition[keys[i]];
		}
	}

	return 'wi-day-cloudy';
};

//helper function to convert kelvin to ahrenheit
function kToF(k) {
	 return (Math.round(kToC(k) * 1.8000 + 32.00));
};

//helper function to convert kelvin to celcius
function kToC(k) {
	return (Math.round(k - 273.15));
};

//converts temp to proper scale depending on current setting of F or C
function convertTemp(k) {
	if (localData.scale === "F") {
		return kToF(k);
	} else {
		return kToC(k);
	}
}

//click handler for the F/C toggle in the UI
function toggleScale() {
	localData.scale = (localData.scale === 'F') ? 'C' : 'F';
	store('syncano-weather', localData);
	$('#scale span').text(localData.scale);
	var temps = $('*[data-temp]');

	for (var i = 0; i < temps.length; i++) {
		$t = $(temps[i]);
		//convert the temperature
		$t.get(0).childNodes[0].nodeValue = convertTemp($t.data("temp"));
		//change the scale text
		$t.find('span').text(localData.scale);
	}
}

// Handlebar helpers

//take a temp in kelvin, and displays the proper temperature
Handlebars.registerHelper('displayTemp', function(k) {
  var out = convertTemp(k) + '<sup>°<span>' + localData.scale + '</span></sup>';
  return new Handlebars.SafeString(out);
});

//takes the short description from the data result, and returns the proper class for the weather icon
Handlebars.registerHelper('displayIcon', function(desc) {
	var out = '<i class="wi ' + getWeatherIcon(desc) + '"></i>';
  return new Handlebars.SafeString(out);
});

//takes a string representation of utc time, and outouts the proper day, abbreviated to three letters
Handlebars.registerHelper('displayDay', function(t) {
	var day = new Date(t*1000);
  return new Handlebars.SafeString(day.toDateString().substring(0, 3));
});

//compile handlebar templates first
var wBoxTemplate = Handlebars.compile($('#wBox-template').html());

//localStorage
var store =  function (namespace, data) {
	if (arguments.length > 1) {
		return localStorage.setItem(namespace, JSON.stringify(data));
	} else {
		var store = localStorage.getItem(namespace);
		return (store && JSON.parse(store)) || {scale: 'F', city_ids: []};
	}
}
//This is where all of the real time action happens with Syncano.
function sync(id) {
	var realtime =  syncano.channel("weather_realtime").watch({room: id});

	realtime.on('update', function(res){
		console.log('updating');
		if(res) {
			var city = $('div[data-cityid="' + id + '"]');
			if (res.current_temp) {
				var cTemp = $(city.find('.curr_temp'));
				cTemp.attr('data-temp', res.current_temp);
				cTemp.get(0).childNodes[0].nodeValue = convertTemp(res.current_temp);
			}
			if (res.short_description) {
				var cIcon = $(city.find('.curr_cond'));
				cIcon.removeClass();
				cIcon.addClass('wi ' + getWeatherIcon(res.short_description));
			}
		}
		return;
	});
	return;
}

// Creates a weather box whenever the 'Add' button is pressed.
function addWBox(city_id) {
	//also add by city id here as well
	var url;

	if (typeof(city_id) === 'number') {
		url = BASE_URL + '?city_id=' + city_id;
	} else {
		var name = $( '#city' ).val();
		var city = '?city=' + name.split(' ').join('%20');
		var state = '&stateOrCountry=' + $( '#state' ).val();
		url = BASE_URL + city + state;
	}

	$.get(url, function(data){
		var res = JSON.parse(data.result.stdout);

		if($("div[data-cityId*='"+ res.city_id + "']").length === 0) {
			res.forecast = JSON.parse(res.forecast);
			$newBox = $('<div/>').html(wBoxTemplate(res));
			$newBox.appendTo( "#weatherBoxes" );
			//store city id in local storage for retrieval
			if (localData.city_ids.indexOf(res.city_id) === -1) {
				localData.city_ids.push(res.city_id);
				store('syncano-weather', localData);
			};

			$('input[type=text]').val('').blur();
			$( '#empty' ).hide();

			//watch the channel for updates to the weather
			return sync(res.city_id);
		} else {
			return;
		}

	});

};

// Set onClick handler for button and Enter Key for text boxes
$(document).ready(function(){

	//check local storage, and add boxes
	localData = store('syncano-weather');

	//set the initial scale
	$('#scale span').text(localData.scale);

	//load stored cities
	for(var i = 0; i < localData.city_ids.length; i++) {
		addWBox(localData.city_ids[i]);
	};

	$( "#addWeather" ).on('click', addWBox);
	$( "input" ).keypress(function(e) {
		if (e.keyCode == 13)
			addWBox();
    });

	$( "#scale" ).click(toggleScale);

	$( document ).on('click', '.exit', function() {
		$(this).parent().parent().parent().parent().fadeOut(function(){
			var id = $(this).data('cityid');
			var index = localData.city_ids.indexOf(id);
			if (index > -1) {
			    localData.city_ids.splice(index, 1);
			};
			store('syncano-weather', localData);
			$(this).remove();
		})
	});

});
