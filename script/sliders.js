
//Initial values for parameters
var Initial_Values = {"pdefun": 0.0, "pinfect": 0.0, "pcasos": 0.0, "pefect": 0.0, "dt": 0.5, "tvac": 0.03};
    Ranges         = {"pdefun"  : {"min": 0, "max": 100},
                      "pinfect" : {"min": 0, "max": 100},
                      "pcasos"  : {"min": 0, "max": 100},
                      "pefect"  : {"min": 0, "max": 100},
                      "dt": {"min": 0.001, "max": 1},
                      "tvac"  : {"min": 0, "max": 10000}};
    suffixes = {"pdefun": "%", "pinfect": "%", "pcasos": "%", "pefect": "%","dt": "", "tvac": " personas/día"};
    stepsize = {"pdefun": 1, "pinfect": 1, "pcasos": 1, "pefect": 1, "dt": 0.001, "tvac": 1.0};
    decimals = {"pdefun": 0, "pinfect": 0, "pcasos": 0, "pefect": 0, "dt": 3, "tvac": 0};

function setsliders(Initial_Values, Ranges, suffixes){

    //Get sliders
    var slider = document.getElementsByClassName('uislider');
    [].slice.call(slider).forEach(function(slider, index ){
        noUiSlider.create(slider, {
            start: [ Initial_Values[slider.id] ],
            step: stepsize[slider.id],
            behaviour: 'snap',
            connect: [true, false],
            range: {
                'min': Ranges[slider.id]["min"],
                'max': Ranges[slider.id]["max"]
            },
            tooltips: true,
            format: wNumb({
                decimals: decimals[slider.id],
                suffix: ' ' + suffixes[slider.id],
            })
        });
    });
};

function createsliders(){

    var vacunadosslider      = document.getElementById("pcasos");
    var contagiosidadslider  = document.getElementById("pinfect");
    var efectividadslider    = document.getElementById("pefect");
    var mortalidadslider     = document.getElementById("pdefun");

    vacunadosslider.noUiSlider.on('slide', function(values, handle){

      var efectividadeval = efectividadslider.noUiSlider.get();
          efectividadeval = Number(efectividadeval.substring(0, efectividadeval.length - suffixes["pefect"].length));

      var vacunadosval = vacunadosslider.noUiSlider.get();
          vacunadosval = Number(vacunadosval.substring(0, vacunadosval.length - suffixes["pcasos"].length));

      var contagiosidadval = contagiosidadslider.noUiSlider.get();
          contagiosidadval = Number(contagiosidadval.substring(0, contagiosidadval.length - suffixes["pinfect"].length));

          var mortalidadval = mortalidadslider.noUiSlider.get();
              mortalidadval = Number(mortalidadval.substring(0, mortalidadval.length - suffixes["pdefun"].length));

      removePlotdata();

      setPlotdataMain(plotparams_main,
          SIR(initvalues["S0"], initvalues["V10"], initvalues["V20"],
              initvalues["I0"], initvalues["R0"], initvalues["D10"],
              initvalues["D20"], time = time, dt = dt,
              theta0, theta1, theta2, efectividadeval/100*phi1, efectividadeval/100*phi2,
              lambda, mu, eta, (100 - mortalidadval)/100*zeta, vacunadosval/100, vacunadosval/100, betaval, t0,
              cons, periodo, contagiosidadval/100));

    });

    mortalidadslider.noUiSlider.on('slide', function(values, handle){

      var mortalidadval = mortalidadslider.noUiSlider.get();
          mortalidadval = Number(mortalidadval.substring(0, mortalidadval.length - suffixes["pdefun"].length));

      var efectividadeval = efectividadslider.noUiSlider.get();
          efectividadeval = Number(efectividadeval.substring(0, efectividadeval.length - suffixes["pefect"].length));

      var vacunadosval = vacunadosslider.noUiSlider.get();
          vacunadosval = Number(vacunadosval.substring(0, vacunadosval.length - suffixes["pcasos"].length));

      var contagiosidadval = contagiosidadslider.noUiSlider.get();
          contagiosidadval = Number(contagiosidadval.substring(0, contagiosidadval.length - suffixes["pinfect"].length));

      removePlotdata();

      setPlotdataMain(plotparams_main,
          SIR(initvalues["S0"], initvalues["V10"], initvalues["V20"],
              initvalues["I0"], initvalues["R0"], initvalues["D10"],
              initvalues["D20"], time = time, dt = dt,
              theta0, theta1, theta2, efectividadeval/100*phi1, efectividadeval/100*phi2,
              lambda, mu, eta, (100 - mortalidadval)/100*zeta, vacunadosval/100, vacunadosval/100, betaval, t0,
              cons, periodo, contagiosidadval/100));

    });

    efectividadslider.noUiSlider.on('slide', function(values, handle){
        var mortalidadval = mortalidadslider.noUiSlider.get();
            mortalidadval = Number(mortalidadval.substring(0, mortalidadval.length - suffixes["pdefun"].length));

      var efectividadeval = efectividadslider.noUiSlider.get();
          efectividadeval = Number(efectividadeval.substring(0, efectividadeval.length - suffixes["pefect"].length));

      var vacunadosval = vacunadosslider.noUiSlider.get();
          vacunadosval = Number(vacunadosval.substring(0, vacunadosval.length - suffixes["pcasos"].length));

      var contagiosidadval = contagiosidadslider.noUiSlider.get();
          contagiosidadval = Number(contagiosidadval.substring(0, contagiosidadval.length - suffixes["pinfect"].length));

      removePlotdata();

      setPlotdataMain(plotparams_main,
          SIR(initvalues["S0"], initvalues["V10"], initvalues["V20"],
              initvalues["I0"], initvalues["R0"], initvalues["D10"],
              initvalues["D20"], time = time, dt = dt,
              theta0, theta1, theta2, efectividadeval/100*phi1, efectividadeval/100*phi2,
              lambda, mu, eta, (100 - mortalidadval)/100*zeta, vacunadosval/100, vacunadosval/100, betaval, t0,
              cons, periodo, contagiosidadval/100));

    });

    contagiosidadslider.noUiSlider.on('slide', function(values, handle){
        var mortalidadval = mortalidadslider.noUiSlider.get();
            mortalidadval = Number(mortalidadval.substring(0, mortalidadval.length - suffixes["pdefun"].length));

     var vacunadosval = vacunadosslider.noUiSlider.get();
        vacunadosval = Number(vacunadosval.substring(0, vacunadosval.length - suffixes["pcasos"].length));

     var efectividadeval = efectividadslider.noUiSlider.get();
         efectividadeval = Number(efectividadeval.substring(0, efectividadeval.length - suffixes["pefect"].length));

      var contagiosidadval = contagiosidadslider.noUiSlider.get();
          contagiosidadval = Number(contagiosidadval.substring(0, contagiosidadval.length - suffixes["pinfect"].length));

      removePlotdata();

      setPlotdataMain(plotparams_main,
          SIR(initvalues["S0"], initvalues["V10"], initvalues["V20"],
              initvalues["I0"], initvalues["R0"], initvalues["D10"],
              initvalues["D20"], time = time, dt = dt,
              theta0, theta1, theta2, efectividadeval/100*phi1, efectividadeval/100*phi2,
              lambda, mu, eta, (100 - mortalidadval)/100*zeta, vacunadosval/100, vacunadosval/100, betaval, t0,
              cons, periodo, contagiosidadval/100));

    });
}
