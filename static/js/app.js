// Variable to access all data in the json file
var fullDataset = d3.json('samples.json');


// Initialization function
function init() {
    // Select dropdown location
    var sel = d3.select("#selDataset");

    // Populate 'Test Subject ID No' drop down
    fullDataset.then(data => {
        // Variable to access the names array
        var names = data.names;

        // Iterate through the names array to populate the drop down options
        names.forEach(name => {
            sel
                .append("option")
                .text(name)
                .property("value", name);
        });
        
        // Populate default visualizations
        populateMetadataAndGauge(names[0]);
        barAndBubblePlots(names[0]);
    });
};

// Initialize page
init();

// Populate metadata and related gauge chart 
function populateMetadataAndGauge(sampleID) {
    fullDataset.then(data => {

        // Select metadata from complete dataset
        var metadata = data.metadata;

        // Filter metadata by sample ID (selectedSample variable) 
        var sampleData = metadata.filter(sample => sample.id == sampleID);
        
        
        var result = sampleData[0];
        console.log(sampleData)
        console.log(result)
        var mdPanel = d3.select("#sample-metadata");


        mdPanel.html('');

        Object.entries(result).forEach(([key, value]) => {
            mdPanel
                .append("h6")
                .text(`${key}: ${value}`);
        });
       
        // Gauge
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: result.wfreq,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [0, 10] }
                }
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    });
}

//  Top 10 OTUs found in that individual
function barAndBubblePlots(sampleID) {
    fullDataset.then(data => {

        // Select metadata from complete dataset
        var samples = data.samples;

        // Filter samples by ID
        var filteredSampleData = samples.filter(sample => sample.id == sampleID)[0];

        console.log(filteredSampleData);
        // Find top 10 OTU
        var barOtuID = filteredSampleData.otu_ids.slice(0, 10).reverse();
        var barOtuLabels = filteredSampleData.otu_labels.slice(0, 10).reverse();
        var barOtuSamples = filteredSampleData.sample_values.slice(0, 10).reverse();
        
        // Bar Plot
        var data = [
                {
                    x: barOtuSamples,
                    y: barOtuID.map(otuID => `OTU ${otuID}`),
                    type: 'bar',
                    orientation: 'h',
                    text: barOtuLabels,
                }
            ];
         Plotly.newPlot('bar', data);
    
        // Bubble plot
        var bpOtuID = filteredSampleData.otu_ids;
        var bpOtuLabels = filteredSampleData.otu_labels;
        var bpOtuSamples = filteredSampleData.sample_values;

        var trace1 = {
            x: bpOtuID,
            y: bpOtuSamples,
            text: bpOtuLabels,
            mode: 'markers',
            marker: {
            color:bpOtuID,
            colorscale: 'Earth',
            size: bpOtuSamples.map( values => values)
            }
        };
        
        var data2 = [trace1];
        
        var layout = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 600,
            width: 1200
        };
        
        Plotly.newPlot('bubble', data2, layout);

    });

} 


// Function to update the page when the drop down value is changed
function optionChanged(newSample) {
    populateMetadataAndGauge(newSample);
    barAndBubblePlots(newSample);
}
