import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'accesibility-menu-component',
  imports: [AsyncPipe],
  templateUrl: './accesibility-menu-component.html',
  styleUrl: './accesibility-menu-component.css',
})
export class AccesibilityMenuComponent {

  private isEnable = new BehaviorSubject<boolean>(false);
  isEnable$ = this.isEnable.asObservable();

  private currentFontSize = 1;
  private lastFontSize = this.currentFontSize;

  private currentLineHeight = 1;
  private lastLineHeight = this.currentLineHeight;

  private hideImagesStyle?: HTMLElement;
  private linkHighlightStyle?: HTMLElement;

  private readingMaskEnable = new BehaviorSubject<boolean>(false);
  readingMaskEnable$ = this.readingMaskEnable.asObservable();

  private readingMaskSize = 30;
  @ViewChild('readingMaskTop') readingMaskTop!: ElementRef<HTMLElement>;
  @ViewChild('readingMaskBottom') readingMaskBottom!: ElementRef<HTMLElement>;

  private applyFontSize() {

    const elements = document.querySelectorAll('*');

    const elementsWithText = Array.from(elements).filter(el =>
      Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '')
    );

    for (let element of elementsWithText) {

      if (element instanceof HTMLElement) {
        const size = parseFloat(getComputedStyle(element).fontSize);
        element.style.fontSize = `${size / this.lastFontSize * this.currentFontSize}px`;
      }
    }

    this.lastFontSize = this.currentFontSize;

  }

  private applyLineHeight() {

    const elements = document.querySelectorAll('*');

    const elementsWithText = Array.from(elements).filter(el =>
      Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '')
    );

    for (let element of elementsWithText) {

      if (element instanceof HTMLElement) {
        const size = parseFloat(getComputedStyle(element).lineHeight);
        element.style.lineHeight = `${size / this.lastLineHeight * this.currentLineHeight}px`;
      }
    }

    this.lastLineHeight = this.currentLineHeight;

  }

  setFontSize(x: number) {
    this.currentFontSize = x;
    this.applyFontSize();
  }

  setLineHeight(x: number) {
    this.currentLineHeight = x;
    this.applyLineHeight();
  }

  toggleGrayScale() {

    const html = document.querySelector('html');

    if (!html) return;

    if (html.style.filter.includes('grayscale(1)')) {
      html.style.filter = html.style.filter.replace('grayscale(1)', '');
    } else {
      html.style.filter = 'grayscale(1)';
    }

  }

  toggleImages() {

    if (this.hideImagesStyle) {
      document.head.removeChild(this.hideImagesStyle);
      this.hideImagesStyle = undefined;
      return;
    }

    this.hideImagesStyle = document.createElement('style');

    this.hideImagesStyle.textContent = `
      img, picture, image {
        visibility: hidden !important;
      }
    `;

    document.head.appendChild(this.hideImagesStyle);

  }

  toggleLinkHighlight() {

    if (this.linkHighlightStyle) {
      document.head.removeChild(this.linkHighlightStyle);
      this.linkHighlightStyle = undefined;
      return;
    }

    this.linkHighlightStyle = document.createElement('style');

    this.linkHighlightStyle.textContent = `
      a, a.text-white {
        padding: 10px !important;
        border-radius: 4px !important;
        border: 2px solid transparent !important;
        box-shadow: 0px 0px 0px 1px #000 !important;
        background: #FF0 !important;
        color: #000 !important;
      }
    `;

    document.head.appendChild(this.linkHighlightStyle);
  }

  toggleReadingMask() {
    this.readingMaskEnable.next(!this.readingMaskEnable.value);

    if (!this.readingMaskEnable.value){
      window.removeEventListener('mousemove', this.onMove.bind(this));
      return;
    }
    
    window.addEventListener('mousemove', this.onMove.bind(this));

  }

  private onMove(event: MouseEvent){
    const y = event.clientY;
    this.readingMaskTop.nativeElement.style.height = `${(y - this.readingMaskSize) >= 0 ? y - this.readingMaskSize : 0}px`;
    this.readingMaskBottom.nativeElement.style.height = `${(window.innerHeight - y - this.readingMaskSize) >= 0 ? window.innerHeight - y - this.readingMaskSize : 0}px`;

  }

  toggleIsEnabled(){
    this.isEnable.next(!this.isEnable.value);
  }

}
