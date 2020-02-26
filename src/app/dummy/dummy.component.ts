import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dummy",
  templateUrl: "./dummy.component.html",
  styleUrls: ["./dummy.component.less"]
})
export class DummyComponent implements OnInit {
  fieldArray: Array<any> = [];
  subfieldArray: Array<any> = [];
  unitArray: Array<any> = [];
  newAttribute: any = {};
  newSubAttribute: any = {};
  newUnitSubAttribute: any = {};
  isEditItems: boolean;
  isEditItemsSub:  Array<boolean> = [];
  isEditUnits:  Array<boolean> = [];

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
    this.isEditItems = !this.isEditItems;
  }
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
  onEditCloseSubItems(i) {
    this.isEditItemsSub[i] = !this.isEditItemsSub[i];
  }

  addSubFieldValue(i) {
    if (this.subfieldArray.length != 0 && this.subfieldArray[i] && this.subfieldArray[i].length <= 6) {
      this.subfieldArray[i].push(this.newSubAttribute);
      this.newSubAttribute = {};
    } else {
      this.subfieldArray.push([])
      this.subfieldArray[i].push(this.newSubAttribute);
      this.newSubAttribute = {};
    }
  }

  deleteSubFieldValue(i,index) {
    this.subfieldArray[i].splice(index, 1);
  }
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
  onEditCloseUnits(i,j) {
    this.isEditUnits[j] = !this.isEditUnits[j];
  }

  addUnits(i,j,k) {
    console.log(i,j,k,)
    if (this.unitArray.length != 0 && this.unitArray[j] && this.unitArray[j].length <= 6) {
      this.unitArray[j].push(this.newUnitSubAttribute);
      // this.subfieldArray[i][j].push(this.newUnitSubAttribute);
      this.newUnitSubAttribute = {};
      console.log(this.subfieldArray[i],this.unitArray[j],'INSIDE IF')
    } else {
      this.unitArray.push([])
      this.unitArray[j].push(this.newUnitSubAttribute);
      // this.subfieldArray[i][j].push(this.newUnitSubAttribute);
      this.newUnitSubAttribute = {};
      console.log(this.subfieldArray[i],this.unitArray[j],'INSIDE ELSE')
    }
    // console.log('unit :', this.unitArray)
    // // console.log('unit :'+j, this.unitArray[j])
    // console.log('sub section : ',this.subfieldArray)
    // // console.log('sub section :'+j, this.subfieldArray[j])
    // console.log('section : ' ,this.fieldArray)
    // // console.log('section :'+j, this.fieldArray[j])
  }

  deleteUnitValue(i,j,k) {
    this.unitArray[j].splice(k, 1);
  }
}
