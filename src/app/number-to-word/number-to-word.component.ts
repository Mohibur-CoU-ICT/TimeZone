import { Component, OnInit } from '@angular/core';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-number-to-word',
  templateUrl: './number-to-word.component.html',
  styleUrls: ['./number-to-word.component.css']
})
export class NumberToWordComponent implements OnInit {

  inputNumber: string = '';
  numberInWord: string = '';
  firstDigitMap = new Map<string, string>([
    ['0', 'zero'],
    ['1', 'one'],
    ['2', 'two'],
    ['3', 'three'],
    ['4', 'four'],
    ['5', 'five'],
    ['6', 'six'],
    ['7', 'seven'],
    ['8', 'eight'],
    ['9', 'nine'],
    ['10', 'ten'],
    ['11', 'eleven'],
    ['12', 'twelve'],
    ['13', 'thirteen'],
    ['14', 'fourteen'],
    ['15', 'fifteen'],
    ['16', 'sixteen'],
    ['17', 'seventeen'],
    ['18', 'eighteen'],
    ['19', 'nineteen']
  ]);
  secondDigitMap = new Map<string, string>([
    ['2', 'twenty'],
    ['3', 'thirty'],
    ['4', 'fourty'],
    ['5', 'fifty'],
    ['6', 'sixty'],
    ['7', 'seventy'],
    ['8', 'eighty'],
    ['9', 'ninety']
  ]);

  constructor() { }

  ngOnInit(): void {
    // for(let i=0; i<10000; i++) {
    //   console.log(this.convertToWord(String(i)));
    // }
  }

  // convert a two digit number to word
  twoDigitToWord(twoDigit: string): string {
    if (twoDigit.length <= 0) return '';
    if (twoDigit.length === 1) return this.firstDigitMap.get(twoDigit)!;
    let ans: string = '';
    if (twoDigit[0] === '0' || twoDigit[0] === '1') {
      let x = String(Number(twoDigit));
      ans = this.firstDigitMap.get(x)!;
    }
    else {
      ans = this.secondDigitMap.get(twoDigit[0])!;
      if (twoDigit[1] !== '0') {
        let y = this.firstDigitMap.get(twoDigit[1])!;
        ans = ans.concat(' ').concat(y);
      }
    }
    // console.log(ans);
    return ans;
  }

  // split a number text of maximum 7 digit
  splitUptoSevenDigit(num: string): string[] {
    let len: number = num.length;
    let rev = num.split('').reverse().join('');
    let lakh: string = '';
    if (len > 5) {
      lakh = rev.slice(5);
      lakh = lakh.split('').reverse().join('');
    }
    let thousand: string = '';
    if (len > 3) {
      thousand = rev.slice(3, Math.min(5, len));
      thousand = thousand.split('').reverse().join('');
    }
    let hundred: string = '';
    if (len > 2) {
      hundred = rev[2];
    }
    let tenth: string = '';
    if (len > 1) {
      tenth = rev[1];
    }
    let oneth: string = '';
    if (len > 0) {
      oneth = rev[0];
    }
    let ans: string[] = [lakh, thousand, hundred, tenth, oneth];
    // console.log(ans);
    return ans;
  }

  // convert a seven digit number to word
  sevenDigitToWord(num: string): string {
    let ans: string = '';
    let arr: string[] = [];
    let [lakh, thousand, hundred, tenth, oneth] = this.splitUptoSevenDigit(num);
    if (lakh.length > 0 && Number(lakh) !== 0) {
      arr.push(this.twoDigitToWord(lakh));
      arr.push('lakh');
    }
    if (thousand.length > 0 && Number(thousand) !== 0) {
      arr.push(this.twoDigitToWord(thousand));
      arr.push('thousand');
    }
    if (hundred.length > 0 && Number(hundred) !== 0) {
      arr.push(this.twoDigitToWord(hundred));
      arr.push('hundred');
    }
    let x = tenth.concat(oneth);
    if (Number(x) !== 0) {
      arr.push(this.twoDigitToWord(x));
    }
    ans = arr.join(' ');
    // console.log(ans);
    return ans;
  }

  // called when convert to word button will click
  convertToWordClicked() {
    this.numberInWord = '';
    // match all valid numbers
    if (this.inputNumber.match(/^-?(0|[1-9]\d*)(\.\d+)?$/)) {
      // console.log('Correct input');
      this.numberInWord = 'Correct input';
      let minus: boolean = false;
      let number: string = this.inputNumber;
      if (this.inputNumber[0] === '-') {
        minus = true;
        number = this.inputNumber.substring(1);
      }
      let nums: string[] = number.split('.');
      // this.numberInWord = this.numberToWord(num[0]);
      let arr: string[] = [];
      if (minus === true) {
        arr.push('minus');
      }
      if (nums.length > 0) {
        let integerPart = this.convertToWord(nums[0]);
        if (integerPart.length > 0) {
          arr.push(integerPart);
        }
      }
      if (nums.length > 1) {
        if (arr.length > 0) {
          arr.push('and');
        }
        arr.push(this.sevenDigitToWord(nums[1]));
        arr.push('paisa');
      }
      if (arr.length > 0) {
        if (arr[0].length > 0) {
          let firstChar = arr[0][0].toUpperCase();
          arr[0] = firstChar.concat(arr[0].substring(1));
        }
      }
      this.numberInWord = arr.join(' ').concat('.');
    }
    else {
      this.numberInWord = 'Invalid input';
    }
  }

  // actual conversion from number to word : iterative method
  convertToWord(num: string): string {
    let ans: string = '';
    let arr: string[] = [];
    let len: number = num.length;
    if (len % 7 > 0) {
      arr.push(this.sevenDigitToWord(num.substring(0, len % 7)));
    }
    if (len > 7 && len % 7 !== 0) {
      arr.push('crore');
    }
    for (let i = len % 7; i < len - 7; i += 7) {
      arr.push(this.sevenDigitToWord(num.substring(i, i + 7)));
      arr.push('crore');
    }
    if (len >= 7) {
      arr.push(this.sevenDigitToWord(num.substring(len - 7)));
    }
    ans = arr.join(' ');
    // console.log(ans);
    return ans;
  }

  // actual conversion from number to word : recursive method
  numberToWord(num: string): string {
    // console.log(num);
    let ans: string = '';
    let len: number = num.length;
    if (len > 7) {
      let x = this.numberToWord(num.substring(0, len - 7));
      return ans = x.concat(' crore').concat(ans);
    }
    let subAns = this.sevenDigitToWord(num);
    ans = ans.concat(subAns);
    // console.log(ans);
    return ans;
  }

}
