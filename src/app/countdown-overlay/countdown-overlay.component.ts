import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-countdown-overlay',
  templateUrl: './countdown-overlay.component.html',
  styleUrls: ['./countdown-overlay.component.scss'],
})
export class CountdownOverlayComponent implements OnInit, OnDestroy {
  @Output() unlocked = new EventEmitter<void>();

  targetDate = new Date('2026-02-14T00:00:00');
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private intervalId: any;
  hearts: number[] = [];

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
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.unlocked.emit();
      return;
    }

    this.countdown = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };

    this.updateHearts(diff);
  }

  private updateHearts(timeRemaining: number): void {
    const totalTime = this.targetDate.getTime() - new Date('2026-02-01T00:00:00').getTime();
    const elapsed = totalTime - timeRemaining;
    const progress = elapsed / totalTime;

    // Gradually increase hearts from 3 to 12 as we approach Valentine's Day
    let heartCount = Math.floor(3 + progress * 9);
    heartCount = Math.min(12, Math.max(3, heartCount));

    this.hearts = Array(heartCount).fill(0).map((_, i) => i);
  }
}
