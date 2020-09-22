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
        
        // Pull arrays from the object
        // var otu_labels = filteredSampleData.map(sample => sample.otu_labels);
        // var sample_values = filteredSampleData.map(sample => sample.sample_values);
        
        // Find top 10 
        var byOTUValue = filteredSampleData.slice(0);
        console.log(byOTUValue);
        byOTUValue.sort(function (a,b) {
            return b.sample_values - a.sample_values;
        })
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