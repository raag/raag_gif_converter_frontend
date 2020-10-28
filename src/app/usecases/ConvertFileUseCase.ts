import { FileService } from '../services/file.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export default class ConvertFileUseCase {

	constructor(private fileService: FileService) {}
	
	execute(fileToUpload: File):Observable<Blob> {
		return this.fileService.convertFile(fileToUpload)
		.pipe(
			catchError(this.handleError)
		)
	}

	handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
