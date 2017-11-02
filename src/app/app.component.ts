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
    this.ngShowForm();
  }
  title = 'app';
  // Pie
  public pieChartLabels: string[] = ['Revenus', 'Dépenses'];
  public pieChartType: string = 'pie';
  public connectValues: any;
  public transferValue: any;
  public income:number;
  public outcome:number;
  public pieChartData: number[] = [0, 0];

  public connect(ngForm) {
    console.log(ngForm);
    this.http.put("https://bankin-ingesup.herokuapp.com/auth/login", ngForm).subscribe(data => {
      this.connectValues = data
      this.getUserTransfer();
      this.ngShowForm();
    }
    );
    
  }
  public graphDefinition(){
    this.income=0;
    this.outcome=0;
    this.transferValue.transfers.forEach(element => {
      if (element.amount > 0)
      {
        this.income = this.income + element.amount;
      }
      else{
        let result = Math.abs(element.amount);
        this.outcome = this.outcome + result;
      }
    this.pieChartData=[this.income,this.outcome];
    });
  }
  public getUserTransfer() {
    
    this.http.get("https://bankin-ingesup.herokuapp.com/transfer/" + this.connectValues.user.username,
      {
        headers: new HttpHeaders().set('Authorization', this.connectValues.token)
      }
    ).subscribe(data => {
      this.transferValue = data;
      this.graphDefinition();
    });
  }
  public outMoney(ngForm)
  {
    let amount:object = JSON.parse('{"amount":' + '-' + ngForm.amount +'}');
    this.http.post("https://bankin-ingesup.herokuapp.com/transfer/" + this.connectValues.user.username,amount,
    {
      headers: new HttpHeaders().set('Authorization', this.connectValues.token)
    }
  ).subscribe(data => {
  });
  this.getUserTransfer();
  }
  public inMoney(ngForm)
  {
    this.http.post("https://bankin-ingesup.herokuapp.com/transfer/" + this.connectValues.user.username,ngForm,
    {
      headers: new HttpHeaders().set('Authorization', this.connectValues.token)
    }
  ).subscribe(data => {
  });
  this.getUserTransfer();
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  public ngShowForm()
  {
      if (this.connectValues == null)
      {
      return false;
      }
      else
      {
      return true;
      }

  }

}
