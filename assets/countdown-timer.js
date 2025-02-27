if (!customElements.get('countdown-timer')) {
  class CountDownTimer extends HTMLElement{
    constructor(){
      super();
      let targetSelector = this.querySelector("input[name='countdown-inputs']");
      [this.month,this.date,this.year] = targetSelector.getAttribute('data-date').split('/');
      this.hours = targetSelector.getAttribute('data-hours')
      this.minutes = targetSelector.getAttribute('data-minutes')
      this.format = targetSelector.getAttribute('data-day_format');
      if (this.format == 'pm') {
        this.hours = parseInt(this.hours) + 12
      }

      this.setTimer();
    }

    /* setTimer(){
      const originalDate = new Date(parseInt(this.year), parseInt(this.month) - 1, parseInt(this.date), parseInt(this.hours), parseInt(this.minutes), 0);

      const centralTimezoneOffset = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }).match(/GMT([+-]\d+)/);

      const centralTimezoneDate = new Date(originalDate.getTime() + (centralTimezoneOffset * 60000));
    } */

    setTimer(){

      // Specify the specific date and time in US Central Time
      const specificDate = new Date(Date.UTC(parseInt(this.year), parseInt(this.month-1), parseInt(this.date), parseInt(this.hours), parseInt(this.minutes), 0)); // Use your specific date and time

      // Set the time zone offset for US Central Time (in minutes)
      const centralTimeZoneOffset = -5 * 60; // UTC-6 for Central Time

      // Apply the time zone offset to the specific date
      specificDate.setMinutes(specificDate.getMinutes() - centralTimeZoneOffset);

      // Get the timestamp (milliseconds since the Unix epoch) for the specific date in Central Time
      const timestampInCentralTime = specificDate.getTime();

      if(isNaN(timestampInCentralTime)) return;

      this.countDown = setInterval(()=>this.calculateTime(timestampInCentralTime), 1000);
    }

    calculateTime(endDate){
      this.dateStart = new Date().getTime();

      let timeRemaining = parseInt((endDate - this.dateStart) / 1000);

      if (timeRemaining >= 0) {
        let days = parseInt(timeRemaining / 86400);
        timeRemaining = timeRemaining % 86400;
        let hours = parseInt(timeRemaining / 3600);
        timeRemaining = timeRemaining % 3600;
        let minutes = parseInt(timeRemaining / 60);
        timeRemaining = timeRemaining % 60;
        let seconds = parseInt(timeRemaining);

        this.querySelector("#days").innerHTML = ("0"+parseInt(days, 10)).slice(-2);
        this.querySelector("#hours").innerHTML = ("0" + hours).slice(-2);
        this.querySelector("#minutes").innerHTML = ("0" + minutes).slice(-2);
        this.querySelector("#seconds").innerHTML = ("0" + seconds).slice(-2);
      } else {
        this.style.display = 'none'
        const targets = [".section-text-and-vertical-video__last-content_cta a",".section-text-and-vertical-video__first-top_cta a", ".section-social-cta__content-cta a[data-cc-animate-click]"]

        targets.forEach((ele)=>{
          document.querySelector(ele).innerText = "Shop Now";
          document.querySelector(ele).href = "#"
        });

        clearInterval(this.countDown);
      }
    }
  }
  customElements.define('countdown-timer', CountDownTimer)
}
