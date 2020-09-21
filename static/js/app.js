// Select all data
var fullDataset = d3.json('samples.json');

// Populate 'Test Subject ID No' drop down
var sel = d3.select("#selDataset");
console.log(sel);

d3.json('samples.json').then(data => {
    console.log(data);    

    data.names.forEach(name => {
        sel
        .append("option")
        .text(name)
        .property("value", name);

    });

})

