import { TestModel } from './../../shared/models/generic.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { LoremIpsum } from "lorem-ipsum";
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  operationCounterLimit: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  operationComplete: Subject<any> = new Subject();

  opComplete = this.operationComplete.asObservable();

  list: BehaviorSubject<TestModel[]> = new BehaviorSubject<TestModel[]>([]);

  results: any[] = [];

  constructor() {}

  generateTestList(amount: number, hasImage: boolean) {
    const newList = [];

    for(let i = 0; i < amount; i++) {
      newList.push(this.generateNewTestItem(i, hasImage));
    }

    this.list.next(newList);
  }

  removeFromList(amount: number, isRandom: boolean) {
    const newList = [...this.list.value];
    for(let i = 0; i < amount; i++) {
      const index = Math.floor(Math.random() * newList.length);
      newList.splice(index, 1)
    }
    this.list.next(newList)
  }

  editItems(amount: number, isRandom: boolean) {
    const newList = [...this.list.value];
    const indexes: number[] = []
    let index;
    for(let i = 0; i < amount; i++) {
      do {
        index = Math.floor(Math.random() * newList.length);
      } while(indexes.includes(index))
      indexes.push(index)
      newList[index].content = this.lorem.generateSentences(5);
    }
    console.log(indexes)
    this.list.next(newList)
  }

  private generateNewTestItem(index: number, hasImage: boolean): TestModel {
    return {
      url: hasImage ? 'https://picsum.photos/200' : '', 
      title: this.lorem.generateWords(4),
      content: this.lorem.generateSentences(5),
      index: index,
    }
  }

  async runGenerateTest(maxAmount: number, repeats: number, initial: number, step: number) {
    this.results = [];
    const amountOfComponents: number[] = [];
    for(let i = initial; i <= maxAmount; i += step) {
      const unitResults = [];
      amountOfComponents.push(i);
      this.operationCounterLimit.next(i);
      for(let j = 0; j < repeats; j++) {
        this.generateTestList(i, true);
        const val = await firstValueFrom(this.opComplete)
        unitResults.push(val);
        console.log(i, val)
      }
      this.results.push(unitResults);
    }
    this.writeFile('Generete', amountOfComponents, 'image');
  }

  async runEditTest(maxAmount: number, repeats: number, initial: number, step: number) {
    this.results = [];
    const amountOfComponents: number[] = [];
    for(let i = initial; i <= maxAmount; i += step) {
      const unitResults = [];
      amountOfComponents.push(i);
      this.operationCounterLimit.next(i);
      for(let j = 0; j < repeats; j++) {
        this.editItems(i, true);
        const val = await firstValueFrom(this.opComplete)
        unitResults.push(val);
        console.log(i, val)
      }
      this.results.push(unitResults);
    }
    this.writeFile('Edit', amountOfComponents);
  }

  async runRemoveTest(maxAmount: number, repeats: number, initial: number, step: number) {
    this.results = [];
    const amountOfComponents: number[] = [];
    for(let i = initial; i <= maxAmount; i += step) {
      const unitResults = [];
      amountOfComponents.push(i);
      this.operationCounterLimit.next(i);
      for(let j = 0; j < repeats; j++) {
        this.generateTestList(maxAmount * 2, true);
        let val = await firstValueFrom(this.opComplete)
        console.log('generated', val)
        this.removeFromList(i, true);
        val = await firstValueFrom(this.opComplete)
        unitResults.push(val);
        console.log('removed', val)
      }
      this.results.push(unitResults);
    }
    this.writeFile('Remove', amountOfComponents);
  }

  writeFile(title: string, numberOfComponents: number[], additionalInfo?: string) {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report');
    const repeatsRowData: any[] = [""]
    for(let i = 0; i < this.results[0]?.length; i++) {
      repeatsRowData.push(i + 1)
    }

    let titleRow = worksheet.addRow([title]);
    worksheet.addRow(repeatsRowData);
    this.results.forEach((ele, index) => {
      worksheet.addRow([numberOfComponents[index]].concat(ele))
    })

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${title}-${additionalInfo}-Angular.xlsx`);
    });
  }
}
