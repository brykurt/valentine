import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { YesDialogComponent } from './yes-dialog/yes-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'will-you-be-my-valentine';
  answeredYes = false;
  noHoverCount = 0;
  noPosition = { x: 0, y: 0 };
  isUnlocked = false;
  hearts: number[] = [];
  private intervalId: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateHearts();
    this.intervalId = setInterval(() => this.updateHearts(), 60000); // Update every minute
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onUnlocked(): void {
    this.isUnlocked = true;
  }

  get headline(): string {
    if (this.answeredYes) {
      return 'Yay! 💖 I knew you’d say yes!';
    }

    if (this.noHoverCount >= 6) {
      return 'Okay okay… you can click Yes now 😇';
    }

    if (this.noHoverCount >= 3) {
      return 'Nice try… but the No button is shy 🙈';
    }

    return 'Will you be my Valentine?';
  }

  get subtext(): string {
    if (this.answeredYes) {
      return 'See you on February 14th 💌';
    }

    if (this.noHoverCount >= 6) {
      return 'You know you want to 😄';
    }

    if (this.noHoverCount >= 3) {
      return 'Come on… say yes 💘';
    }

    return 'A tiny question with a huge smile.';
  }

  onYesClick(): void {
    this.answeredYes = true;

    // Open the dialog with photos
    this.dialog.open(YesDialogComponent, {
      width: '90vw',
      maxWidth: '700px',
      panelClass: 'yes-dialog',
      autoFocus: false,
    });
  }

  onNoHover(): void {
    if (this.answeredYes) {
      return;
    }

    this.noHoverCount += 1;

    // Keep button within visible bounds while dodging
    // Card width is ~520px, button is ~110px wide, actions has 16px gap
    const maxX = 150; // Reduced to keep within card bounds
    const maxY = 80; // Reduced to keep within actions area
    const randomX = Math.floor(Math.random() * (maxX * 2 + 1)) - maxX;
    const randomY = Math.floor(Math.random() * (maxY * 2 + 1)) - maxY;
    this.noPosition = { x: randomX, y: randomY };
  }

  onNoClick(): void {
    this.onNoHover();
  }

  private updateHearts(): void {
    const targetDate = new Date('2026-02-14T00:00:00');
    const startDate = new Date('2026-02-01T00:00:00');
    const now = new Date();

    const totalTime = targetDate.getTime() - startDate.getTime();
    const timeRemaining = targetDate.getTime() - now.getTime();
    const elapsed = totalTime - timeRemaining;
    const progress = Math.max(0, Math.min(1, elapsed / totalTime));

    // Gradually increase hearts from 3 to 12 as we approach Valentine's Day
    let heartCount = Math.floor(3 + progress * 9);
    heartCount = Math.min(12, Math.max(3, heartCount));

    this.hearts = Array(heartCount)
      .fill(0)
      .map((_, i) => i);
  }
}
