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
  }
}
