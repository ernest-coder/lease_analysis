import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface AlertToast {
    id?: string;
    type?: AlertToastType;
    title?: string;
    message?: string;
    autoClose?: boolean;
    duration?: number;
    keepAfterRouteChange?: boolean;
}

export enum AlertToastType {
    SUCCESS,
    ERROR,
    INFO,
    WARNING
}

export class AlertToastOptions {
    id?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AlertToastService {
    private subject = new Subject<AlertToast>();
    private defaultId = 'default-alert';

    onAlert(id = this.defaultId): Observable<AlertToast> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    success(message: string, title?: string, options?: AlertToastOptions) {
        this._alert({ ...options, type: AlertToastType.SUCCESS, message, title });
    }

    error(message: string, title = "Erreur", options?: AlertToastOptions) {
        this._alert({ ...options, type: AlertToastType.ERROR, message, title  });
    }

    info(message: string, title?: string, options?: AlertToastOptions) {
        this._alert({ ...options, type: AlertToastType.INFO, message, title  });
    }

    warn(message: string, title = "Attention", options?: AlertToastOptions) {
        this._alert({ ...options, type: AlertToastType.WARNING, message, title  });
    }

    private _alert(alert: AlertToast) {
        alert.id = alert.id ?? this.defaultId;
        this.subject.next(alert);
    }

    clear(id = this.defaultId) {
        this.subject.next({ id });
    }
}