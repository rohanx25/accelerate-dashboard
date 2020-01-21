import { Component } from '@angular/core';

// AMCharts Modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


// Using Material theme of AmCharts
am4core.useTheme(am4themes_animated)
am4core.useTheme(am4themes_material);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  batchData = [{
    batchId: "BE_1",
    success: 1200,
    failed: 300,
    tbp: 600
  }, {
    batchId: "BE_2",
    success: 900,
    failed: 200,
    tbp: 300
  }, {
    batchId: "BE_3",
    success: 1100,
    failed: 200,
    tbp: 500
  }, {
    batchId: "BE_4",
    success: 700,
    failed: 100,
    tbp: 4700
  }, {
    batchId: "BE_5",
    success: 500,
    failed: 1500,
    tbp: 4500
  }, {
    batchId: "BE_6",
    success: 500,
    failed: 2500,
    tbp: 600
  }, {
    batchId: "BE_7",
    success: 700,
    failed: 200,
    tbp: 400
  }, {
    batchId: "BE_8",
    success: 600,
    failed: 200,
    tbp: 300
  }, {
    batchId: "BE_9",
    success: 500,
    failed: 50,
    tbp: 400
  }, {
    batchId: "BE_10",
    success: 500,
    failed: 1500,
    tbp: 300
  }, {
    batchId: "BE_11",
    success: 250,
    failed: 500,
    tbp: 600
  }]
  documentData = [{
    "batchId": "BE_1",
    total: 16220,
    tbp: 5000,
    success: 9200,
    failed: 2020,
    start: new Date("2019-12-23T18:25:43-05:00").toDateString(),
    end: "",
  }, {
    "batchId": "BE_2",
    total: 18227,
    tbp: 6400,
    success: 10400,
    failed: 2027,
    start: new Date("2019-12-24T18:25:43-05:00").toDateString(),
    end: new Date("2019-12-26T18:25:43-05:00").toDateString(),
  }, {
    "batchId": "BE_3",
    total: 21434,
    tbp: 7800,
    success: 11600,
    failed: 2034,
    start: new Date("2019-12-25T18:25:43-05:00").toDateString(),
    end: "",
  }, {
    "batchId": "BE_4",
    total: 24041,
    tbp: 9200,
    success: 12800,
    failed: 2041,
    start: new Date("2019-12-26T18:25:43-05:00").toDateString(),
    end: "",
  }, {
    "batchId": "BE_5",
    total: 26648,
    tbp: 10600,
    success: 14000,
    failed: 2048,
    start: new Date("2019-12-27T18:25:43-05:00").toDateString(),
    end: new Date("2019-12-31T18:25:43-05:00").toDateString(),
  }, {
    "batchId": "BE_6",
    total: 19255,
    tbp: 12000,
    success: 15200,
    failed: 2055,
    start: new Date("2019-12-28T18:25:43-05:00").toDateString(),
    end: "",
  }, {
    "batchId": "BE_7",
    total: 31862,
    tbp: 13400,
    success: 16400,
    failed: 2062,
    start: new Date("2019-12-29T18:25:43-05:00").toDateString(),
    end: "",
  }, {
    "batchId": "BE_8",
    total: 34469,
    tbp: 14800,
    success: 17600,
    failed: 2069,
    start: new Date("2019-12-30T18:25:43-05:00").toDateString(),
    end: "",
  }, {
    "batchId": "BE_9",
    total: 37076,
    tbp: 16200,
    success: 18800,
    failed: 2076,
    start: new Date("2019-12-31T18:25:43-05:00").toDateString(),
    end: "",
  }, {
    "batchId": "BE_10",
    total: 39683,
    tbp: 17600,
    success: 20000,
    failed: 2083,
    start: new Date("2020-01-01T18:25:43-05:00").toDateString(),
    end: new Date("2020-01-05T18:25:43-05:00").toDateString(),
  }]

  colorList = [
    am4core.color("#44bd32"), //Success
    am4core.color("#e74c3c"), //Failed
    am4core.color("#f1c40f")  //TBP
  ]

  ngOnInit() {
    this.extractionBatchChart();
    this.batchStatus(0);
    this.documentStatus(0);
  }

  extractionBatchChart() {
    // Create chart instance
    let chart = am4core.create("extractionBatchChart", am4charts.XYChart);

    // Add data
    chart.data = this.batchData;


    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    // Color Change
    chart.colors.list = this.colorList

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "batchId";
    categoryAxis.renderer.grid.template.opacity = 0;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "batchId";
      series.stacked = true;
      series.name = name;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{valueX}: {categoryY}";

    }

    createSeries("success", "Success");
    createSeries("failed", "Failed");
    createSeries("tbp", "To Be Processed");
  }

  // Doughnut chart for Batches
  batchStatus(index) {
    let chart = am4core.create("batchStatus", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        name: "Success",
        value: this.batchData[index].success
      },
      {
        name: "Failed",
        value: this.batchData[index].failed
      },
      {
        name: "To Be Processed",
        value: this.batchData[index].tbp
      }
    ];

    chart.innerRadius = 50;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "name";

    series.hiddenState.properties.endAngle = -90; //Creates rotation

    series.colors.list = this.colorList
  }

  // Doughnut chart for Documents
  documentStatus(index) {
    let chart = am4core.create("documentStatus", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        name: "Success",
        value: this.documentData[index].success
      },
      {
        name: "Failed",
        value: this.documentData[index].failed
      },
      {
        name: "To Be Processed",
        value: this.documentData[index].tbp
      }
    ];

    chart.innerRadius = 50;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "name";

    series.hiddenState.properties.endAngle = -90; //Creates rotation

    series.colors.list = this.colorList
  }
}