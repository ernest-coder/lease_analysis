import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

import { AlertToast, AlertToastService, AlertToastType } from '../../services/alert-toast.service';

@Component({ 
    selector: 'app-alert-toast', 
    templateUrl: 'alert-toast.component.html',
    animations: [
        trigger('slideInOut', [
          transition(':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            animate('0.2s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
          ]),
          transition(':leave', [
            animate('0.2s ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
          ])
        ])
    ]
})
export class AlertToastComponent implements OnInit, OnDestroy {

    @Input() id = 'default-alert';
    alerts: AlertToast[] = [];
    alertSubscription!: Subscription;
    routeSubscription!: Subscription;

    duration: number = 3500 // in milliseconds

    constructor(private router: Router, private alertService: AlertToastService) { }

    ngOnInit() {
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
                    return;
                }
                this.alerts.unshift(alert);
                if (!(alert?.autoClose == false)) { // explicit do not close
                    setTimeout(() => this.removeAlert(alert), alert.duration ?? this.duration);
                }
           });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: AlertToast) {       
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: AlertToast) {
        if (!alert) return;
        switch(alert?.type){
            case AlertToastType.SUCCESS:
                return 'border-l-4 border-green-700 text-green-800';
            case AlertToastType.WARNING:
                return 'border-l-4 border-orange-500 text-orange-600';
            case AlertToastType.INFO:
                return 'border-l-4 border-blue-700 text-blue-800';
            case AlertToastType.ERROR:
                return 'border-l-4 border-red-700 text-red-800';
        }
        return ""
        
    }
}