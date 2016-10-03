var s = document.createElement('meta');
s.name = "viewport";
s.content = "width=device-width, initial-scale=1, maximum-scale=1";
document.getElementsByTagName('head')[0].appendChild(s);


var jScript = document.createElement('script');
jScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jScript);


var cScript = document.createElement('script');
cScript.src = "https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js";
document.getElementsByTagName('head')[0].appendChild(cScript);



function updateTables() {

  var q1 = "DELETE%20FROM%20%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6%20WHERE%20iso_date%20%3C%20(now()%20-%20interval%20%271%20day%27)";

  var q2 = "SELECT%20lovingtweets.cartodb_id%2C%20lovingtweets.author_handle%2C%20lovingtweets.latitude%2C%20lovingtweets.longitude%2C%20lovingtweets.tweet_id%2C%20lovingtweets.rulelabel%2C%20states.name%20%20from%20%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6%20as%20lovingtweets%20join%20%22wayin-maps%22.loving_state_data_twitter%20as%20states%20%20on%20ST_Intersects(lovingtweets.the_geom%2C%20states.the_geom)";

  var q3 = "update%20%22wayin-maps%22.loving_state_data_twitter%20set%20positive_tweets%20%3D%20%20(select%20count(*)%20from%20%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6%0Awhere%20ST_Intersects(%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6.the_geom%2C%20%22wayin-maps%22.loving_state_data_twitter.the_geom)%20and%20%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6.rulelabel%20like%20%27Positive%27)%0A";

  var q4 = "update%20%22wayin-maps%22.loving_state_data_twitter%20set%20negative_tweets%20%3D%20%20(select%20count(*)%20from%20%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6%0Awhere%20ST_Intersects(%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6.the_geom%2C%20%22wayin-maps%22.loving_state_data_twitter.the_geom)%20and%20%22wayin-maps%22.new_loving___map_twitter_2mwlrx4xov3085ya3b6.rulelabel%20like%20%27Negative%27)%0A";

  var q5 = "update%20%22wayin-maps%22.loving_state_data_twitter%20set%20positive_tweets%20%3D%201%20where%20positive_tweets%20%3D%200%3B%0A";

  var q6 = "update%20%22wayin-maps%22.loving_state_data_twitter%20set%20negative_tweets%20%3D%201%20where%20negative_tweets%20%3D%200%3B%0A";

  var q7 = "update%20%22wayin-maps%22.loving_state_data_twitter%20set%20overall_sentiment%20%3D%20positive_tweets%20%2F%20(positive_tweets%20%2B%20negative_tweets)%3B%0A";


  makeQuery(q1).done(function() {
    console.log("q1 done");
    makeQuery(q2).done(function() {
      console.log("q2 done");
      makeQuery(q3).done(function() {
        console.log("q3 done");
        makeQuery(q4).done(function() {
          console.log("q4 done");
          makeQuery(q5).done(function() {
            console.log("q5 done");
            makeQuery(q6).done(function() {
              console.log("q6 done");
              makeQuery(q7).done(function() {
                console.log("q7 done");
              })
            })
          })
        })
      })
    })
  })


}



function makeQuery(q) {

  var api_key = "78a7bf712a64e025f262bcb76ba8229080476627";


  return $.getJSON('https://wayin-maps.carto.com/api/v2/sql/?q=' + q + '&api_key=' + api_key, function(data) {});

}

jinterval = setInterval(function() {

  if (window.jQuery) {
    clearInterval(jinterval);

    updateTables();

  }

}, 10);