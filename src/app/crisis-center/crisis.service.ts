import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { AddCrisisRequest, Crisis } from "./crisis";
import { Observable, of } from "rxjs";
import { MessageService } from "../message.service";

@Injectable({
  providedIn: "root",
})
export class CrisisService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private crisesUrl = "api/crises";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private log(message: string) {
    this.messageService.add(message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCrises(): Observable<Crisis[]> {
    return this.http.get<Crisis[]>(this.crisesUrl).pipe(
      tap(() => this.log("CrisisService: fetched crises")),
      catchError(this.handleError<Crisis[]>("getCrises", []))
    );
  }

  getCrisis(id: number) {
    return this.http.get<Crisis>(`${this.crisesUrl}/${id}`).pipe(
      tap(() => this.log(`CrisisService: fetched crisis id=${id}`)),
      catchError(this.handleError<Crisis>("getCrisis"))
    );
  }

  addCrisis(crisis: AddCrisisRequest): Observable<Crisis> {
    return this.http
      .post<Crisis>(this.crisesUrl, crisis, this.httpOptions)
      .pipe(
        tap((newCrisis: Crisis) =>
          this.log(`CrisisService: added crisis with id=${newCrisis.id}`)
        ),
        catchError(this.handleError<Crisis>("addCrisis"))
      );
  }

  updateCrisis(crisis: Crisis) {
    return this.http.put(this.crisesUrl, crisis, this.httpOptions).pipe(
      tap(() => this.log(`CrisisService: updated crisis id=${crisis.id}`)),
      catchError(this.handleError<Crisis>("updateCrisis"))
    );
  }

  deleteCrisis(id: number) {
    return this.http
      .delete<Crisis>(`${this.crisesUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`CrisisService: deleted crisis id=${id}`)),
        catchError(this.handleError<Crisis>("deleteCrisis"))
      );
  }

  searchCrises(term: string) {
    if (!term.trim()) return of([]);
    return this.http.get<Crisis[]>(`${this.crisesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`Found crises matching "${term}"`)
          : this.log(`No crises matching "${term}"`)
      ),
      catchError(this.handleError<Crisis[]>("searchCrises", []))
    );
  }
}
