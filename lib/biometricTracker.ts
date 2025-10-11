export class BiometricTracker {
  private typingData: { dwellTime: number; flightTime: number }[] = [];
  private mouseData: { x: number; y: number; timestamp: number }[] = [];
  private touchData: { pressure: number; duration: number }[] = [];
  private sessionStart: number = Date.now();
  private lastKeyUpTime: number = 0;
  private isTracking: boolean = false;

  startTracking() {
    if (this.isTracking) return;
    this.isTracking = true;
    this.sessionStart = Date.now();

    // Keyboard events
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);

    // Mouse events
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("click", this.handleClick);

    // Touch events (mobile)
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchend", this.handleTouchEnd);
    document.addEventListener("touchmove", this.handleTouchMove);
  }

  stopTracking() {
    this.isTracking = false;
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchend", this.handleTouchEnd);
    document.removeEventListener("touchmove", this.handleTouchMove);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as any;
    target._keyDownTime = Date.now();
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    const target = e.target as any;
    const keyUpTime = Date.now();
    const dwellTime = keyUpTime - (target._keyDownTime || keyUpTime);
    const flightTime = this.lastKeyUpTime ? keyUpTime - this.lastKeyUpTime : 0;

    this.typingData.push({ dwellTime, flightTime });
    this.lastKeyUpTime = keyUpTime;

    // Keep only last 100 entries
    if (this.typingData.length > 100) {
      this.typingData = this.typingData.slice(-100);
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    this.mouseData.push({
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    });

    // Keep only last 50 entries
    if (this.mouseData.length > 50) {
      this.mouseData = this.mouseData.slice(-50);
    }
  };

  private handleClick = (e: MouseEvent) => {
    // Click patterns for analysis
  };

  private handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    (touch.target as any)._touchStartTime = Date.now();
  };

  private handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    const duration = Date.now() - ((touch.target as any)._touchStartTime || 0);
    const pressure = (touch as any).force || 0.5;

    this.touchData.push({ pressure, duration });

    // Keep only last 50 entries
    if (this.touchData.length > 50) {
      this.touchData = this.touchData.slice(-50);
    }
  };

  private handleTouchMove = (e: TouchEvent) => {
    // Track touch movement patterns
  };

  collectData() {
    const now = new Date();

    return {
      logonPattern: {
        timeOfDay: now.getHours(),
        dayOfWeek: now.getDay(),
        loginDuration: Date.now() - this.sessionStart,
        failedAttempts: 0,
        locationConsistency: 95,
      },
      typingSpeed: {
        wpm: this.calculateWPM(),
        dwellTime: this.typingData.map((d) => d.dwellTime),
        flightTime: this.typingData.map((d) => d.flightTime),
        accuracy: 95,
      },
      mouseDynamics: {
        velocity: this.calculateMouseVelocity(),
        acceleration: this.calculateMouseAcceleration(),
        clickPattern: this.mouseData.slice(-20),
        movementCurvature: this.calculateCurvature(),
        idleTime: 0,
      },
      emailContext: {
        typicalSendTimes: [9, 14, 17],
        recipientPatterns: [],
        subjectComplexity: 50,
        emailLength: 200,
      },
      touchGesture: {
        pressure: this.calculateAverage(this.touchData.map((d) => d.pressure)),
        swipeVelocity: 45,
        tapDuration: this.calculateAverage(
          this.touchData.map((d) => d.duration)
        ),
        fingerArea: 50,
      },
      deviceFingerprint: this.generateFingerprint(),
    };
  }

  private calculateWPM(): number {
    if (this.typingData.length < 5) return 0;
    const recentData = this.typingData.slice(-50);
    const totalTime = recentData.reduce(
      (sum, d) => sum + d.dwellTime + d.flightTime,
      0
    );
    const minutes = totalTime / 60000;
    return minutes > 0 ? Math.round(recentData.length / 5 / minutes) : 0;
  }

  private calculateMouseVelocity(): number {
    if (this.mouseData.length < 2) return 0;
    const recent = this.mouseData.slice(-10);
    let totalVelocity = 0;

    for (let i = 1; i < recent.length; i++) {
      const dx = recent[i].x - recent[i - 1].x;
      const dy = recent[i].y - recent[i - 1].y;
      const dt = recent[i].timestamp - recent[i - 1].timestamp;
      const distance = Math.sqrt(dx * dx + dy * dy);
      totalVelocity += dt > 0 ? distance / dt : 0;
    }

    return totalVelocity / (recent.length - 1);
  }

  private calculateMouseAcceleration(): number {
    if (this.mouseData.length < 3) return 0;
    // Calculate acceleration from velocity changes
    return 0.5; // Placeholder
  }

  private calculateCurvature(): number {
    if (this.mouseData.length < 3) return 0;
    // Calculate path curvature
    return 0.3; // Placeholder
  }

  private calculateAverage(arr: number[]): number {
    if (arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  private generateFingerprint(): string {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx?.fillText("fingerprint", 2, 2);

    return btoa(
      `${navigator.userAgent}-${screen.width}x${screen.height}-${
        navigator.language
      }-${canvas.toDataURL()}`
    ).slice(0, 32);
  }

  reset() {
    this.typingData = [];
    this.mouseData = [];
    this.touchData = [];
    this.sessionStart = Date.now();
  }
}

export const biometricTracker = new BiometricTracker();
