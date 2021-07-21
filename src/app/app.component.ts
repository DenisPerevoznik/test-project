import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {ChartTypeEnum, ColumnTypeEnum, ChartData, defaultChartData} from "./shared/resources";
import {DataService} from "./shared/services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  columns: string[] = [];
  readyData: any[] = [];
  chartData: ChartData = defaultChartData;
  selectedColumn = '';
  columnType: ColumnTypeEnum = ColumnTypeEnum.String;
  chartType: ChartTypeEnum = ChartTypeEnum.Line;

  constructor(private dataService: DataService) {
  }

  openFile(){
    this.dataService.loadFile()
      .subscribe((file: any) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const arrayBuffer: any = fileReader.result;
          const data = new Uint8Array(arrayBuffer);
          const arr = [];

          for (const dataItem of data) {
            arr.push(String.fromCharCode(dataItem));
          }

          const bstr = arr.join("");
          const workbook = XLSX.read(bstr, {type:"binary"});
          const tableData = workbook.Sheets[workbook.SheetNames[0]];
          this.readyData = XLSX.utils.sheet_to_json(tableData,{raw:true});
          this.columns = Object.keys(this.readyData[0]).filter(key => key !== 'Id');
          console.log('XLSX:', this.readyData);
        }
      });
  }

  ngOnInit(): void {
    this.openFile();
  }

  onSelectColumn(){
    this.generateChartData();
  }

  private defineColumnType(): ColumnTypeEnum{

    const foundNum = this.readyData.find(row => typeof row[this.selectedColumn] === 'number');

    if(!!foundNum){
      return ColumnTypeEnum.Number;
    }
    return ColumnTypeEnum.String;
  }

  private setChartType(){

    switch (this.columnType){
      case ColumnTypeEnum.String:
        this.chartType = ChartTypeEnum.Bar;
        break;

      case ColumnTypeEnum.Number:
        this.chartType = ChartTypeEnum.Line;
        break;

      default:
        this.chartType = ChartTypeEnum.Line;
    }
  }

  private generateChartData(){

    this.columnType = this.defineColumnType();
    this.setChartType();

    if(this.columnType === ColumnTypeEnum.Number){

      const data = this.readyData.map(row => {
        const val = row[this.selectedColumn];
        return val === 'NA' ? 0 : val;
      });
      this.chartData.dataSource = [
        {data, label: this.selectedColumn}
      ];

      this.chartData.labels = this.readyData.map(row => row.Id.toString());
      return;
    }

    const stringsObject: any = {};
    this.readyData.forEach(row => {

      const key = row[this.selectedColumn];
      if(key in stringsObject){
        stringsObject[key] = stringsObject[key] + 1;
      }
      else{
        stringsObject[key] = 0;
      }
    });

    const data: any[] = [];
    const labels: string[] = [];
    Object.keys(stringsObject).forEach(key => {
      data.push(stringsObject[key]);
      labels.push(key);
    });

    this.chartData = {
      dataSource: [
        {data, label: this.selectedColumn}
      ],
      labels
    };
  }
}
