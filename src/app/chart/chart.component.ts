import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartData, ChartTypeEnum, defaultChartData} from "../shared/resources";
import {BaseChartDirective} from "ng2-charts";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartData: ChartData = defaultChartData;
  @Input() selectedColumn: string = '';
  @Input() chartType: ChartTypeEnum = ChartTypeEnum.Line;
  ChartTypeEnum = ChartTypeEnum;

  constructor() { }

  ngOnInit(): void {
  }
}
