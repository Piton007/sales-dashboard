import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges, ViewChildren, ɵConsole } from '@angular/core';



type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: any, v2: any) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

interface SortEvent<T> {
  column: keyof T | "";
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader<T> {

  @Input() sortable: keyof T | "" = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent<T>>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}


export class Table<T>  {

  constructor() { }
  _data:any[] = []
  data:any[] = []
  isDataAvailable:boolean = false

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader<T>>;

 
  ngDoCheck(): void {
    if(this.data.length > 0){
      this.isDataAvailable = true
      document.querySelector(".table-spinner")?.classList.add("d-none")
    }
  }
  onSort(event:SortEvent<T>){

    this.resetHeader(event);
    this.sorting(event)
  }


  private resetHeader({column}: SortEvent<T>){
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  }

  private sorting({column,direction}: SortEvent<T>){
    if (direction === '' || column === '') {
      this.data = this._data;
    } else {
      this.data= [...this._data].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }


}
