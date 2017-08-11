//Requirements
// User can see US Gross Domestic Product by quarter, over time.
// User can mouse over a bar and see a tooltip with the GDP amount and exact year and month that bar represents.

$(document).ready(function() {
  //Variables
  const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  dataArr= [];
  dataArrLabels = [];
  dataArrValues = [];
  let myChart = document.getElementById('myChart').getContext('2d');
  //Set Global Chart Options
  Chart.defaults.global.defaultFontFamily = 'Acme';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = 'navy';
  Chart.defaults.global.tooltips.caretSize = 10;
  Chart.defaults.global.tooltips.backgroundColor = 'rgba(0,0,0,0.7)';
  Chart.defaults.global.tooltips.borderColor = 'white';
  Chart.defaults.global.tooltips.borderWidth = 2;
  
  //Execute
  getChartData();
  
  //Functions
  function getChartData () {
    axios.get(url).then(response => {
      dataArr.push(...response.data.data) //My first use of Spread Operator :)
      //console.log(...dataArr);
      extractData();
    });
  }
  function extractData () {
    for (i=0;i<dataArr.length;i++) {
      dataArrLabels.push(dataArr[i][0]);
      dataArrValues.push(dataArr[i][1]);
    }
      for (i=0;i<dataArrLabels.length;i++) {
        dataArrLabels[i] = dataArrLabels[i].replace('01-01', 'Q1');
        dataArrLabels[i] = dataArrLabels[i].replace('04-01', 'Q2');
        dataArrLabels[i] = dataArrLabels[i].replace('07-01', 'Q3');
        dataArrLabels[i] = dataArrLabels[i].replace('10-01', 'Q4');
    }
    updateChart();
  }
  function updateChart() {
    let PopChart = new Chart(myChart, {
  type: 'bar',
  data: {
    labels: dataArrLabels,
    datasets:[{
      label:'GDP',
      data: dataArrValues,
      backgroundColor: 'rgba(128, 128, 255, .8)',
      hoverBackgroundColor: 'lightblue'
    }]
  },
  options: {
    title: {display: false, text:'U.S. Gross Domestic Product', fontSize: 25, fontColor:'black'},
    legend: {position:'right', display: false},
    scales: {gridlines: {offsetGridLines: false}, //This should center label under bar/tick but doesn't seem to work...
             xAxes: [{categoryPercentage: 1.0, barPercentage: 1.0, //Removes spacing from between bars
                      ticks: {
                        minRotation: 360, //Makes labels horitzonal
                        autoSkip: true,
                        maxTicksLimit: 12 //Limit number of labels
                      }}], 
             yAxes: [{
               ticks: {callback: function(value, index, values) {return '$' + value;}}, //Adds Dollar sign
               scaleLabel: {display: true, labelString: 'GDP (Billions of Dollars)'}
             }]
            },
    layout: {padding: {left: 15, right: 0, top: 0, bottom: 0}},
  }
});
  }
  
  });