import { Component, OnInit } from '@angular/core';
import { MyTimeZone } from './models/MyTimeZone';
import { timeZoneWithCountry } from './util/regions-to-countries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TimeZone';
  localTimeFormat: string = '';
  localTimeFormat2: string = '';
  timeZone: string = '';
  cityName: string = '';
  countryName: string = '';
  timeZoneCountryMap: any;

  timeZones = Array<MyTimeZone>();

  constructor() {
    this.timeZoneCountryMap = new Map<string, string>();
    Object.entries(timeZoneWithCountry).forEach((entry) => {
      this.timeZoneCountryMap.set(entry[0], entry[1]);
    });
  }

  ngOnInit() {
    this.localTimeFormat = this.getLocalTime();
    this.localTimeFormat2 = this.getLocalTimeFormat2();
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.cityName = this.getCityName(this.timeZone);
    this.countryName = this.timeZoneCountryMap.get(this.timeZone);
    this.timeZones = this.getMyTimeZones();

    setInterval(() => {
      this.localTimeFormat = this.getLocalTime();
      this.localTimeFormat2 = this.getLocalTimeFormat2();
      // this.cityName = this.getCityName(this.timeZone);
      // this.countryName = this.timeZoneCountryMap.get(this.timeZone);
      this.timeZones = this.getMyTimeZones();
    }, 1000);
  }

  getCityName(timeZone: string): string {
    return timeZone.substring(timeZone.lastIndexOf('/') + 1);
  }

  getLocalTime(): string {
    const today = new Date();
    
    let hour = today.getHours() + '';
    let min = today.getMinutes() + '';
    let sec = today.getSeconds() + '';

    if(hour.length < 2) hour = '0' + hour;
    if(min.length < 2) min = '0' + min;
    if(sec.length < 2) sec = '0' + sec;

    let ans = hour + ':' + min + ':' + sec;

    return ans;
  }

  getWeek() {
    let date = new Date();
    let onejan = new Date(date.getFullYear(), 0, 1);
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let dayOfYear: number = Math.floor((today.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((dayOfYear - 1) / 7);
  }

  getLocalTimeFormat2(): string {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date();
    
    let dayName = dayNames[today.getDay()];
    let day = today.getDate() + '';
    if(day.length < 2) day = '0' + day;
    let monthName = monthNames[today.getMonth()];
    let year = today.getFullYear();
    let week = this.getWeek();

    let ans = dayName + ', ' + day + ' ' + monthName + ', ' + year + ', week ' + week;

    return ans;
  }

  public getMyTimeZones(): Array<MyTimeZone> {
    let timeZones = Array<MyTimeZone>();
    let options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Los_Angeles',
      // year: 'numeric',
      // month: 'numeric',
      // day: 'numeric',
      hour: 'numeric',
      hour12: false,
      minute: 'numeric',
      // second: 'numeric',
    },
    formatter = new Intl.DateTimeFormat([], options);
    // console.log(formatter.format(new Date()));

    let date = new Date();
    // const str = date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    // console.log(str);

    let timeZone: MyTimeZone = {
      name: this.getTimeZoneName(options.timeZone!),
      time: date.toLocaleString('en-US', options)
    };
    timeZones.push(timeZone);

    options.timeZone = 'America/New_York';
    timeZone = {
      name: this.getTimeZoneName(options.timeZone!),
      time: date.toLocaleString('en-US', options)
    };
    timeZones.push(timeZone);
    
    options.timeZone = 'Europe/London';
    timeZone = {
      name: this.getTimeZoneName(options.timeZone!),
      time: date.toLocaleString('en-US', options)
    };
    timeZones.push(timeZone);

    options.timeZone = 'Europe/Paris';
    timeZone = {
      name: this.getTimeZoneName(options.timeZone!),
      time: date.toLocaleString('en-US', options)
    };
    timeZones.push(timeZone);
    
    options.timeZone = 'Europe/Kiev';
    timeZone = {
      name: this.getTimeZoneName(options.timeZone!),
      time: date.toLocaleString('en-US', options)
    };
    timeZones.push(timeZone);
    
    options.timeZone = 'Asia/Shanghai'; // Asia/Beijing : both are GMT+8
    timeZone = {
      name: this.getTimeZoneName(options.timeZone!),
      time: date.toLocaleString('en-US', options)
    };
    timeZones.push(timeZone);

    options.timeZone = 'Asia/Tokyo';
    timeZone = {
      name: this.getTimeZoneName(options.timeZone!),
      time: date.toLocaleString('en-US', options)
    };
    timeZones.push(timeZone);

    // console.log(timeZones);

		return timeZones;
	}

  getTimeZoneName(timeZone: string): string {
    return timeZone.substring(timeZone.indexOf('/') + 1).replace('_', ' ');
  }

  getAllAvailableTimeZones() {
    // const timeZones = Intl.supportedValuesOf('timeZone');

    // timeZones.forEach(timeZone => {
    //   console.log(timeZone)
    // });
  }
}
