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
    });
}

function buildCharts(sample) {

    const air_sample = `/airquality/${sample}`
    d3.json(air_sample).then(function (u) {
        console.log("hello there", u)

        let sample_array = u.data_values.slice(0, 10)

        let data_bubble = [{
            x: u.Year.slice(0, 10),
            y: u.data_values.slice(0, 10),
            text: u.Year.slice(0, 10),
            mode: 'markers',
            name: `Sample ${sample}`,
            marker: {
                size: sample_array,
            }
        }];

        var layout1 = {
            title: 'Bubble Chart',
            height: 600,
            width: 800
        };

        Plotly.newPlot("bubble", data_bubble, layout1);

        let data_bar = [{
            y: u.data_values.slice(0, 10),
            x: u.Year.slice(0, 10),
            hovertext: u.Year.slice(0, 10),
            type: "bar"
        }];

        var layout2 = {
            title: 'AQI vs Year',
            height: 600,
            width: 800
        };

        Plotly.newPlot("bar", data_bar, layout2);
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