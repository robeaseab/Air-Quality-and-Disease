// let svgWidth = 960;
// let svgHeight = 500;

// let margin = {
//     top: 20,
//     right: 40,
//     bottom: 80,
//     left: 100
// };

// let width = svgWidth - margin.left - margin.right;
// let height = svgHeight - margin.top - margin.bottom;

// let svg = d3
//     .select(".chart")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

// let chartGroup = svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

// let chosenXAxis = "Asthma_Prevalence";

// function xScale(xData, chosenXAxis) {
//     let xLinearScale = d3.scaleLinear()
//         .domain([d3.min(xData, d => d[chosenXAxis]) * 0.8,
//         d3.max(xData, d => d[chosenXAxis]) * 1.2
//         ])
//         .range([0, width]);

//     return xLinearScale;
// }

// function renderAxes(newXScale, xAxis) {
//     let bottomAxis = d3.axisBottom(newXScale);

//     xAxis.transition()
//         .duration(1000)
//         .call(bottomAxis);

//     return xAxis;
// }

// function renderCircles(circlesGroup, newXScale, chosenXaxis) {

//     circlesGroup.transition()
//         .duration(1000)
//         .attr("cx", d => newXScale(d[chosenXAxis]));

//     return circlesGroup;
// }

// function updateToolTip(chosenXAxis, circlesGroup) {

//     if (chosenXAxis === "Asthma_Prevalence") {
//         let label = "Asthma_Prevalence:";
//     }
//     else {
//         let label = "COPD_Prevalence:";
//     }

//     var toolTip = d3.tip()
//         .attr("class", "tooltip")
//         .offset([80, -60])
//         .html(function (d) {
//             return (`${d.City}<br>${label} ${d[chosenXAxis]}`);
//         });

//     circlesGroup.call(toolTip);

//     circlesGroup.on("mouseover", function (data) {
//         toolTip.show(data);
//     })
//         .on("mouseout", function (data, index) {
//             toolTip.hide(data);
//         });

//     return circlesGroup;
// }



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

    });
}

function buildCharts(sample) {

    const air_sample = `/airquality/${sample}`
    d3.json(air_sample).then(function (u) {
        console.log("hello there", u)

        let sample_array = u.data_values

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

    // const disease_sample = `/disease/${sample}`
    // d3.json(disease_sample).then(function (u) {
    //     console.log("hello dis", u)

    //     let data_bubble = [{
    //         x: u.Asthma_Prevalence,
    //         y: u.Median_AQI,
    //         text: u.City,
    //         mode: 'markers',
    //         // name: `Sample ${sample}`,
    //         marker: {
    //             size: u.Population,
    //         }
    //     }];

    //     var layout1 = {
    //         title: 'Air Quality Index',
    //         height: 600,
    //         width: 800
    //     };

    //     Plotly.newPlot("bubble", data_bubble, layout1);
    // })
}

function buildSecond() {

    const url2 = `/alldata`
    d3.json(url2).then(function (data1) {
        console.log("tessssss", data1.Asthma)
        console.log("gdsfdsgds", data1.City)

        var trace = [{
            x: data1.City,
            y: data1.Asthma,
            mode: "markers",
            type: "scatter",
            marker: {
                color: "#2077b4",
                symbol: "hexagram"
            }
        }];

        Plotly.newPlot("bubble", trace);
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