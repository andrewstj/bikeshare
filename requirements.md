# Node.js Coding Challenge
You have been asked to create an API for the Chicago Divvy Bike Rental platform using the
Divvy API and the provided trip data.

# Explanation of the Models
- Station - Where the bikes can originate and end
- Trip - the dates, times, station, and rider info
- Rider - the person renting the bike

# Requirements
- Create a restful API that returns the following data:
  - Return the information for one station given a station id
  - Given one or more stations, return the number of riders in the following age groups, [0-20,21-30,31-40,41-50,51+, unknown], who ended their trip at that station for a given day.
  - Given one or more stations, return the last 20 trips that ended at each station for a single day.
- Require every API request to include an API token and handle the case where this is missing.
- Add a test for at least one of the api calls.
- Use whatever node packages you like but don’t install 3rd party databases, caching server, or other server apps. For example, don’t use mysql, mariadb, postgres, redis, mongodb, memcached, etc.
- Setup your app so it can be run locally.

# Data Sources
- Station Information This url should be called at least once by your app
https://gbfs.divvybikes.com/gbfs/en/station_information.json
- Trip Data The unzipped version of this data should be loaded from the filesystem into your app https://s3.amazonaws.com/divvy-data/tripdata/Divvy_Trips_2019_Q2.zip