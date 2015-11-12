
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("PlaceCreate", function(request, response) {
	var name = request.params.name, lat = request.params.lat, lng = request.params.lng,
		isPremium = request.params.isPremium,
		place = new Parse.Object("Place"), geoPoint = new Parse.GeoPoint({latitude:lat, longitude: lng}),
		user = Parse.User.current();
	if((!user || !user.get("isPremium")) && isPremium)
		return response.error("Nope!");
	Parse.Cloud.useMasterKey();
	place.save({
		position : geoPoint, name: name, isPremium: true
	}).then(function(place){
		return response.success(place);
	}, function(error){
		response.error(error);
	});
});
