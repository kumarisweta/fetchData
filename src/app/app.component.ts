import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public tableList: any;
  public filteredList: any;
  public isLoading: boolean;
  public showError: boolean;

  constructor(private httpClient: HttpClient) {
    this.tableList = [];
    this.filteredList = [];
    this.isLoading = true;
    this.showError = false;
  }
  ngOnInit(): void {
    this.gettableList();
  }

  gettableList() {
    this.httpClient
      .get(
        "https://stage-live.testenvs.dev/api/v1/live/partner/lobby?currency=mBTC&partnerId=60fe77298861f37264ac3b72"
      )
      .subscribe(
        (result: any) => {
          this.tableList = Object.values(result.tables);
          this.filteredList = this.tableList;
          this.isLoading = false;
        },
        (error) => {
          this.showError = true;
          console.log(
            "Something went wrong, Please try again... ",
            error.message
          );
        }
      );
  }

  searchTerm = "";
  filterTables() {
    this.filteredList = this.tableList.filter(
      (t: {
        tableId: string;
        gameProvider: string;
        gameType: string;
        name: string;
        currency: string;
      }) =>
        t.tableId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.gameProvider.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.gameType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.currency.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  shouldShowEllipsis(name: string): boolean {
    return name.split(" ").length > 4;
  }

  shortenName(name: string): string {
    const words = name.split(" ");
    return words.slice(0, 4).join(" ") + "...";
  }
}
