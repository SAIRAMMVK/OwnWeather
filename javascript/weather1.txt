var temp_from_data, fahrenheit_temperature,celsius_temperature,wind,convert_wind;

function checkString() 
{    
    var cityInput = document.getElementById("cityName").value;
    if(isNaN(cityInput)){
        $("#btn").prop("disabled",false);
    }
    else{
        $("#btn").prop("disabled",true);    
    }
    
}

/* CONVERSION FROM CELSIUS TO FAHRENHEIT TEMPERATURE */
function convertF()
{
    fahrenheit_temperature = temp_from_data * 1.8 + 32 ;
    $("#current_temperature").html(fahrenheit_temperature);
    converted_wind = Math.ceil(wind * 0.62) ;
    $("#windspeed").html("Wind Speed:"+converted_wind+"mph");
}

/* CONVERSION FROM FAHRENHEIT TO CELSIUS TEMPERATURE */

function convertC()
{
    celsius_temperature = Math.ceil( (fahrenheit_temperature - 32) * 0.556 );
    $("#current_temperature").html(celsius_temperature);
    convert_wind = Math.ceil(converted_wind * 1.60) ;
    $("#windspeed").html("Wind Speed:"+convert_wind+"kmph");

}

$("#btn").click(()=>{
    const cityname = $("#cityName").val();
    $("#one").removeClass("hide-result");
    $("#two").removeClass("hide-result");
    $("#four").removeClass("hide-result");
    $.ajax({

        type:"GET",
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&APPID=ef0107f6f8d7d8932a3c0d617ef9b1ec`,
        success : (output)=>{
            console.log(output);
            /* SETTING THE VALUES OF CLASS NAMED SECOND CONTAINER  */

            $("#timestamp").html(moment(output.list[0].dt*1000).format('dddd, h a'));
            $("#city").html(output.city.name+","+output.city.country);
            $("#weather_description").html(output.list[0].weather[0].description);

            /* SETTING THE VALUES OF CLASS NAMED TEMPERATURE */
            temp_from_data = Math.ceil(output.list[0].main.temp - 273);
            $("#current_temperature").html(temp_from_data);
            $("#tempicon").attr('src',  "http://openweathermap.org/img/w/" + output.list[0].weather[0].icon + ".png");

            /* SETTING THE VALUES OF CLASS CONTENTS */
            wind = Math.ceil(output.list[0].wind.speed * 18/5);
            $("#humidity").html("Humidity :"+output.list[0].main.humidity+"%");
            $("#pressure").html("Pressure :"+output.list[0].main.pressure+"mb");
            $("#windspeed").html("Wind Speed :"+ wind +"kmph" );

            /* BOTTOM DIVISION VALUES FOR 5 DAYS */

            for(var i=1,count=0;i<6;i++,count=count+7){
                $("#1"+i).html(moment(output.list[count].dt*1000).format('dddd'));
                $("#2"+i).attr('src',  "http://openweathermap.org/img/w/" + output.list[count].weather[0].icon + ".png");
                $("#3"+i).html((Math.ceil(output.list[count].main.temp_max - 273)+"<sup>o</sup>")+" "+ (Math.ceil(output.list[count].main.temp_min - 273)+"<sup>o</sup>"));
            }

        },

        error: (output)=>{
            console.log(output);
        }
    });
})