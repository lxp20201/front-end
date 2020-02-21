import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../_services";
import { Router } from "@angular/router";

@Component({
  selector: "app-cms-home",
  templateUrl: "./cms-home.component.html",
  styleUrls: ["./cms-home.component.less"]
})
export class CmsHomeComponent implements OnInit {
  currentUser: string;
  userDetails: any;
  allCourses: any = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.currentUser = localStorage.getItem("currentUserCMS");
    console.log(this.currentUser)
    this.viewAllCourses();
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem("currentUserCMS");
    this.viewAllCourses();
  }

  viewAllCourses() {
    var u = localStorage.getItem("userDetailsCMS");
    if(u) {
      this.userDetails = JSON.parse(u);
      console.log(u);
      this.authenticationService
        .courseView(this.userDetails._id)
        .subscribe(result => {
          console.log(result, "llllllllllllllllllllllllllllllllllllll");
          if (result.data["getcourse"].success === true) {
            this.allCourses = result.data["getcourse"].message;
            console.log("this.allCourses", this.allCourses);
          }
        });
    }

  }

  gotoCourse(id) {
    localStorage.setItem('courseID',id)
    console.log(id)
    this.router.navigate(["/courseview"]);
  }
}
