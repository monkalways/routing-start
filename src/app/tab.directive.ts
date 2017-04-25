import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTab]'
})
export class TabDirective implements OnInit  {

  @Input('appTab') defaultActive: string;

  constructor() { }

  @HostBinding('class.active') isActive = false;

  ngOnInit() {
    if(this.defaultActive && this.defaultActive === 'active') {
      this.isActive = true;
    }
  }

  @HostListener('click') onclick() {
    this.isActive = true;
  }

}
