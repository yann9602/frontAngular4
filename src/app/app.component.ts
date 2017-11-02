import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 

  constructor(private http: HttpClient) {
  }
  title = 'app';
  // Pie
  public pieChartLabels: string[] = ['Revenus', 'Dépenses'];
  public pieChartData: number[] = [300, 500];
  public pieChartType: string = 'pie';
  public connectValues: any;
  public transferValue: any;

  public connect(ngForm) {
    console.log(ngForm);
    this.http.put("https://bankin-ingesup.herokuapp.com/auth/login", ngForm).subscribe(data => {
      this.connectValues = data
    }
    );
    this.getUserTransfer();
  }

  public outMoney(ngForm) {
    this.http.get("https://bankin-ingesup.herokuapp.com/transfer/" + this.connectValues.user.username).subscribe(data =>
      console.log(data)
    );
  }

  public getUserTransfer() {
    
    this.http.get("https://bankin-ingesup.herokuapp.com/transfer/" + this.connectValues.user.username,
      {
        headers: new HttpHeaders().set('Authorization', this.connectValues.token)
      }
    ).subscribe(data => {
      this.transferValue = data;
    });
    this.transferValue.transfers.forEach(element => {
      console.log(element);
    });
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  public ngShowForm(connectValues)
  {
      if (connectValues == null)
      {
      return false;
      }
      else
      {
      return true;
      }

  }

}
