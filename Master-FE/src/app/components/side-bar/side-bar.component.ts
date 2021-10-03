import { Component, OnInit } from "@angular/core";
import { sideBarItems } from "../../../mocks/side-bar.mock";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent implements OnInit {
  //TO DO: get services from DB
  services = sideBarItems;
  constructor() {}

  ngOnInit(): void {
    window.addEventListener("DOMContentLoaded", () => {
      const tabs = document.querySelectorAll('[role="tab"]');
      const tabList = document.querySelector('[role="tablist"]');

      // Add a click event handler to each tab
      tabs.forEach((tab) => {
        tab.addEventListener("click", this.changeTabs);
      });
    });
  }

  changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent
      .querySelectorAll('[aria-selected="true"]')
      .forEach((t) => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    grandparent
      .querySelectorAll('[role="tabpanel"]')
      .forEach((p) => p.setAttribute("hidden", true));

    // Show the selected panel
    grandparent.parentNode
      .querySelector(`#${target.getAttribute("aria-controls")}`)
      .removeAttribute("hidden");
  }
}
