import { Component } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 6';

  constructor(private papa: PapaParseService) {
  }

  ConvertCSVtoJSON() {
    console.log(JSON.stringify(this.test));
    // let csvData = '"Hello","World!"';
    // this.papa.parse(csvData, {
    //   complete: (results) => {
    //     console.log('Parsed  : ', results.data[0][1]);
    //     // console.log(results.data.length);
    //   }
    // });
  }
  test = [];
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {
            let orderDetails = {
              order_id: results.data[i].Address,
              age: results.data[i].Age
            };
           this.test.push(orderDetails);
          }
          // console.log(this.test);
          console.log('Parsed: k', results.data);
        }
      });
    }
  }

}
