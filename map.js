$(function() {
	queue()
		.defer(d3.json, "neighborhoods.geojson")
        .defer(d3.json, "categories.json")
        .defer(d3.json, "time.json")
    
    .await(dataDidLoad);
})

$("#topDifferences .hideTop").hide()

var categoriesData = null
var timesData = null
var projection = d3.geo.mercator().scale(40000).center([ -87.630564,42.2])

function dataDidLoad(error,streets,categories,times){
//make 1 svg for everything
    var mapSvg = d3.select("#map").append("svg").attr("width",1200).attr("height",1200)
    //draw each layer
    drawBuildings(streets,mapSvg)
    //uses csv version
    //this version of the data uses shortened, not exact lat and lngs
    var beauty = categories.beauty
    drawDots(beauty,mapSvg)
    categoriesData = categories
    timesData = times
}

function drawBuildings(geoData,svg){
    //need to generalize projection into global var later
    //d3 geo path uses projections, it is similar to regular paths in line graphs
	var path = d3.geo.path().projection(projection);
    
    //push data, add path
	svg.selectAll(".buildings")
		.data(geoData.features)
        .enter()
        .append("path")
		.attr("class","street")
		.attr("d",path)
		.style("stroke","#fff")
	    .style("opacity",.2)
}

function drawDots(data,svg){
    
    svg.selectAll(".dots")
        .data(data)
        .enter()
        .append("circle").transition().delay(function(d,i){return i})
        .attr("class","dots")
        .attr("r",4)
        .attr("cx",function(d){
            var lat = parseFloat(d.lat)
            var lng = parseFloat(d.lng)
            //to get projected dot position, use this basic formula
            var projectedLng = projection([lng,lat])[0]
            return projectedLng
        })
        .attr("cy",function(d){
            var lat = parseFloat(d.lat)
            var lng = parseFloat(d.lng)
            var projectedLat = projection([lng,lat])[1]
            return projectedLat
        })
        .attr("fill",function(d){
           return "#fffff0"
        })
        .attr("opacity",.1)
        
}
var wednesday = [{'values': [[0, 0.35], [1, 0.35], [2, 0.35], [3, 0.35], [4, 0.35], [5, 1.82], [6, 2.71], [7, 3.29], [8, 9.76], [9, 45.59], [10, 85.65], [11, 90.88], [12, 93.76], [13, 94.53], [14, 94.82], [15, 94.59], [16, 93.65], [17, 88.65], [18, 80.29], [19, 60.41], [20, 24.82], [21, 5.35], [22, 1.35], [23, 0.12]], 'key': 'Beauty'}, {'values': [[0, 0.0], [1, 0.0], [2, 0.0], [3, 0.0], [4, 0.0], [5, 0.0], [6, 0.55], [7, 1.93], [8, 4.42], [9, 20.44], [10, 57.18], [11, 74.59], [12, 85.64], [13, 88.4], [14, 88.12], [15, 87.29], [16, 81.22], [17, 50.0], [18, 24.86], [19, 13.54], [20, 7.18], [21, 3.31], [22, 1.38], [23, 0.0]], 'key': 'Culture'}, {'values': [[0, 0.0], [1, 0.0], [2, 0.07], [3, 0.07], [4, 0.07], [5, 0.57], [6, 9.76], [7, 39.56], [8, 60.23], [9, 83.54], [10, 90.09], [11, 90.81], [12, 93.01], [13, 93.16], [14, 93.01], [15, 87.17], [16, 75.69], [17, 64.79], [18, 35.0], [19, 21.81], [20, 13.97], [21, 3.49], [22, 1.35], [23, 0.57]], 'key': 'Education'}, {'values': [[0, 0.0], [1, 0.0], [2, 0.0], [3, 0.0], [4, 0.0], [5, 0.0], [6, 1.45], [7, 2.9], [8, 7.25], [9, 18.12], [10, 27.54], [11, 39.86], [12, 48.55], [13, 48.55], [14, 48.55], [15, 50.72], [16, 50.0], [17, 46.38], [18, 44.93], [19, 43.48], [20, 42.03], [21, 36.96], [22, 30.43], [23, 10.87]], 'key': 'Entertainment'}, {'values': [[0, 3.12], [1, 3.2], [2, 3.21], [3, 3.21], [4, 3.31], [5, 3.8], [6, 4.26], [7, 10.29], [8, 30.06], [9, 85.15], [10, 94.37], [11, 95.1], [12, 95.04], [13, 95.17], [14, 95.53], [15, 95.23], [16, 93.22], [17, 60.63], [18, 37.45], [19, 26.59], [20, 20.72], [21, 9.77], [22, 6.55], [23, 3.79]], 'key': 'Finance'}, {'values': [[0, 0.33], [1, 0.33], [2, 0.33], [3, 0.37], [4, 0.98], [5, 5.04], [6, 11.04], [7, 19.64], [8, 27.87], [9, 37.58], [10, 49.29], [11, 71.52], [12, 75.33], [13, 75.41], [14, 74.97], [15, 73.24], [16, 73.55], [17, 70.74], [18, 66.92], [19, 62.92], [20, 56.43], [21, 34.49], [22, 7.52], [23, 0.75]], 'key': 'Food'}, {'values': [[0, 0.22], [1, 0.25], [2, 0.23], [3, 0.25], [4, 0.3], [5, 2.09], [6, 4.18], [7, 10.98], [8, 35.09], [9, 71.0], [10, 80.62], [11, 82.49], [12, 82.73], [13, 82.87], [14, 82.55], [15, 81.59], [16, 78.38], [17, 49.95], [18, 39.03], [19, 24.92], [20, 13.64], [21, 5.23], [22, 1.2], [23, 0.12]], 'key': 'Health'}, {'values': [[0, 0.38], [1, 0.77], [2, 0.77], [3, 0.77], [4, 1.15], [5, 1.92], [6, 1.92], [7, 3.46], [8, 4.62], [9, 6.92], [10, 8.85], [11, 18.46], [12, 22.69], [13, 22.69], [14, 23.08], [15, 24.23], [16, 25.77], [17, 28.46], [18, 28.46], [19, 27.31], [20, 24.23], [21, 17.69], [22, 5.38], [23, 0.77]], 'key': 'Nightclub'}, {'values': [[0, 0.23], [1, 0.23], [2, 0.23], [3, 0.23], [4, 0.25], [5, 0.29], [6, 0.62], [7, 2.77], [8, 16.3], [9, 91.31], [10, 96.14], [11, 96.6], [12, 96.36], [13, 96.51], [14, 96.48], [15, 96.33], [16, 94.85], [17, 39.73], [18, 15.06], [19, 7.58], [20, 4.23], [21, 1.43], [22, 0.54], [23, 0.27]], 'key': 'Office'}, {'values': [[0, 0.93], [1, 0.99], [2, 1.0], [3, 1.02], [4, 1.1], [5, 1.67], [6, 3.91], [7, 12.15], [8, 35.99], [9, 67.45], [10, 80.68], [11, 83.26], [12, 84.43], [13, 84.84], [14, 85.29], [15, 85.47], [16, 81.22], [17, 48.66], [18, 34.42], [19, 23.99], [20, 14.6], [21, 5.52], [22, 2.08], [23, 0.94]], 'key': 'Other'}, {'values': [[0, 2.56], [1, 2.56], [2, 2.56], [3, 2.56], [4, 2.56], [5, 5.13], [6, 5.13], [7, 7.69], [8, 51.28], [9, 89.74], [10, 89.74], [11, 89.74], [12, 89.74], [13, 89.74], [14, 89.74], [15, 89.74], [16, 84.62], [17, 20.51], [18, 10.26], [19, 10.26], [20, 5.13], [21, 2.56], [22, 2.56], [23, 2.56]], 'key': 'Public'}, {'values': [[0, 9.33], [1, 9.5], [2, 9.5], [3, 9.5], [4, 9.5], [5, 11.57], [6, 21.76], [7, 28.15], [8, 51.81], [9, 82.38], [10, 88.08], [11, 90.5], [12, 83.25], [13, 83.77], [14, 83.94], [15, 82.56], [16, 68.22], [17, 41.45], [18, 35.23], [19, 30.92], [20, 21.24], [21, 13.99], [22, 5.18], [23, 0.0]], 'key': 'Recreation'}, {'values': [[0, 0.87], [1, 0.96], [2, 0.96], [3, 0.96], [4, 1.06], [5, 1.45], [6, 2.7], [7, 6.56], [8, 16.59], [9, 56.7], [10, 60.75], [11, 61.33], [12, 60.56], [13, 59.59], [14, 56.61], [15, 52.07], [16, 40.89], [17, 18.42], [18, 15.62], [19, 20.15], [20, 15.14], [21, 3.47], [22, 1.25], [23, 0.77]], 'key': 'Religious'}, {'values': [[0, 0.15], [1, 0.13], [2, 0.11], [3, 0.13], [4, 2.49], [5, 5.09], [6, 8.05], [7, 20.12], [8, 21.64], [9, 23.97], [10, 31.43], [11, 58.49], [12, 62.65], [13, 62.69], [14, 62.35], [15, 61.26], [16, 63.09], [17, 65.72], [18, 65.12], [19, 63.64], [20, 60.33], [21, 44.85], [22, 11.67], [23, 0.59]], 'key': 'Restaurant_and_cafe'}, {'values': [[0, 0.76], [1, 0.8], [2, 0.8], [3, 0.8], [4, 0.82], [5, 1.17], [6, 2.86], [7, 7.6], [8, 18.22], [9, 39.22], [10, 86.23], [11, 92.72], [12, 94.68], [13, 94.98], [14, 95.06], [15, 94.74], [16, 93.23], [17, 76.37], [18, 61.62], [19, 51.0], [20, 36.63], [21, 9.9], [22, 2.57], [23, 0.81]], 'key': 'Retail'}, {'values': [[0, 1.14], [1, 1.25], [2, 1.25], [3, 1.25], [4, 1.37], [5, 2.77], [6, 6.06], [7, 23.67], [8, 58.21], [9, 80.1], [10, 86.27], [11, 86.97], [12, 86.78], [13, 86.78], [14, 86.72], [15, 86.11], [16, 82.38], [17, 52.36], [18, 30.32], [19, 20.01], [20, 13.9], [21, 7.67], [22, 2.93], [23, 1.27]], 'key': 'Service'}]
var colors = ["#F34C1E","#D59C86","#DE3262","#AC4F37","#B54B5A","#E75E44","#98604E","#D23644","#DE7B7A","#E08D6C","#EA6D66","#BD401E","#F14240","#DE7348","#F34C1E","#D7291D"]

var width = 550
var margin_left = 150
var margin_top = 20
var spaceW = (width-margin_left)/24
var spaceH = spaceW+10
var height = (spaceH)*16+margin_top
var svg = d3.select("#chart1").append("svg").attr("height",height+10).attr("width",width+10)
var rScale = d3.scale.linear().domain([1,100]).range([2,spaceW/2-1])
var bgScale = d3.scale.linear().domain([0,10,17,23]).range(["#000","#FFFFF2","#FFFFF0","#000"]) 
//drawDaylightGradient()    
drawChart(wednesday,"#chart1")
function sortByHour(data,hour){
    var sorted = data.sort(function(a, b) {
       // console.log([a.values[hour],b.values[hour]])
        return  b.values[hour][1]-a.values[hour][1]})
    return data
}
function drawChart(data,divName){    
    for(var j in data){
        var row = j*spaceH
        var key = data[j].key
        var values = data[j].values
        
        svg.selectAll("."+key)
        .data(values)
        .enter()
        .append("rect")
        .attr("y",function(d,i){return row+20-spaceH/2+margin_top})
        .attr("x",function(d,i){return i*spaceW+150-spaceW/2})
        .attr("width",spaceW)
        .attr("height",spaceH)
        .attr("fill",function(d){return bgScale(d[0])})
        .attr("opacity",.4)
        //.attr("fill","#000")
        
        svg.selectAll("."+key)
        .data(values)
        .enter()
        .append("circle")
        .attr("cy",function(d,i){return row+20+margin_top})
        .attr("cx",function(d,i){return i*spaceW+150})
        .attr("r",function(d){return rScale(d[1])})
        //.attr("fill",colors[j])
        .attr("fill","#fffff2")
        .attr("class",key)
        //.on("mouseover",function(d){d3.select("#highlightText").html("At time "+d[0]+", "+d[1]+"% of "+ key+ " businesses are open.")})
       
        svg.append("text").text(key).attr("x",120).attr("y",row+20+margin_top)
        .attr("fill","#fffff2")
        .attr("text-anchor","end").attr("class","category").attr("class",key)
        .on("click",function(d){
            var category = d3.select(this).attr("class").toLowerCase()
            d3.selectAll("#map svg circle").remove()
            var svg = d3.select("#map svg")
            d3.select("#highlightText").html("category: "+category)
            
           // console.log(categoriesData[category])
            drawDots(categoriesData[category],svg)
    })       
    }
    for(var k =0; k<24;k++){
        svg.append("text").text(k).attr("x",k*spaceW+155).attr("y",margin_top).attr("fill","#fffff2").attr("text-anchor","end").attr("class",k)
        .on("click",function(){
            var hour = d3.select(this).attr("class")
            var sortedData = sortByHour(data,hour)
            var category = d3.select(this).attr("class")
            d3.selectAll("#map svg circle").remove()
            var svg = d3.select("#map svg")
            drawDots(timesData["_"+category],svg)
            d3.select("#highlightText").html("time: "+category)
         //   d3.selectAll("circle").remove()
         //   update(data,"#chart1",hour)
        })
    }
    
}
function drawDaylightGradient(){
    var gradient = svg.append("defs")
      .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "100%")
        .attr("y2", "100%")
      //  .attr("spreadMethod", "pad");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", .1);
        
    gradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#fffff2")
        .attr("stop-opacity", .5);
    gradient.append("stop")
        .attr("offset", "70%")
        .attr("stop-color", "#fffff2")
        .attr("stop-opacity", .5);   
    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", .1);

    d3.select("#chart1 svg").append("rect").attr("x",0).attr("y",0).attr("width",width+10).attr("height",height+10).style("fill", "url(#gradient)");
}
function update(data,divName,hour){
    var sortedData = sortByHour(data,hour)
    d3.selectAll("#chart1 .category").remove()

  // d3.selectAll(".circle").remove()
    for(var j in sortedData){
        var row = j*spaceH
        var key = sortedData[j].key
        var values = sortedData[j].values
        
        svg.selectAll("."+key).transition().duration(300).delay(function(d,i){return i*20})
      //  .data(values)
      //  .enter()
      //  .append("circle")
        .attr("cy",function(d,i){return row+20+margin_top})
      //  .attr("cx",function(d,i){return i/24*spaceW+150})
        .attr("r",function(d){return rScale(d[1])})
        .attr("fill",colors[j])
        
        svg.append("text").text(key).attr("x",120).attr("y",row+20+margin_top).attr("fill",colors[j]).attr("text-anchor","end").attr("class","category")              
    }
}
  