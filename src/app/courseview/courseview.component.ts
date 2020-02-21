import { Component, OnInit } from "@angular/core";
import { AuthenticationService, AlertService } from "../_services";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-courseview",
  templateUrl: "./courseview.component.html",
  styleUrls: ["./courseview.component.less"]
})
export class CourseviewComponent implements OnInit {
  userDetails: any;
  course: any;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    let id = localStorage.getItem("courseID");
    var u = localStorage.getItem("userDetailsCMS");
    this.userDetails = JSON.parse(u);
    console.log('u',this.userDetails._id)
    this.authenticationService
      .getcoursebyid(this.userDetails._id, id)
      .subscribe(result => {
        if (result.data["getcoursebyid"].success === true) {
          console.log(result.data["getcoursebyid"].message);
          this.course = result.data["getcoursebyid"].message[0]
          console.log('dfsdf',this.course);
        }
      });
  }

  ngOnInit() {}

  // viewAllCourses() {
  //   var u = localStorage.getItem("userDetailsCMS");
  //   this.userDetails = JSON.parse(u);
  //   console.log(u);
  //   this.authenticationService
  //     .getcoursebyid(this.userDetails._id)
  //     .subscribe(result => {
  //       console.log(result, "llllllllllllllllllllllllllllllllllllll");
  //       if (result.data["getcourse"].success === true) {
  //       }
  //     });
  // }
}
