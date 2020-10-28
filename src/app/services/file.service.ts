import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class FileService {

 	constructor(private http: HttpClient) { }

	convertFile(file: File): Observable<Blob> {
		const endpoint = 'convert_file';
		const httpOptions = {
			responseType: 'blob' as 'json'
		};
		
		const formData = new FormData();
	  	formData.append('file', file);

		const url = `${environment.base_url}/${endpoint}`;
		return this.http.post(url, formData, httpOptions)
		.pipe( map(result => {
			return result as Blob;
		}));
	}

	
}
