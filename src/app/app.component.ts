import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public showFibo: boolean = false;
	public showPivot: boolean = false;
	public showTechnicals: boolean = false;
	public showResults: boolean = false;

	private technicalsCheckedFibo: boolean;
	private technicalsCheckedPivot: boolean;

	public High;
	public Low;
	public type;
	public Open;
	public Close;

	public result_236;
	public result_382;
	public result_50;
	public result_618;

	public result_R3;
	public result_R2;
	public result_R1;
	public result_PP;
	public result_S1;
	public result_S2;
	public result_S3;

	fiboChecked(data) {
		this.showFibo = data;
	}

	pivotChecked(data) {
		this.showPivot = data;
	}

	technicalsChecked(data) {
		this.showTechnicals = data;
	}

	showResultsCalc(data) {
		this.showResults = data;
	}

	techBtnChecked() {

		if (!this.showTechnicals) {
			if (this.showFibo) {
				this.technicalsCheckedFibo = true;
			} else this.technicalsCheckedFibo = false;
			if (this.showPivot) {
				this.technicalsCheckedPivot = true;
			} else this.technicalsCheckedPivot = false;
		}
	}

	// Inputs

	setHighFromInput(DataHigh) {
		this.High = DataHigh;
	}

	setLowFromInput(DataLow) {
		this.Low = DataLow;
	}

	setTypeFromInput(DataType) {
		this.type = DataType;
	}

	setOpenFromInput(DataOpen) {
		this.Open = DataOpen;
	}

	setCloseFromInput(DataClose) {
		this.Close = DataClose;
	}

	// Calculations Data

	set236FromCalc(Data2) {
		this.result_236 = Data2;
	}

	set382FromCalc(Data3) {
		this.result_382 = Data3;
	}

	set50FromCalc(Data5) {
		this.result_50 = Data5;
	}

	set618FromCalc(Data6) {
		this.result_618 = Data6;
	}

	setR3FromCalc(DataR3) {
		this.result_R3 = DataR3;
	}

	setR2FromCalc(DataR2) {
		this.result_R2 = DataR2;
	}

	setR1FromCalc(DataR1) {
		this.result_R1 = DataR1;
	}

	setPPFromCalc(DataPP) {
		this.result_PP = DataPP;
	}

	setS1FromCalc(DataS1) {
		this.result_S1 = DataS1;
	}

	setS2FromCalc(DataS2) {
		this.result_S2 = DataS2;
	}

	setS3FromCalc(DataS3) {
		this.result_S3 = DataS3;
	}

}
