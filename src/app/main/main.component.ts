import { Component, OnInit } from '@angular/core';
import ConvertFileUseCase from '../usecases/ConvertFileUseCase';
import * as fileSaver from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	error: string = '';
	loading: boolean = false;

	constructor(
		private convertFileUseCase: ConvertFileUseCase
	) { }

	ngOnInit(): void {
	}

	onFileSelected() {
		this.error = '';
	}

	onConvertButtonClicked(files: File[]) {
		const fileToUpload = files[0];
		this.convertFile(fileToUpload);
	}

	convertFile(fileToUpload: File) {
		console.log(fileToUpload);
		const filename = `${fileToUpload.name}.gif`;
		this.startLoading();
		this.convertFileUseCase.execute(fileToUpload).subscribe(
			response => {
				this.stopLoading();
				this.downloadFile(response, filename);
			},
			error => {
				this.stopLoading();
				this.handleError(error);
			}
		);
	}

	downloadFile(fileContent: Blob, filename: string) {
		const blob  = new Blob([fileContent], {type: 'application/download'});
		fileSaver.saveAs(blob, filename);
	}

	handleError(error: HttpErrorResponse) {
		this.error = 'File not allowed';
	}

	startLoading() {
		this.error = '';
		this.loading = true;
	}

	stopLoading() {
		this.loading = false;
	}
}
