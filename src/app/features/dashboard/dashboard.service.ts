import { TestModel } from './../../shared/models/generic.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  title: string = 'Lorem ipsum dolor sit amet';
  paragraph: string = 'Integer at sollicitudin orci, quis convallis ex. Sed facilisis libero sed venenatis vestibulum. Donec mollis euismod metus vel pharetra. Ut et lorem eleifend, dignissim nisl sit amet, commodo felis. Nam tempor arcu quis felis tempor porta. Phasellus elit purus, molestie in est eu, ultrices malesuada ligula. Vivamus at dui nunc. Sed hendrerit, erat ut laoreet vulputate, ante purus eleifend mi, quis pharetra neque est non dolor. Phasellus sit amet leo diam.';

  list: BehaviorSubject<TestModel[]> = new BehaviorSubject<TestModel[]>([]);

  constructor() { }

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
    for(let i = 0; i < amount; i++) {
      const index = Math.floor(Math.random() * newList.length);
      newList[index].content = 'changes';
    }
    this.list.next(newList)
  }

  private generateNewTestItem(index: number, hasImage: boolean): TestModel {
    return {
      url: hasImage ? 'https://picsum.photos/200' : '', 
      title: this.title,
      content: this.paragraph,
      index: index,
    }
  }
}
