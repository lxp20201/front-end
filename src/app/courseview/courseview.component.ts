import { Component, OnInit } from "@angular/core";
import { AuthenticationService, AlertService } from "../_services";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
@Component({
  selector: "app-courseview",
  templateUrl: "./courseview.component.html",
  styleUrls: ["./courseview.component.less"]
})
export class CourseviewComponent implements OnInit {
  userDetails: any;
  course: any;
  // CourseViewForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    let id = localStorage.getItem("courseID");
    var u = localStorage.getItem("userDetailsCMS");
    this.userDetails = JSON.parse(u);
    this.authenticationService
      .getcoursebyid(this.userDetails._id, id)
      .subscribe(result => {
        if (result.data["getcoursebyid"].success === true) {
          this.course = result.data["getcoursebyid"].message[0];
        }
      });
  }

  ngOnInit() {
  }

  CreateNewSection($scope) {
    // get_section_id.hidden = get_section_id.hidden ? false : true;
    // background-color: #d7e1e2;
    var innerhtml_div =
      '<div id="sectiondiv" class="modules-brief" ng-show = "IsVisible"><div><input type="text" name="add_section" formControlName="add_section" placeholder="Add Section*" class="form-control"/></div><br/><section><button (ng-click)="CreateNewSubSection()">New SubSection</button></section>';
    console.log("CREATE NEW SECTION", $scope);
    var get_section_id = document.getElementById("sectiondiv");
    console.log("xxxxxxxxxxxxxxx", get_section_id);
    var get_main_id = document.getElementById("coursediv");

    var div_id = document.createElement("DIV");
    div_id.innerHTML = innerhtml_div;
    var linebreak = document.createElement("br");

    div_id.style.backgroundColor = "#d7e1e2";
    console.log("coursedivcoursedivcoursediv", div_id);
    // var get_new_id = document.getElementById("coursediv");
    var div_list = [];
    div_list.push(div_id);
    get_main_id.appendChild(div_id);
    get_main_id.appendChild(linebreak);
  }

  CreateNewSubSection($scope) {
    // get_section_id.hidden = get_section_id.hidden ? false : true;
    // background-color: #d7e1e2;
    var innerhtml_div =
      '<div id="subsectiondiv" class="modules-brief" ng-show = "IsVisible"><div><input type="text" name="add_sub_section" formControlName="add_sub_section" placeholder="Add Sub Section*" class="form-control"/></div><br/><section><button (ng-click)="CreateNewUnit()">New Unit</button></section></div>';
    console.log(
      "CreateNewSubSectionCreateNewSubSection###################",
      $scope
    );
    var get_sub_section_id = document.getElementById("subsectiondiv");
    var get_section_id = document.getElementById("sectiondiv");
    console.log("xxxxxxxxxxxxxxx", get_sub_section_id);
    var get_main_id = document.getElementById("coursediv");

    var div_id = document.createElement("DIV");
    div_id.innerHTML = innerhtml_div;
    var linebreak = document.createElement("br");

    div_id.style.backgroundColor = "#86b2c7";
    console.log("coursedivcoursedivcoursediv", div_id);
    // var get_new_id = document.getElementById("coursediv");
    var div_list = [];
    div_list.push(div_id);
    get_section_id.appendChild(div_id);
    get_section_id.appendChild(linebreak);
  }
}
