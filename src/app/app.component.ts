import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";

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
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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

  }]
  ngOnInit() {
    this.extractionBatchChart();
    this.batchStatus(0);
  }

  extractionBatchChart() {
    // Create chart instance
    let chart = am4core.create("extractionBatchChart", am4charts.XYChart);

    // Add data
    chart.data = this.batchData;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

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
  }
  documentStatus() {

  }
}