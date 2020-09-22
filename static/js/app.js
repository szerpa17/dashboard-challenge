// Select all data
var fullDataset = d3.json('samples.json');

// Select drop down object
var sel = d3.select("#selDataset");

function init() {
    // Populate 'Test Subject ID No' drop down
    fullDataset.then(data => {
        var names = data.names;

        names.forEach(name => {
            sel
                .append("option")
                .text(name)
                .property("value", name);
        });

        populateMetadata(names[0]);
        top10(names[0]);
    });
};

init();

// Populate metadata
function populateMetadata(sampleID) {
    fullDataset.then(data => {

        // Select metadata from complete dataset
        var metadata = data.metadata;
        console.log(data);
        // Filter metadata by sample ID (selectedSample variable) 
        var sampleData = metadata.filter(sample => sample.id == sampleID);
        var result = sampleData[0];
        // console.log(result)
        var mdPanel = d3.select("#sample-metadata");
        // Attention - Address duplicates
        //         mdPanel.property('text', '');

        mdPanel.html('');

        Object.entries(result).forEach(([key, value]) => {
            mdPanel
                // .enter()
                .append("h6")
                .text(`${key}: ${value}`);
        });
       
        // Gaudge
        var data = [
            {
                // domain: { x: [0, 1], y: [0, 1] },
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
function top10(sampleID) {
    fullDataset.then(data => {

        // Select metadata from complete dataset
        var samples = data.samples;
        // console.log(samples)
        // Filter samples by ID
        var filteredSampleData = samples.filter(sample => sample.id == sampleID)[0];

        console.log(filteredSampleData);
        // // Find top 10 
        var barOtuID = filteredSampleData.otu_ids.slice(0, 10).reverse();
        var barOtuLabels = filteredSampleData.otu_labels.slice(0, 10).reverse();
        var barOtuSamples = filteredSampleData.sample_values.slice(0, 10).reverse();
//         console.log(byOtuID, byOtuLabels, byOtuSamples);
        
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
    populateMetadata(newSample);
    top10(newSample);
}

// Listener
//sel.on('change',optionChanged(941));