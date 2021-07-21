
export enum ColumnTypeEnum {
  String = 'string',
  Number = 'number'
};

export enum ChartTypeEnum {
  Line = 'line',
  Bar = 'bar'
}

export interface ChartData {

  dataSource: {data: number[], label: string}[];
  labels: string[];
}

export interface FileData{
  columns: string[],
  data: any[]
}

export const defaultChartData: ChartData = {
  dataSource: [
    {data: [], label: ''}
  ],
  labels: []
}
