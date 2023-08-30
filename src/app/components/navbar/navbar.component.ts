import { Component, OnInit } from '@angular/core';
import { faClose,faBell,faInfoCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  faClose = faClose;
  faBell = faBell;
  faInfoCircle = faInfoCircle;

  isOpen = false;
  isOpenBody = false;

  constructor() {}
  ngOnInit():void{

  }
}
