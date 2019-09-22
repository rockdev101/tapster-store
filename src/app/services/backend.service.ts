import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
    Observable,
    map,
    throwError,
    catchError,
    finalize,
    Admin
} from "../store/app.models";
import { Router } from "@angular/router";

@Injectable()
export class BackendService {
    constructor(private http: HttpClient, private router: Router) {}

    public get(
        api: string,
        data: any = null,
        loading: string = api
    ): Observable<any> {
        const token = Admin.getStoredToken();
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("authorization", "Bearer " + token);
        return this.http.get(api, { headers }).pipe(
            map((res: any) => res),
            catchError(err => this.handleError(err)),
            finalize(() => this.onEnd())
        );
    }

    public publicGet(api: string, loading: string = api): Observable<any> {
        this.onStart(loading);

        return this.http.get(api).pipe(
            map((res: any) => res),
            catchError(err => this.handleError(err)),
            finalize(() => this.onEnd())
        );
    }

    public post(
        api: string,
        data: any,
        loading: string = api
    ): Observable<any> {
        this.onStart(loading);
        const token = Admin.getStoredToken();
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("authorization", "Bearer " + token);
        return this.http.post(api, data, { headers }).pipe(
            map((res: any) => res),
            catchError(err => this.handleError(err)),
            finalize(() => this.onEnd())
        );
    }

    public publicPost(
        api: string,
        data: any,
        loading: string = api
    ): Observable<any> {
        this.onStart(loading);
        return this.http.post(api, data).pipe(
            map((res: any) => res),
            catchError(err => this.handleError(err)),
            finalize(() => this.onEnd())
        );
    }

    public put(
        api: string,
        data: any = {},
        loading: string = api
    ): Observable<any> {
        this.onStart(loading);
        return this.http.put(api, data).pipe(
            map((res: any) => res.data),
            catchError(err => this.handleError(err)),
            finalize(() => this.onEnd())
        );
    }

    public delete(
        api: string,
        data: any = null,
        loading: string = api
    ): Observable<any> {
        this.onStart(loading);
        return this.http.delete(api, data).pipe(
            map((res: any) => res.data),
            catchError(err => this.handleError(err)),
            finalize(() => this.onEnd())
        );
    }

    public logOut() {
        Admin.removeAllItems();
        this.router.navigate(["/login"]);
    }

    private handleError(res: Response | any): Observable<any> {
        if (res.status === 401) {
            this.logOut();
        }
        return throwError(res.error.msg || res.error || res);
    }

    private onStart(loading: string = null): void {}

    private onEnd(): void {}
}
