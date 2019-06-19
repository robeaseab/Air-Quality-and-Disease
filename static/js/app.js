function showData(citydata) {

    const url = `/data/${citydata}`
    d3.json(url).then(function (test) {

        let sample_metadata = d3.select("#sample-metadata").html("")
        console.log("Hi", test)

        Object.entries(test).forEach(([key, value]) => {
            var cell = sample_metadata.append("tr")
            console.log(key, value)
            cell.html(`<td>${key}:</td><td>${value}</td>`)
        })

        function buildTest(pizza) {
            console.log("great", pizza)
        }

        buildTest(test["Asthma(Prevalence)"])

        // const city_sample = `/data/${sample}`
        // d3.json(city_sample).then(function (u) {
        // console.log("hello city", u)
        
        // let data_bubble = [{
        //     x: test.Asthma_Prevalence,
        //     y: test.Median_AQI,
        //     text: test.City,
        //     mode: 'markers',
        //     // name: `Sample ${sample}`,
        //     marker: {
        //         size: test.Population,
        //     }
        // }];

        // var layout1 = {
        //     title: 'Air Quality Index',
        //     height: 600,
        //     width: 800
        // };

        // Plotly.newPlot("bubble", data_bubble, layout1);

    });
}

function buildCharts(sample) {

    const air_sample = `/airquality/${sample}`
    d3.json(air_sample).then(function (u) {
        console.log("hello there", u)

        let sample_array = u.data_values

        // let data_bubble = [{
        //     x: u.Year,
        //     y: u.data_values,
        //     text: u.Year.slice,
        //     mode: 'markers',
        //     name: `Sample ${sample}`,
        //     marker: {
        //         size: sample_array,
        //     }
        // }];

        // var layout1 = {
        //     title: 'Air Quality Index',
        //     height: 600,
        //     width: 800
        // };

        // Plotly.newPlot("bubble", data_bubble, layout1);

        let data_bar = [{
            y: u.data_values,
            x: u.Year,
            hovertext: u.Year,
            type: "bar"
        }];

        var layout2 = {
            title: 'AQI vs Year',
            height: 600,
            width: 800
        };

        Plotly.newPlot("bar", data_bar, layout2);
    })

    const disease_sample = `/disease/${sample}`
    d3.json(disease_sample).then(function (u) {
        console.log("hello dis", u)
        
        let data_bubble = [{
            x: u.Asthma_Prevalence,
            y: u.Median_AQI,
            text: u.City,
            mode: 'markers',
            // name: `Sample ${sample}`,
            marker: {
                size: u.Population,
            }
        }];

        var layout1 = {
            title: 'Air Quality Index',
            height: 600,
            width: 800
        };

        Plotly.newPlot("bubble", data_bubble, layout1);
    })
}

function init() {
    var selector = d3.select("#selDataset");

    d3.json("/names").then((citiies) => {
        citiies.forEach((w) => {
            selector
                .append("option")
                .text(w)
                .property("value", w);
        });

        const firstSample = citiies[0];
        console.log("first sample", firstSample)
        showData(firstSample);
        buildCharts(firstSample);
    })
}

function optionChanged(newSample) {
    showData(newSample);
    buildCharts(newSample);
}

init();