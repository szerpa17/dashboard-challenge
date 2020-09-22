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
         var byOtuID = filteredSampleData.otu_ids.slice(0, 10).reverse();
        var byOtuLabels = filteredSampleData.otu_labels.slice(0, 10).reverse();
        var byOtuSamples = filteredSampleData.sample_values.slice(0, 10).reverse();
        console.log(byOtuID, byOtuLabels, byOtuSamples);
        
    
        });

        } 

//  Bubble plot

// Function to update the page when the drop down value is changed
function optionChanged(newSample) {
    populateMetadata(newSample);
    top10(newSample);
}

// Listener
//sel.on('change',optionChanged(941));