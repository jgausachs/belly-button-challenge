
// ++++++++++++++++++++++++++++++++
// 1. Use the D3 library to read in samples.json from the URL
// Get the sample data endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and store first sample in an array
let firstSample = {};
let samplevalues = [];
let otuLabels = [];

d3.json(url).then(function (data) {
    firstSample = data.samples[0];

    // ++++++++++++++++++++++++++++++++
    // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Sort firstSample by sample values
    let sortedSample = firstSample.sample_values.map(function (value, index) {
        return {
            sample_value: value,
            otu_id: firstSample.otu_ids[index],
            otu_labels: firstSample.otu_labels[index]
        };
    }).sort((a, b) => b.sample_values - a.sample_values).slice(0, 10).reverse();

    console.log(sortedSample);
    let sampleValues = firstSample.sample_values.slice(0, 10).reverse();

    // Trace for the sample data
    let trace = {
        x: sampleValues,
        y: sortedSample.map(s => `ID: ${s.otu_id}  `),
        text: sortedSample.map(s => s.otu_labels),
        type: "bar",
        orientation: "h"
    };

    // Data trace array
    let numval = [trace];

    // Apply the group bar mode to the layout
    let layout = {
        hovermode: "closest",
        title: "Top 10 Operational Taxonomic Units"
    };
    console.log(numval);

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", numval, layout);

});