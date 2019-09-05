import { Component, OnInit } from '@angular/core';

import { Position } from './position-data/position';
import { PositionDataService } from './position-data/position-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-positions',
	templateUrl: './positions.component.html',
	providers: [PositionDataService]
})
export class PositionsComponent implements OnInit {

	position: Position;

	positions: Position[];

	positionForm: FormGroup;

	showPositions: boolean = true;

	id: number = 0;

	totalLoss: number;
	totalProfit: number;
	totalMoneyProfit: number = 0;
	totalMoneyLoss: number = 0;
	isTableHidden: boolean = true;

	constructor(private positionDataService: PositionDataService,
				private formBuilder: FormBuilder) {

		this.positionForm = this.formBuilder.group({
			'size': ['', [Validators.required, Validators.min(0.000001)]],
			'price': ['', [Validators.required, Validators.min(0.000001)]],
			'takeProfit': ['', [Validators.required, Validators.min(0.000001)]],
			'stopLoss': ['', [Validators.required, Validators.min(0.000001)]]
		});
	}

	ngOnInit() {
		this.getPositions();
	}

	addPosition(post) {
		this.id++;

		let position = this.createPosition(post.size, post.price, post.stopLoss, post.takeProfit);

		this.sendPositionToTable(position);
	}

	sendPositionToTable(position: Position): void {
		this.isTableHidden = false;
		this.positionDataService.insertPosition(position);
		this.calculateTotals();
	}

	createPosition(size: number, price: number, stopLoss: number, takeProfit: number): Position {
		const decimal = 10000;

		let type,
			loss,
			profit,
			moneyLoss,
			moneyProfit;

		if (takeProfit > price) {
			type = 'buy';
			profit = Math.round((takeProfit - price) * decimal);
			loss = Math.round((price - stopLoss) * decimal);
		}

		if (takeProfit < price) {
			type = 'sell';
			profit = Math.round((price - takeProfit) * decimal);
			loss = Math.round((stopLoss - price) * decimal);
		}

		if (takeProfit === price) {
			type = '-';
			profit = 0;
			loss = 0;
		}

		moneyLoss = +(loss * size).toFixed(2);
		moneyProfit = +(profit * size).toFixed(2);

		return this.position = {
			id: this.id,
			type: type,
			size: size,
			price: price,
			loss: loss,
			profit: profit,
			stopLoss: stopLoss,
			takeProfit: takeProfit,
			moneyLoss: moneyLoss,
			moneyProfit: moneyProfit
		};
	}

	update(event: Event, position: Position): void {
		event.preventDefault();

		let updatedPosition = this.createPosition(position.size, position.price, position.stopLoss, position.takeProfit);

		position.profit = updatedPosition.profit;
		position.loss = updatedPosition.loss;
		position.type = updatedPosition.type;
		position.moneyLoss = updatedPosition.moneyLoss;
		position.moneyProfit = updatedPosition.moneyProfit;

		this.positionDataService.updatePosition(position);
		this.calculateTotals();
	}

	delete(position: Position): void {
		this.positionDataService.deletePosition(position);
		this.calculateTotals();
	}

	clear(): void {
		this.id = 0;
		this.isTableHidden = true;
		this.positionDataService.clearPositions();
		this.calculateTotals();
	}

	calculateTotals(): void {

		this.totalProfit = 0;
		this.totalLoss = 0;
		this.totalMoneyProfit = 0;
		this.totalMoneyLoss = 0;

		for (let i = 0; i < this.positions.length; i++) {
			this.totalLoss += this.positions[i].loss;
		}
		for (let i = 0; i < this.positions.length; i++) {
			this.totalProfit += this.positions[i].profit;
		}
		for (let i = 0; i < this.positions.length; i++) {
			this.totalMoneyProfit += +this.positions[i].moneyProfit.toFixed(2);
		}
		for (let i = 0; i < this.positions.length; i++) {
			this.totalMoneyLoss += +this.positions[i].moneyLoss.toFixed(2);
		}
	}

	positionsChecked() {
		this.showPositions = !this.showPositions;
	}

	private getPositions(): void {
		this.positionDataService.getPositions()
			.subscribe(positions => this.positions = positions);
	}
}
