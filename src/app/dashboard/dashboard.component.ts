import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from '../services/firebase.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public datas: any[] = [];
  public rentabilite: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public repas: any[] = [];
  public boissons: any[] = [];
  public benefRepas: any[] = [];
  public benefBoissons: any[] = [];
  public source: any[] = [0, 0, 0];
  public journalier: number = 0
  public mensuel: number = 0
  public pending: number = 0

  constructor(private userService: AuthService, public afAuth: AngularFireAuth,
    private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getM(this.userService.getUid()!).subscribe(
      (res: any) => (
        res.forEach((res: any) => {
          this.mensuel += res.montant
        })
      )
    )
    this.firebaseService.getRentabilité(this.userService.getUid()!).subscribe(
      (res: any) => {
        res.forEach((res: any) => {
          for (let i = 0; i < 12; i++) {
            if (res.mois == i) {
              this.rentabilite[i] += res.montant * res.qte
            }
          }
        }
        )
      }
    )
    this.firebaseService.getRepas(this.userService.getUid()!).subscribe(
      (res: any) => {
        res.forEach((res: any) => {
          this.repas[this.repas.length] = res.nom
        }
        ),
        this.firebaseService.getRentabilité(this.userService.getUid()!).subscribe(
          (res: any) => {
            for (let i = 0; i < this.repas.length; i++) {
                this.benefRepas[i] = 0
            };
            res.forEach((res: any) => {
              for (let i = 0; i < this.repas.length; i++) {
                if (res.produit == this.repas[i]) {
                  this.benefRepas[i] += res.montant * res.qte
                }
              }
            }
            )
          }
        )
      }
    )
    this.firebaseService.getBoissons(this.userService.getUid()!).subscribe(
      (res: any) => {
        res.forEach((res: any) => {
          this.boissons[this.boissons.length] = res.nom
        }
        ),
        this.firebaseService.getRentabilité(this.userService.getUid()!).subscribe(
          (res: any) => {
            for (let i = 0; i < this.boissons.length; i++) {
              this.benefBoissons[i] = 0
            };
            res.forEach((res: any) => {
              for (let i = 0; i < this.boissons.length; i++) {
                if (res.produit == this.boissons[i]) {
                  this.benefBoissons[i] += res.montant * res.qte
                }
              }
            }
            )
          }
        )
      }
    )
    this.firebaseService.getY(this.userService.getUid()!).subscribe(
      (res: any) => (
        res.forEach((res: any) => {
          this.journalier += res.montant * res.qte
        })
      )
    )
    this.firebaseService.getCommandes(this.userService.getUid()!).subscribe(
      (res: any) => (
        console.log(res),
        this.pending = res.length
      )
    )
  }
  public lineData(datas: any): ChartConfiguration<'line'>['data'] {
    return {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      datasets: [
        {
          data: datas,
          label: 'Rentabilité Mensuelle',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]
    };
  }
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [['Google'], ['Socials'], 'Référencement'];
  pieDatas(datas: any) {
    return [{
      data: datas
    }];
  }
  pieLabel(datas: any) {
    return datas
  }
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public lineChartLegend = true;
  logout() {
    this.userService.clearStorage();
    return this.afAuth['signOut']().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    });
  }
}
