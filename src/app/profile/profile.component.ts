// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { AdminService } from '../service/admin.service';
// import * as Highcharts from 'highcharts';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit, AfterViewInit {
  // adminData: any = {};
  // profileImg = "https://i.postimg.cc/gJkQHZkN/Screenshot-2024-08-05-204628.png";
  // Highcharts: typeof Highcharts = Highcharts;
  // chartOptions: any = {};
  // pieChartOptions: any = {};
  // expenses: any = [];

//   constructor(private s: AdminService) {
    // this.chartOptions = {
    //   chart: {
    //     type: 'spline'
    //   },
    //   title: {
    //     text: 'Monthly Expense Summary'
    //   },
    //   xAxis: {
    //     categories: [
    //       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    //     ],
    //     accessibility: {
    //       description: 'Months of the year',
    //       enabled: false
    //     }
    //   },
    //   yAxis: {
    //     title: {
    //       text: 'Expense Amount'
    //     },
    //     labels: {
    //       format: '{value} $'
    //     }
    //   },
    //   tooltip: {
    //     crosshairs: true,
    //     shared: true
    //   },
    //   credits: {
    //     enabled: false
    //   },
    //   plotOptions: {
    //     spline: {
    //       marker: {
    //         radius: 4,
    //         lineColor: '#666666',
    //         lineWidth: 1
    //       }
    //     }
    //   },
    //   series: []
    // };

    // this.pieChartOptions = {
    //   chart: {
    //     type: 'pie'
    //   },
    //   credits: {
    //     enabled: false
    //   },
    //   title: {
    //     text: 'Total Expense Comparison'
    //   },
    //   tooltip: {
    //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //   },
    //   accessibility: {
    //     point: {
    //       valueSuffix: '%'
    //     }
    //   },
    //   plotOptions: {
    //     pie: {
    //       allowPointSelect: true,
    //       cursor: 'pointer',
    //       dataLabels: {
    //         enabled: true,
    //         format: '<b>{point.name}</b>: {point.percentage:.1f} %'
    //       }
    //     }
    //   },
    //   series: [{
    //     name: 'Expense Type',
    //     colorByPoint: true,
    //     data: []
    //   }]
    // };
//   }

//   ngOnInit(): void {
    // if (localStorage.getItem('admin')) {
    //   this.adminData = JSON.parse(localStorage.getItem('admin') || "");
    //   console.log(this.adminData);
    //   if (this.adminData.profile !== "") {
    //     this.profileImg = this.adminData.profile;
    //   }
    // }
//   }

//   ngAfterViewInit(): void {
//     this.prepareChartData(); // Initialize the chart after view initialization
//   }

//   prepareChartData() {
//     this.s.getAllExpenseApi().subscribe((res) => {
//       this.expenses = res;

//       // Prepare data for the charts after expenses are loaded
//       const monthlyData = {
//         cash: new Array(12).fill(0),
//         card: new Array(12).fill(0),
//         online: new Array(12).fill(0)
//       };

//       const totalData = {
//         cash: 0,
//         card: 0,
//         online: 0
//       };

//       this.expenses.forEach((expense:any) => {
//         const date = new Date(expense.expenseDate);
//         const month = date.getMonth();

//         if (expense.expenseType.toLowerCase() === 'cash') {
//           monthlyData.cash[month] += expense.expenseAmount;
//           totalData.cash += expense.expenseAmount;
//         } else if (expense.expenseType.toLowerCase() === 'card') {
//           monthlyData.card[month] += expense.expenseAmount;
//           totalData.card += expense.expenseAmount;
//         } else if (expense.expenseType.toLowerCase() === 'online payment') {
//           monthlyData.online[month] += expense.expenseAmount;
//           totalData.online += expense.expenseAmount;
//         }
//       });

//       this.chartOptions.series = [
//         {
//           name: 'Cash',
//           data: monthlyData.cash
//         },
//         {
//           name: 'Card',
//           data: monthlyData.card
//         },
//         {
//           name: 'Online Payment',
//           data: monthlyData.online
//         }
//       ];

//       this.pieChartOptions.series[0].data = [
//         { name: 'Cash', y: totalData.cash },
//         { name: 'Card', y: totalData.card },
//         { name: 'Online Payment', y: totalData.online }
//       ];

//       Highcharts.chart('container', this.chartOptions);
//       Highcharts.chart('pieContainer', this.pieChartOptions);
//     });
//   }


//   getFile(event: any) {
    // let file = event.target.files[0];

    // let fr = new FileReader();
    // fr.readAsDataURL(file);
    // fr.onload = (event: any) => {
    //   this.profileImg = event.target.result;
    //   this.adminData.profile = event.target.result;
    // };
//   }

//   update() {
//     if (this.adminData.email !== "" || this.adminData.password !== "") {
//       this.s.editProfileApi(this.adminData).subscribe((res: any) => {
//         console.log(res);
//         localStorage.setItem('admin', JSON.stringify(res));
//       });
//     } else {
//       alert("Fill email and password");
//     }
//   }
// }


import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import * as Highcharts from 'highcharts';
// import { ToastService } from '../service/toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  adminData: any = {};
  profileImg = "https://i.postimg.cc/gJkQHZkN/Screenshot-2024-08-05-204628.png";
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};
  pieChartOptions: any = {};
  expenses: any = [];
  isEditing: boolean = false; // Add this flag

  constructor(private s: AdminService, private ts:ToastrService) {
    this.chartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Monthly Expense Summary'
      },
      xAxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        accessibility: {
          description: 'Months of the year',
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: 'Expense Amount'
        },
        labels: {
          format: '{value} $'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: []
    };

    this.pieChartOptions = {
      chart: {
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Total Expense Comparison'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Expense Type',
        colorByPoint: true,
        data: []
      }]
    };
  }

  ngOnInit(): void {
    if (localStorage.getItem('admin')) {
      this.adminData = JSON.parse(localStorage.getItem('admin') || "");
      // console.log(this.adminData);
      if (this.adminData.profile !== "") {
        this.profileImg = this.adminData.profile;
      }
    }
  }

  ngAfterViewInit(): void {
    this.prepareChartData(); // Initialize the chart after view initialization
  }

  prepareChartData() {
    this.s.getAllExpenseApi().subscribe((res) => {
      this.expenses = res;

      // Prepare data for the charts after expenses are loaded
      const monthlyData = {
        cash: new Array(12).fill(0),
        card: new Array(12).fill(0),
        online: new Array(12).fill(0)
      };

      const totalData = {
        cash: 0,
        card: 0,
        online: 0
      };

      this.expenses.forEach((expense:any) => {
        const date = new Date(expense.expenseDate);
        const month = date.getMonth();

        if (expense.expenseType.toLowerCase() === 'cash') {
          monthlyData.cash[month] += expense.expenseAmount;
          totalData.cash += expense.expenseAmount;
        } else if (expense.expenseType.toLowerCase() === 'card') {
          monthlyData.card[month] += expense.expenseAmount;
          totalData.card += expense.expenseAmount;
        } else if (expense.expenseType.toLowerCase() === 'online payment') {
          monthlyData.online[month] += expense.expenseAmount;
          totalData.online += expense.expenseAmount;
        }
      });

      this.chartOptions.series = [
        {
          name: 'Cash',
          data: monthlyData.cash
        },
        {
          name: 'Card',
          data: monthlyData.card
        },
        {
          name: 'Online Payment',
          data: monthlyData.online
        }
      ];

      this.pieChartOptions.series[0].data = [
        { name: 'Cash', y: totalData.cash },
        { name: 'Card', y: totalData.card },
        { name: 'Online Payment', y: totalData.online }
      ];

      Highcharts.chart('container', this.chartOptions);
      Highcharts.chart('pieContainer', this.pieChartOptions);
    });
  }


  getFile(event: any) {
    let file = event.target.files[0];

    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = (event: any) => {
      this.profileImg = event.target.result;
      this.adminData.profile = event.target.result;
    };
  }

  update() {
    if (this.adminData.email !== "" && this.adminData.password !== "") {
      this.s.editProfileApi(this.adminData).subscribe((res: any) => {
        this.ts.success("Profile Updated."); // Use the correct method for success
        localStorage.setItem('admin', JSON.stringify(res));
        this.isEditing = !this.isEditing; // Toggle edit mode
        setTimeout(() => {
          window.location.reload();
        }, 3000);
  
      });
    } else {
      this.ts.warning("Fill email and password"); // Use the correct method for warning
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; // Toggle edit mode
  }
}
