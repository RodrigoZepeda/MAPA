/*
MIT LICENSE
    Copyright 2018 Rodrigo Zepeda
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
    associated documentation files (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge, publish, distribute,
    sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial
    portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
    PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


//Initial values for parameters
var Initial_Values = {"pdefun": 30, "pinfect": 20, "phosp": 50, "dosis": 1, "dt": 0.5};
    Ranges         = {"pdefun" : {"min": 0, "max": 100},
                      "pinfect" : {"min": 0, "max": 100},
                      "phosp" : {"min": 0, "max": 100},
                      "dosis": {"min": 1, "max": 2},
                      "dt": {"min": 0.001, "max": 1}
                  };
    suffixes = {"pdefun": "%", "pinfect": "%", "phosp": "%", "dosis": "aplicaciones","dt": ""};
    stepsize = {"pdefun": 1, "pinfect": 1, "phosp": 1, "dosis": 1, "dt": 0.001};
    decimals = {"pdefun": 0, "pinfect": 0, "phosp": 0, "dosis": 0, "dt": 3};

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
