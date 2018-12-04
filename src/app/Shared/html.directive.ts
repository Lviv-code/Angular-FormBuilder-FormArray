import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[html]'
})
export class HtmlDirective implements OnInit{

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit(){
    const div = this.renderer.createElement('div');
    this.renderer.setStyle(div, 'backgroundColor', '#67b767');
    this.renderer.setStyle(div, 'height', '100px');
    this.renderer.setStyle(div, 'width', '100px');
    this.renderer.appendChild(this.element.nativeElement, div);

  }
}