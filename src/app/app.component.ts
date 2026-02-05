import { Component, OnInit, OnDestroy } from '@angular/core';

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

  targetDate = new Date('2026-02-14T00:00:00');
  isUnlocked = false;
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private intervalId: any;

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown(): void {
    const now = new Date();
    const diff = this.targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      this.isUnlocked = true;
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      return;
    }

    this.countdown = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
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
  }

  onNoHover(): void {
    if (this.answeredYes) {
      return;
    }

    this.noHoverCount += 1;

    const maxX = 220;
    const maxY = 140;
    const randomX = Math.floor(Math.random() * (maxX * 2 + 1)) - maxX;
    const randomY = Math.floor(Math.random() * (maxY * 2 + 1)) - maxY;
    this.noPosition = { x: randomX, y: randomY };
  }

  onNoClick(): void {
    this.onNoHover();
  }
}
