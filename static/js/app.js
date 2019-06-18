function build(citydata) {

    const url = `/data/${citydata}`
    d3.json(url).then(function (test) {

        let sample_metadata = d3.select("#sample-metadata").html("")
        console.log("Hi", test)
        console.log("wash", test.WFREQ)

        Object.entries(test).forEach(([key, value]) => {
            var cell = sample_metadata.append("tr")
            console.log(key, value)
            cell.html(`<td>${key}:</td><td>${value}</td>`)
        })
    });
}

function init() {
    var selector = d3.select("#selDataset");

    citiesArray = ["New York", "Chicago", "Los Angeles"]

    citiesArray.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });

    const firstSample = citiesArray[0];
    console.log("first sample", firstSample)
    build(firstSample);
}

function optionChanged(newSample) {
    build(newSample);
}

init();