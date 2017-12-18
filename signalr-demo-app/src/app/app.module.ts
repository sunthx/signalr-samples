import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularDraggableModule } from 'angular2-draggable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DraggableDirective } from './attribute-directives/draggable.directive';

@NgModule({
  declarations: [
    AppComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
