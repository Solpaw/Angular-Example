import { TestModel } from './../../../shared/models/generic.model';
import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-test-tile',
  templateUrl: './test-tile.component.html',
  styleUrls: ['./test-tile.component.scss']
})
export class TestTileComponent implements OnInit, OnDestroy, OnChanges {

  @Input() url?: string;
  @Input() index!: number;
  @Input() title!: string;
  @Input() content!: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.index + 1, 'OnChanges')
  }

  ngOnDestroy(): void {
    console.log(this.index + 1, 'OnDestroy')
  }

  ngOnInit(): void {
    console.log(this.index + 1, 'OnInit')
  }
}
