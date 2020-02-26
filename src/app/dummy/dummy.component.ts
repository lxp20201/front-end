import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dummy",
  templateUrl: "./dummy.component.html",
  styleUrls: ["./dummy.component.less"]
})
export class DummyComponent implements OnInit {
  fieldArray: Array<any> = [];
  subfieldArray: Array<any> = [];
  newAttribute: any = {};
  newSubAttribute: any = {};
  isEditItems: boolean;
  isEditItemsSub:  Array<boolean> = [];

  constructor() {}

  ngOnInit() {}

  addFieldValue() {
    if (this.fieldArray.length <= 6) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    } else {
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  onEditCloseItems() {
    console.log(this.isEditItems,"isEditItems")
    this.isEditItems = !this.isEditItems;
    console.log(this.isEditItems,"isEditItems")
  }

  onEditCloseSubItems(i) {
    console.log(this.isEditItemsSub[i],"isEditItemsSub")
    this.isEditItemsSub[i] = !this.isEditItemsSub[i];
    console.log(this.isEditItemsSub[i],"isEditItemsSub")
  }

  addSubFieldValue(i) {
    if (this.subfieldArray.length != 0 && this.subfieldArray[i] && this.subfieldArray[i].length <= 6) {
      this.subfieldArray[i].push(this.newSubAttribute);
      this.newSubAttribute = {};
      console.log(this.subfieldArray[i], " this.subfieldArray"+i);
    } else {
      this.subfieldArray.push([])
      this.subfieldArray[i].push(this.newSubAttribute);
      this.newSubAttribute = {};
      console.log(this.subfieldArray[i], " this.subfieldArray"+i);
    }
    console.log(this.subfieldArray)
  }

  deleteSubFieldValue(i,index) {
    this.subfieldArray[i].splice(index, 1);
  }
}
