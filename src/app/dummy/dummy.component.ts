import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dummy",
  templateUrl: "./dummy.component.html",
  styleUrls: ["./dummy.component.less"]
})
export class DummyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  name = "Angular 6";

  fieldArray: Array<any> = [
    {
      name: "Default Name 1"
    },
    {
      name: "Default Name 2"
    }
  ];
  newAttribute: any = {};

  firstField = true;
  firstFieldName = "First Item name";
  isEditItems: boolean;

  // candidates: any[] = [
  //   {
  //     'name': 'Default Name',
  //     'title': 'Job Title',
  //   },
  //   {
  //     'name': 'Default Name 2',
  //     'title': 'Job Title',
  //   }
  // ];

  addFieldValue(index) {
    if (this.fieldArray.length <= 5) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    } else {
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
  }
}
