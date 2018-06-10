/* GRAPH FOR 5 DAY FORECAST TEMPERATURE */

function drawChart(m,n){
    const city = $("#cityName").val();
    
    $.ajax({
    
        type:"GET",
        url : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=ef0107f6f8d7d8932a3c0d617ef9b1ec`,
        success: (data)=>{
            console.log(data);
            currentDate = data.list.map((ele) => moment(ele.dt * 1000).format('dddd,h a'));
            currentTemperature = data.list.map(ele => Math.round(ele.main.temp - 273));
            currentTemp = currentTemperature.splice(m,n);
            $("#current_temperature").html(currentTemp[m]);
            plotChart(currentTemp, currentDate);
                    
        },
        error : (data)=>{
            console.log(data);
        }
    
    });
    const plotChart = (tempArr, datesArr) => {
        Highcharts.chart('chart-container', {
            chart: {
                type: 'area',
                height:300
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: datesArr
            },
           yAxis: {
                title: {
                    text: 'Temperature(in degree centigrade)'
                },
                labels: {
                    formatter: function () { return this.value + '°'; }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                area: {
                    dataLabels: {
                      enabled: true
                    },
                    series: {
                        allowPointSelect: true
                    },
              
                }
            },
            series: [{
                name: city,
                color: Highcharts.getOptions().colors[6],
                marker: {
                    symbol: 'square'
                },
                data: tempArr
            }]
        });
    }

}

$("#tempbtn").click(()=>{

        drawChart(0,7);
})


$("#1").click(()=>{
    drawChart(0,7);
})

$("#2").click(()=>{
    drawChart(8,15);
})

$("#3").click(()=>{
    drawChart(16,23);
})

$("#4").click(()=>{
    drawChart(24,31);
})

$("#5").click(()=>{
    drawChart(32,39);
})

/* GRAPH DISPLAYING THE WIND SPEEDS FOR A GIVEN CITY */

$("#windbtn").click(()=>{

    const city = $("#cityName").val();
    $.ajax({

        type:"GET",
        url:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=ef0107f6f8d7d8932a3c0d617ef9b1ec`,
        success:(output)=>{
            console.log("windbutton");
            console.log(output);
            windDates = output.list.map((ele) => moment(ele.dt * 1000).format('h a'));
            winds = new Array(40);
            for(var i =0; i<40 ;i++){
                winds[i] = output.list[i].wind.speed;
            }

            var degrees = new Array(40);
            for(var y=0;y<40;y++){
                degrees[y]=output.list[y].wind.deg;       
            }
            speedWinds = winds.slice(0,8);
            degreeWinds = degrees.slice(0,8);

            plotWindChart(speedWinds,degreeWinds,windDates);
            
        },
        error: (output)=>{
            console.log(output);
        }

    });

    const plotWindChart = (windArr,degArr,datesArr) => {
        Highcharts.chart('chart-container', {
            chart: {
                type: 'windbarb',
                height:300
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: datesArr
            },
            yAxis: {
                title: {
                    text: 'WindSpeed (in m/s)'
                },
                labels: {
                    formatter: function () { return this.value + '°'; }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                area: {
                    dataLabels: {
                      enabled: true
                    },
                    series: {
                        allowPointSelect: true
                    },
              
                }
            },
            series: [{
                name: city,
                data: windArr,

                name: 'Windspeed',
                color: Highcharts.getOptions().colors[1],
                showInLegend: false,
                tooltip: {
                    valueSuffix: ' m/s'
                }
            }, {
                type: 'area',
                keys: ['y', 'rotation'], // rotation is not used here
                data: windArr,
                color: Highcharts.getOptions().colors[0],
                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [
                            1,
                            Highcharts.color(Highcharts.getOptions().colors[0])
                                .setOpacity(0.25).get()
                        ]
                    ]
                },
                name: 'Wind speed',
                tooltip: {
                    valueSuffix: ' m/s'
                }
            }]
        });
    }
})