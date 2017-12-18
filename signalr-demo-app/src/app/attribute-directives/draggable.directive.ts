import { Directive, ElementRef, Renderer, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';

class Position {
  constructor(public x: number, public y: number) { }
}

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {

  private canDrag = false;
  private originPosition: Position = new Position(0, 0);

  @Output() position = new EventEmitter<any>();
  @Input() changePosition: EventEmitter<any>;

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  ngOnInit(): void {
    console.log('DraggableDirective:ngOnint');
    if (this.changePosition) {
      this.changePosition.subscribe(position => {
        this.el.nativeElement.style.top = position.y + 'px';
        this.el.nativeElement.style.left = position.x + 'px';
      });
    }

  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: any) {
    this.canDrag = true;

    this.originPosition.x = event.clientX;
    this.originPosition.y = event.clientY;
  }

  @HostListener('document:mouseup') onMouseUp() {
    this.canDrag = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any) {
    if (!this.canDrag) {
      return;
    }

    this.moveTo({ x: event.clientX, y: event.clientY });

    this.originPosition.x = event.clientX;
    this.originPosition.y = event.clientY;
  }

  private moveTo(position: Position) {
    const top = this.el.nativeElement.offsetTop;
    const left = this.el.nativeElement.offsetLeft;

    const newX = position.x;
    const newY = position.y;

    const originX = this.originPosition.x;
    const originY = this.originPosition.y;

    let xValue = 0;
    let yValue = 0;

    if (newX > originX) {
      xValue = newX - originX + left;
    }

    if (newY > originY) {
      yValue = newY - originY + top;
    }

    if (newX < originX) {
      xValue = left - originX + newX;
    }

    if (newY < originY) {
      yValue = top - originY + newY;
    }

    if (newY === originY) {
      yValue = top;
    }

    if (newX === originX) {
      xValue = left;
    }

    this.el.nativeElement.style.top = yValue + 'px';
    this.el.nativeElement.style.left = xValue + 'px';

    this.position.emit({ x: xValue, y: yValue });
  }
}
