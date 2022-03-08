import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {
  docGroups:any = [
    {'title':'SMA Receipts',docs:['Spring Sem 2022', 'Autumn Sem 2021','Autumn Sem 2019']},
    {'title':'Lab Repairs',docs:['Broken Beaker - 2019', 'Broken Beaker - 2020','Broken Beaker - 2021', 'Broken Beaker Cupboard - 2022']}
  ]
  constructor() { }

  ngOnInit(): void {
  }

  tiles = [
    {
      text: 'One',
      cols: 3,
      rows: 1,
      color: 'lightblue'
    },
    {
      text: 'Two',
      cols: 1,
      rows: 2,
      color: 'lightgreen'
    },
    {
      text: 'Three',
      cols: 1,
      rows: 1,
      color: 'lightpink'
    },
    {
      text: 'Four',
      cols: 2,
      rows: 1,
      color: '#DDBDF1'
    }
  ];
  
}
