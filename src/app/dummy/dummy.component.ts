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
  newAttribute: any = [];
  newSubAttribute: any = [];
  newUnitSubAttribute: any = [];
  isEditItems: boolean;
  isEditItemsSub: Array<boolean> = [];
  isEditUnits: Array<boolean> = [];

  constructor() {}

  ngOnInit() {}

  addFieldValue() {
    if (this.fieldArray.length <= 6) {
      this.fieldArray.push({section : this.newAttribute});
      this.newAttribute = [];
    } else {
      this.fieldArray.push({section : this.newAttribute});
      this.newAttribute = [];
    }
  }

  deleteFieldValue(val,i) {
    console.log(this.fieldArray,val,i)
    this.fieldArray.splice(i, 1);
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
    if (
      this.fieldArray.length != 0 &&
      this.fieldArray[i] &&
      this.fieldArray[i]['section'].length <= 6
    ) {
      this.fieldArray[i]['section'].push({subsection : this.newSubAttribute});
      this.newSubAttribute = [];
    } else {
      this.fieldArray[i]['section'].push({subsection : this.newSubAttribute});
      this.newSubAttribute = [];
    }
  }

  deleteSubFieldValue(val,i, j) {
    console.log(this.fieldArray,val,i,j)
    this.fieldArray[i]['section'].splice(j, 1);
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  onEditCloseUnits(i, j) {
    this.isEditUnits[j] = !this.isEditUnits[j];
  }

  addUnits(i, j, k) {
    if (
      this.fieldArray.length != 0 &&
      this.fieldArray[i] &&
      this.fieldArray[i]['section'] && 
      this.fieldArray[i]['section'].length <= 6 && 
      this.fieldArray[i]['section']['subsection'] && this.fieldArray[i]['section']['subsection'].length <= 6
    ) {
      this.fieldArray[i].section[j].subsection.push({unit : this.newUnitSubAttribute});
      console.log(this.fieldArray);
      // this.unitArray[j].push(this.newUnitSubAttribute);
      this.newUnitSubAttribute = [];
    } else {
     this.fieldArray[i].section[j].subsection.push({unit : this.newUnitSubAttribute});
      console.log(this.fieldArray);
      // this.unitArray.push([]);
      // this.unitArray[j].push(this.newUnitSubAttribute);
      this.newUnitSubAttribute = [];
    }
  }

  deleteUnitValue(val,i, j, k) {
    console.log(this.fieldArray,i,j,k)
    this.fieldArray[i]['section'][j].subsection.splice(k, 1);
  }

  publishSubSection(i, j) {
    // console.log(i,j,':index--------',this.fieldArray,this.subfieldArray,this.unitArray)
    for (var key in this.subfieldArray[i]) {
      for (var key1 in this.unitArray) {
        if (key == key1) {
          this.subfieldArray[i][key].push(this.unitArray[key1]);
        }
      }
    }
    console.log(":subfieldArray--------", this.subfieldArray);
  }

  publishSections() {
    for (var key in this.fieldArray) {
      for (var key1 in this.subfieldArray) {
        if (key == key1) {
          this.fieldArray[key].push(this.subfieldArray[key1]);
        }
      }
    }
    console.log(":this.fieldArray--------", this.fieldArray);
  }
}
