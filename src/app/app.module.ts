import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CountdownOverlayComponent } from './countdown-overlay/countdown-overlay.component';
import { YesDialogComponent } from './yes-dialog/yes-dialog.component';

@NgModule({
  declarations: [AppComponent, CountdownOverlayComponent, YesDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
