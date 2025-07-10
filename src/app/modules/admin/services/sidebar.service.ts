import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _isOpen = signal(true);
  private _isMobile = signal(false);

  isOpen = this._isOpen.asReadonly();
  isMobile = this._isMobile.asReadonly();

  toggle() {
    this._isOpen.update(value => !value);
  }

  setMobile(isMobile: boolean) {
    this._isMobile.set(isMobile);
    // On mobile, sidebar starts closed
    if (isMobile) {
      this._isOpen.set(false);
    } else {
      // On desktop, sidebar starts open
      this._isOpen.set(true);
    }
  }

  close() {
    this._isOpen.set(false);
  }

  open() {
    this._isOpen.set(true);
  }
}
