import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../_services";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.viewAllCourses();
    console.log('constructor .....................................')
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.viewAllCourses();
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem("currentUserCMS");
    this.viewAllCourses();
  }

  viewAllCourses() {
    var u = localStorage.getItem("userDetailsCMS");
    if (u) {
      this.userDetails = JSON.parse(u);
      this.authenticationService
        .courseView(this.userDetails._id)
        .subscribe(result => {
          if (result.data["getcourse"].success === true) {
            this.allCourses = result.data["getcourse"].message;
            console.log("this.allCourses", this.allCourses);
          }
        });
    }
  }

  gotoCourse(id) {
    localStorage.setItem("courseID", id);
    console.log(id);
    this.router.navigate(["/courseview"]);
  }
}
