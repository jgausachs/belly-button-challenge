
// ++++++++++++++++++++++++++++++++
// 1. Use the D3 library to read in samples.json from the URL
// Get the sample data endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and store first sample in an array
let firstSample = {};
let samplevalues = [];
let otuLabels = [];



d3.json(url).then(function (data) {
    let samples = data.samples;
    firstSample = samples[0];

    function chartselection(clickId) {
        console.log(clickId);

        // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        // Sort firstSample by sample values

        let resultClick = samples.filter(sample => sample.id == clickId);
        let result = resultClick[0];
        console.log(result);

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
        let trace1 = {
            x: sampleValues,
            y: sortedSample.map(s => `ID: ${s.otu_id}  `),
            text: sortedSample.map(s => s.otu_labels),
            type: "bar",
            orientation: "h"
        };

        // Data trace1 array
        let numval1 = [trace1];

        // Apply the group bar mode to the layout
        let layout1 = {
            hovermode: "closest",
            title: "Top 10 Operational Taxonomic Units for Test Subject"
        };
        console.log(numval1);

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", numval1, layout1);

    }

    // 3. Create a bubble chart that displays each sample.
    // Trace for the sample data
    let trace2 = {
        x: firstSample.otu_ids,
        y: firstSample.sample_values,
        text: firstSample.otu_labels,
        mode: "markers",
        marker: {
            size: firstSample.sample_values,
            color: firstSample.otu_ids
        }
    };

    // Data trace2 array
    let numval2 = [trace2];

    // Apply the group bar mode to the layout
    let layout2 = {
        hovermode: "closest",
        title: "Distribution of Operational Taxonomic Units for Test Subject",
        xaxis: { title: "OTU ID" }
    };
    console.log(numval2);

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", numval2, layout2);

    // 4. Display the sample metadata
    // Get the metadata for the first sample
    let sampleMetadata = data.metadata[0];

    // Fetch data for `#sample-metadata` corresponding to the first sample
    let display = d3.select("#sample-metadata");

    // 5. Display each key-value pair from the metadata JSON object somewhere on the page
    // Add data (key-value pair)
    Object.entries(sampleMetadata).forEach(([key, value]) => { display.append("h6").text(`${key}: ${value}`); });

    chartselection(940);

});
