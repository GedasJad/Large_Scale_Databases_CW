
var cursor = db.restaurants.find({name: /Pizza/i})//.count() // Task 2 part 1

 db.zipcodes.createIndex({"loc": "2dsphere"})
 db.restaurants.createIndex({"loc": "2dsphere"})

cursor.forEach(function(one_ns){ //Task 2 part 2
	var some_zs=db.zipcodes.find({loc: {$nearSphere :one_ns.location}}).limit(1).toArray();
	print("Restaurant: "); printjson(one_ns.location);
	 printjson(some_zs[0].city)
});
	
	
	

//Task 2 part 3
var cursor = db.restaurants.find()

cursor.forEach(function(one_ns){ 
	var some_zs=db.zipcodes.find({loc: {$nearSphere :one_ns.location}}).limit(1).toArray();
	
	one_ns.city=some_zs[0].city
	db.geodb.insertOne(one_ns)
});



//Task 2 part 4
var burger = db.geodb.aggregate([{$group : {_id:"$city",count:{$sum:1}, Restaurants: {$push: "$name"} }},{$project: {_id: 0, City: "$_id", "No Of Restaurants": "$count", Restaurants: "$Restaurants"}}])
	

