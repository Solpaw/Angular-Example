import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

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
  @Output() generateComplete = new EventEmitter();
  @Output() editComplete = new EventEmitter();
  @Output() removeComplete = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.index + 1, 'OnChanges')
    this.editComplete.emit();
  }

  ngOnDestroy(): void {
    // console.log(this.index + 1, 'OnDestroy')
    this.removeComplete.emit();
  }

  ngOnInit(): void {
    // console.log(this.index + 1, 'OnInit')
    this.generateComplete.emit();
  }
}
