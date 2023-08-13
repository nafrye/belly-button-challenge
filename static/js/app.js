//declate url that contains data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Promise Pending
const dataPromise = d3.json(url);

// Fetch the JSON data, declare variables, and pass them to other functions
d3.json(url).then(function(data) {
    let names = data.names; 
    //console.log(names);
    let demo = data.metadata;
    //console.log(demo);
    let Bdata = data.samples;
    // console.log(Bdata);
    // console.log(Bdata.length);
    // console.log(Bdata[0].otu_ids.length);

    // let betterData.id = [];
    // for (x = 0; x < Bdata.length; x++) {
    //     for (a = 0; a < Bdata[x].length; a++) {
    //         betterData.push(Bdata[x].id);
    //         betterData.push(Bdata[x].otu_ids[a]);
    //     }
    //     betterData.push(betterData[x]);
    // }

    // console.log(betterData);
    
    let info = data;
   
    pulldown(names);
    getData(info);
    init();


}
)


function getTheData() {
    d3.json(url).then(function(data) {
        let info = data;
        getData(info);
    })
}

function pulldown(names) {
    for (let i = 0; i < names.length; i++) {
        let newOption = d3.select("select").append("option");
        newOption.text(`${names[i]}`);
    }
}


// Display the default plot
function init() {
    //bar graph
    let numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let info = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
    let trace1 = {
        x: numbers,
        y: info,
        type: "bar", 
        text: ["grrr", "grrr", "uggg", "oy", "vey", "another", "a seventh", "another", "a ninth", "last"],
        orientation: "h"
    };

    let data = [trace1];

    let layout = {
      height: 600,
      width: 800
    };
  
   Plotly.plot("bar", data, layout);

   //bubble graph
   let ynumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   let trace2 = {
    x: numbers,
    y: ynumbers,
    text: ynumbers,
    mode: "markers",
    marker: {
        color: ynumbers,
        size: numbers

    }
   };
   let data2 = [trace2];
   let layout2 = {
    title: "Bubble plot"
   };

   Plotly.plot("bubble", data2, layout2);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getTheData);

function getData(info) {
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");
    //console.log(dataset);
    //console.log(metadata[0].ethnicity);
    let metadata = info.metadata;
    let data = [];
    let bactData = info.samples;
    let Bdata = [];

//console.log(dataset);
    //console.log(metadata);
    for (let k = 0; k < metadata.length; k++) {
    //    console.log(dataset);
    //    console.log(metadata[k]);
        if (metadata[k].id == dataset) {
            data = metadata[k];
            Bdata = bactData[k];
            //console.log(data);
            d3.select(".id").text(`ID: ${data.id}`);
            d3.select(".ethnicity").text(`Ethnicity: ${data.ethnicity}`);
            d3.select(".gender").text(`Gender: ${data.gender}`);
            d3.select(".age").text(`Age: ${data.age}`);
            d3.select(".location").text(`Location: ${data.location}`);
            d3.select(".bbtype").text(`Bbtype: ${data.bbtype}`);
            d3.select(".wfreq").text(`Wfreq: ${data.wfreq}`);
            console.log(Bdata);
           updategraph(Bdata);
            
        }
    }
    
}

function updategraph(Bdata) {
    let otu_ids = [];
    for (x = 0; x < Bdata.otu_ids.length; x++) {
        otu_ids.push(`otu_id: ${Bdata.otu_ids[x]} `);
        
    }

    let EngBact = [];
    for (x = 0; x < Bdata.otu_labels.length; x++) {
        EngBact.push(Bdata.otu_labels[x]);
    }

    //console.log(otu_ids);
    const objIDNumber = {};
    otu_ids.forEach((element, index) => {
         objIDNumber[element] = (Bdata.sample_values[index])});
    // console.log(Bdata);
    //console.log(objIDNumber);

    const EngNumber = {};
    EngBact.forEach((element, index) => {
        EngNumber[element] = (Bdata.sample_values[index])});

    //console.log(EngNumber);

    let sortable = [];
    for (var id_name in objIDNumber) {
        sortable.push([id_name, objIDNumber[id_name]]);
    }
    //console.log(sortable);

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    //console.log(sortable);

    slicedData = sortable.slice(0, 10);
    //console.log(slicedData);

    let idForGraph = [];

    for (everyItem in slicedData) {
        idForGraph.push(slicedData[everyItem][0]);
    }

    let valuesForGraph = [];
    for (everyItem in slicedData) {
        valuesForGraph.push(slicedData[everyItem][1]);
    }

    console.log(idForGraph);
    console.log(valuesForGraph);

    let sortable2 = [];
    for (var eng_name in EngNumber) {
        sortable2.push([eng_name, EngNumber[eng_name]]);
    }

    //console.log(sortable);

    sortable2.sort(function(a, b) {
        return b[1] - a[1];
    });

    //console.log(sortable);

    sliced2Data = sortable2.slice(0, 10);
    //console.log(slicedData);

    let EngForGraph = [];

    for (everyItem in sliced2Data) {
        EngForGraph.push(sliced2Data[everyItem][0]);
    }
    console.log(EngForGraph);

    let NewTrace = {
        x: valuesForGraph,
        y: idForGraph,
        type: "bar",
        text: EngForGraph,
//        name: labelsForGraph,
        orientation: "h"
     }
    let newData = [NewTrace];
    let layout = {
        height: 600,
        width: 800
       };
     Plotly.newPlot("bar", newData, layout);

     //update bubble graph
     //var BubbleSize = Math.sqrt(valuesForGraph/10);

//     let BubbleSize = Math.sqrt(valuesForGraph);

// let smallBubble = [];
//     for (a = 0; a < Bdata.sample_values.length; a ++) {
//         smallBubble.push(Bdata.sample_values/100);
//     }



let NewBubbleTrace = {
    
    x: Bdata.otu_ids,
    y: Bdata.sample_values,
    mode: "markers",
    text: Bdata.otu_labels,
    

    marker: {
        color: Bdata.otu_ids,
        size: Bdata.sample_values,
        sizemode: 'area',
        sizeref: 0.2

    }
    };

    let NewBubbleData = [NewBubbleTrace];
    let NewBubbleLayout = {
        title: "Bubble plot"
    };
 
 Plotly.newPlot("bubble", NewBubbleData, NewBubbleLayout);



}

