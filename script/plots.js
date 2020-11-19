var sline, v1line, v2line, iline, rline, d1line, d2line, stext, v1text, v2text, itext, rtext, d1text, d2text;
var xdomain2, ydomain2, plotparams_main

function setPlotMain(margin, padding, xdomain, ydomain){

    //Custom heights for d3js plot
    var outerHeight  = 0.7*Math.max(document.documentElement['clientHeight'], document.body['scrollHeight'], document.documentElement['scrollHeight'], document.body['offsetHeight'], document.documentElement['offsetHeight']);
        outerWidth   = Math.max(0.975*document.body.clientWidth, 300);
        innerWidth   = outerWidth - margin.left - margin.right,
        innerHeight  = outerHeight - margin.top - margin.bottom,
        width        = innerWidth - padding.left - padding.right,
        height       = innerHeight - padding.top - padding.bottom;


    // Create svg margins
    var outer = d3.select('#mainplot').append('svg')
    .attr('width', outerWidth)
    .attr('height', outerHeight);

    if(debug){
        outer.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr('fill', "green")
    }

    var inner = outer.append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

    if(debug){
        inner.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr('fill', "blue");
    };

    //X.axis
    Xscale = d3.scaleLinear()
    .domain([xdomain.min, xdomain.max])
    .range([0, width]);

    axisX  = inner.append("g")
        .attr("transform", "translate(" + 0 + "," + height + ")")
        .attr("id","xaxis")
        .style("stroke-width", 2)
        .call(d3.axisBottom(Xscale));

    //Y-axis
    Yscale = d3.scaleLinear()
        .domain([-ydomain.min, ydomain.max])
        .range([height, 0]);

    axisY = inner.append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("id","yaxis")
        .style("stroke-width", 2)
        .call(d3.axisLeft(Yscale));

    //Create X axis label
    outer.append('text')
        .attr('x', innerWidth / 2 )
        .attr('y',  innerHeight - padding.top/2)
        .style('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .text("Fecha (formato pendiente)");

    //Create Y axis label
    outer.append('text')
        .attr('y', 0)
        .attr('x', 0)
        .attr('transform', 'translate(' + 0 + ',' + innerHeight/2 + ') rotate(-90)')
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .text("Porcentaje de la población");

    // define the line
    var SusceptibleLine = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(100*d.s,0),100)); }) //Controlling for any numerical error
        .curve(d3.curveBasis);

    var V1Line = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(100*d.v1,0),100)); }) //Controlling for any numerical error
        .curve(d3.curveBasis);

    var V2Line = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(100*d.v2,0),100)); }) //Controlling for any numerical error
        .curve(d3.curveBasis);

    // define the line
    var InfectedLine = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(100*d.i,0),100)); }) //Controlling for any numerical error
        .curve(d3.curveBasis);

    // define the line
    var RemovedLine = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(0,100*d.r,0),100)); })
        .curve(d3.curveBasis);

    // define the line
    var D1Line = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(0,100*d.d1,0),100)); })
        .curve(d3.curveBasis);

    // define the line
    var D2Line = d3.line()
        .x(function(d) { return Xscale(Math.max(d.t,0)); })
        .y(function(d) { return Yscale(Math.min(Math.max(0,100*d.d2,0),100)); })
        .curve(d3.curveBasis);

    return {"inner": inner,"SusceptibleLine": SusceptibleLine,
            "V1Line": V1Line, "V2Line": V2Line, "InfectedLine": InfectedLine,
            "RemovedLine": RemovedLine, "D1Line": D1Line, "D2Line": D2Line};

};

function setPlotdataMain(plotparams, mydata){
/*
    stext = plotparams["inner"].append('text')
    .text('Suceptibles')
    .attr('fill',"#007bff")
    .attr('text-anchor', 'left')
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].s));

    sline = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["SusceptibleLine"])
    .style("stroke", "#007bff")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);
*/
    v1text = plotparams["inner"].append('text')
    .text('Vacunados 1a dosis')
    .attr('fill',"#6610f2")
    .attr('text-anchor', 'left')
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].v1));

    v1line = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["V1Line"])
    .style("stroke", "#6610f2")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);

/*
    v2text = plotparams["inner"].append('text')
    .text('Vacunados 2a dosis')
    .attr('fill',"#9b479f")
    .attr('text-anchor', 'left')
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].v2));

    v2line = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["V2Line"])
    .style("stroke", "#9b479f")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);
*/

    itext = plotparams["inner"].append('text')
    .text("Casos COVID")
    .attr('fill',"red")
    .attr('text-anchor', 'left')
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].i));

    iline = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["InfectedLine"])
    .style("stroke", "red")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);

    rtext = plotparams["inner"].append('text')
    .text('Casos con inmunidad')
    .attr('fill',"#d9831f")
    .attr('text-anchor', 'left')
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].r));

    rline = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["RemovedLine"])
    .style("stroke", "#d9831f")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);

    d1text = plotparams["inner"].append('text')
    .text('Muertes por COVID')
    .attr('fill',"#469408")
    .attr('text-anchor', 'left')
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].d1));

    d1line = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["D1Line"])
    .style("stroke", "#469408")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);

    d2text = plotparams["inner"].append('text')
    .text('Muertes generales')
    .attr('fill',"black")
    .attr('text-anchor', 'left')
    .attr('x', Xscale(mydata[mydata.length-1].t + 1))
    .attr('y', Yscale(100*mydata[mydata.length-1].d2));

    d2line = plotparams["inner"].append("path")
    .attr("class", "functionpath")
    .datum(mydata)
    .attr("d", plotparams["D2Line"])
    .style("stroke", "black")
    .style("stroke-width", 3)
    .style("fill", "none")
    .attr("transform", null);

};

function removePlotdata(){
    //sline.remove();
    v1line.remove();
    //v2line.remove();
    iline.remove();
    rline.remove();
    d1line.remove();
    d2line.remove();
    //stext.remove();
    v1text.remove();
    //v2text.remove();
    itext.remove();
    rtext.remove();
    d1text.remove();
    d2text.remove();
}
