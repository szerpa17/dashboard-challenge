// Select all data
var fullDataset = d3.json('samples.json');

// Select drop down object
var sel = d3.select("#selDataset");


// Populate 'Test Subject ID No' drop down
fullDataset.then(data => {
    console.log(data);    

    data.names.forEach(name => {
        sel
        .append("option")
        .text(name)
        .property("value", name);

    });

})

// Populate metadata
function populateMetadata(sampleID){
        fullDataset.then(data => {
        
        // Select metadata from complete dataset
        var metadata = data.metadata;
        
        // Filter metadata by sample ID (selectedSample variable) 
        var sampleData = metadata.filter(sample => sample.id ==sampleID);
        var result = sampleData[0];
        // console.log(result)
        var mdPanel = d3.select("#sample-metadata");
        // Attention - Address duplicates
//         mdPanel.property('text', '');
        
        Object.entries(result).forEach(([key, value]) => {
            mdPanel
            // .enter()
            .append("h6")
            .text(`${key}: ${value}`);
        });
    });
}

//  Top 10 OTUs found in that individual
function top10(sampleID) {
    fullDataset.then(data => {
        
        // Select metadata from complete dataset
        var samples = data.samples;
        // Filter samples by ID
        var filteredSampleData = samples.filter(sample => sample.id == sampleID);
    
        // Find top 10 
        var byOtuValue = filteredSampleData.slice(0);
        // Sorting function (descending order)
        byOtuValue.sort(function (a,b) {
            return b.sample_values - a.sample_values;
        })
        
        // Pull arrays from the object
        var labels = byOtuValue.otu_labels;
        var fullOtuLabels = Object.values(labels);
        var fullSampleValues = byOtuValue.map(sample => sample.sample_values);
        
        // Slice out top 10
        // var otuLabels = fullOtuLabels.slice(9);
        // var sampleValues = fullSampleValues.slice(9);

        console.log(fullOtuLabels, fullSampleValues);
        // var topOTU = Object.values(filteredSampleData.sample_values).sort(function compareFunction(firstNum, secondNum) {
        //     return sample_values[secondNum] - sample_values[firstNum]
        //   });
        // console.log(filteredSampleData);

        // Object.entries(result).forEach(([key, value]) => {
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