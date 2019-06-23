let bubbles = document.getElementById("plot");

function showData(citydata) {
    const url = `/data/${citydata}`
    d3.json(url).then(function (test) {

        let sample_metadata = d3.select("#sample-metadata").html("")
        console.log("Hi", test)

        Object.entries(test).forEach(([key, value]) => {
            let cell = sample_metadata.append("tr")
            cell.html(`<td>${key}:</td><td>${value}</td>`)
        })

        function buildTest(pizza) {
            console.log("great", pizza)
        }

        buildTest(test["Asthma(Prevalence)"])

    });
}

function buildCharts(sample) {

    const air_sample = `/airquality/${sample}`
    d3.json(air_sample).then(function (u) {

        let data_bar = [{
            y: u.data_values,
            x: u.Year,
            hovertext: u.Year,
            type: "bar"
        }];

        let layout2 = {
            title: 'AQI vs Year',
            height: 325,
            width: 425,
        };

        Plotly.newPlot("bar", data_bar, layout2);
    })
}

function buildSecond() {

    const url2 = `/alldata`
    d3.json(url2).then(function (data1) {
        let size1 = parseFloat(data1.Population) / 100000;
        let data = [{
            x: data1.Asthma,
            y: data1.Median_AQI,
            mode: 'markers',
            marker: {
                size: size1 * 3,
                opacity: 0.5
            }
        }];

        let layout = {
            title: 'Disease Prevalance vs Air Quality (2016)',
            showlegend: false,
            xaxis: { title: "Disease Prevalance" },
            yaxis: { title: "Median Air Quality Index" },
            height: 450,
            width: 675
        };

        Plotly.newPlot(bubbles, data, layout);
    })
}

function updatePlotly(newx, newy) {
    Plotly.restyle(bubbles, "x", [newx]);
    Plotly.restyle(bubbles, "y", [newy]);
}

function getData(dataset) {
    const url2 = `/alldata`
    d3.json(url2).then(function (data2) {
        console.log("dat2222", data2)
        let x = [];
        let y = [];

        switch (dataset) {
            case "Asthma":
                x = data2.Asthma;
                y = data2.Median_AQI;
                break;
            case "COPD":
                x = data2.COPD;
                y = data2.Median_AQI;
                break;
            case "Stroke":
                x = data2.Stroke;
                y = data2.Median_AQI;
                break;
            case "Heart_Disease":
                x = data2.Heart_Disease;
                y = data2.Median_AQI;
                break;
            default:
                x = data2.Asthma;
                y = data2.Median_AQI;
                break;
        }

        updatePlotly(x, y);
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
        buildSecond();
    })
}

function optionChanged(newSample) {
    showData(newSample);
    buildCharts(newSample);
    buildSecond();
}

init();