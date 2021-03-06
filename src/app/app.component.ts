import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent {
  currentUser: any;
  showHeader: boolean;
  platform: any;

  constructor(private router: Router) {}

  logout() {
    if (this.platform == "LMS") {
      localStorage.setItem("currentUserLMS", null);
      localStorage.removeItem("csrfTokenLMS");
      localStorage.removeItem("userDetailsLMS");
      console.log(
        "logout",
        this.platform,
        this.currentUser,
        typeof this.currentUser
      );
      this.router.navigate(["/LMSlogin"]);
      this.currentUser = null;
    } else if (this.platform == "Admin") {
      localStorage.clear();
      localStorage.setItem("currentUser", null);
      console.log(
        "logout",
        this.platform,
        this.currentUser,
        typeof this.currentUser
      );
      this.router.navigate(["/admin"]);
      this.currentUser = null;
    } else if (this.platform == "CMS") {
      localStorage.clear();
      localStorage.setItem("currentUserCMS", null);
      localStorage.removeItem("csrfTokenCMS");
      localStorage.removeItem("userDetailsCMS");
      console.log(
        "logout",
        this.platform,
        this.currentUser,
        typeof this.currentUser
      );
      this.router.navigate(["/CMSlogin"]);
      this.currentUser = null;
    }
  }

  ngOnInit() {
    this.platform = null;
    this.router.events.subscribe((e: any) => {
      if (
        e &&
        (e.url === "/LMSregister" ||
          (e.snapshot && e.snapshot._routerState.url === "/LMSregister") ||
          (e.routerEvent && e.routerEvent.url === "/LMSregister"))
      ) {
        this.localstorage(false, "LMS", "currentUserLMS", "null");
      } else if (
        e &&
        (e.url === "/LMSlogin" ||
          (e.snapshot && e.snapshot._routerState.url === "/LMSlogin") ||
          (e.routerEvent && e.routerEvent.url === "/LMSlogin"))
      ) {
        this.localstorage(false, "LMS", "currentUserLMS", "null");
      } else if (
        e &&
        (e.url === "/CMSregister" ||
          (e.snapshot && e.snapshot._routerState.url === "/CMSregister") ||
          (e.routerEvent && e.routerEvent.url === "/CMSregister"))
      ) {
        this.localstorage(false, "CMS", "currentUserCMS", "null");
      } else if (
        e &&
        (e.url === "/CMSlogin" ||
          (e.snapshot && e.snapshot._routerState.url === "/CMSlogin") ||
          (e.routerEvent && e.routerEvent.url === "/CMSlogin"))
      ) {
        this.localstorage(false, "CMS", "currentUserCMS", "null");
      } else if (
        e &&
        (e.url === "/LMSForgetPassword" ||
          (e.snapshot &&
            e.snapshot._routerState.url === "/LMSForgetPassword") ||
          (e.routerEvent && e.routerEvent.url === "/LMSForgetPassword"))
      ) {
        this.localstorage(false, "LMS", "currentUserLMS", "null");
      } else if (
        e &&
        (e.url === "/CMSForgetPassword" ||
          (e.snapshot &&
            e.snapshot._routerState.url === "/CMSForgetPassword") ||
          (e.routerEvent && e.routerEvent.url === "/CMSForgetPassword"))
      ) {
        this.localstorage(false, "CMS", "currentUserCMS", "null");
      } else if (
        e &&
        (e.url === "/LMSResetPassword" ||
          (e.snapshot && e.snapshot._routerState.url === "/LMSResetPassword") ||
          (e.routerEvent && e.routerEvent.url === "/LMSResetPassword"))
      ) {
        this.localstorage(false, "LMS", "currentUserLMS", "null");
      } else if (
        e &&
        (e.url === "/CMSResetPassword" ||
          (e.snapshot && e.snapshot._routerState.url === "/CMSResetPassword") ||
          (e.routerEvent && e.routerEvent.url === "/CMSResetPassword"))
      ) {
        this.localstorage(false, "CMS", "currentUserCMS", "null");
      } else if (
        e &&
        (e.url === "/CmsHome" ||
          (e.snapshot && e.snapshot._routerState.url === "/CmsHome") ||
          (e.routerEvent && e.routerEvent.url === "/CmsHome"))
      ) {
        this.localstorage(true, "CMS", "currentUserCMS", null);
      } else if (
        e &&
        (e.url === "/" ||
          (e.snapshot && e.snapshot._routerState.url === "/") ||
          (e.routerEvent && e.routerEvent.url === "/"))
      ) {
        this.localstorage(true, "LMS", "currentUserLMS", null);
      } else if (
        e &&
        (e.url === "/home" ||
          (e.snapshot && e.snapshot._routerState.url === "/home") ||
          (e.routerEvent && e.routerEvent.url === "/home"))
      ) {
        this.localstorage(true, "LMS", "currentUserLMS", null);
      } else if (
        e &&
        (e.url === "/courseCreation" ||
          (e.snapshot && e.snapshot._routerState.url === "/courseCreation") ||
          (e.routerEvent && e.routerEvent.url === "/courseCreation"))
      ) {
        this.localstorage(true, "CMS", "currentUserCMS", null);
      } else if (
        e &&
        (e.url === "/adminDashboard" ||
          (e.snapshot && e.snapshot._routerState.url === "/adminDashboard") ||
          (e.routerEvent && e.routerEvent.url === "/adminDashboard"))
      ) {
        this.localstorage(true, "Admin", "currentUser", null);
        // /courseCreation
      } else if (
        e &&
        (e.url === "/admin" ||
          (e.snapshot && e.snapshot._routerState.url === "/admin") ||
          (e.routerEvent && e.routerEvent.url === "/admin"))
      ) {
        this.localstorage(false, "Admin", "currentUser", "null");
      } else if (
        e &&
        (e.url === "/dummy" ||
          (e.snapshot && e.snapshot._routerState.url === "/dummy") ||
          (e.routerEvent && e.routerEvent.url === "/dummy"))
      )
        this.showHeader = false;
      else this.showHeader = true;
    });
  }

  localstorage(header, platform, currentUsername, currentUserVal) {
    if (currentUserVal) {
      this.showHeader = header;
      this.platform = platform;
      this.currentUser = currentUserVal;
      localStorage.setItem(currentUsername, currentUserVal);
    } else {
      this.showHeader = header;
      this.platform = platform;
      var currentUser = localStorage.getItem(currentUsername);
      this.currentUser = currentUser ? currentUser : "null";
      console.log(this.currentUser, this.platform, this.showHeader);
    }
  }
}
