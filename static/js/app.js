// Select all data
var fullDataset = d3.json('samples.json');

// Select drop down object
var sel = d3.select("#selDataset");


// Populate 'Test Subject ID No' drop down
d3.json('samples.json').then(data => {
    console.log(data);    

    data.names.forEach(name => {
        sel
        .append("option")
        .text(name)
        .property("value", name);

    });

})

// Populate metadata
function populateMetadata(selectedSampleID){
        d3.json('samples.json').then(data => {
        
        // Select metadata from complete dataset
        var metadata = data.metadata;
        
        // Filter metadata by sample ID (selectedSample variable) 
        var sampleData = metadata.filter(sample => sample.id == selectedSampleID);
        var result = sampleData[0];
        console.log(result)
        var mdPanel = d3.select("#sample-metadata");
        Object.entries(result).forEach(([key, value]) => {
            mdPanel
            .append("h6")
            .text(`${key}: ${value}`)
            .property("value",`${key}: ${value}`);
        });
    });
}

// Listener
sel.on('change', populateMetadata(940));