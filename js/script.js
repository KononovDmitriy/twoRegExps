class MarkedString {
  constructor(str, regexp1, regexp2) {

    const strToArr = (str) => {
      return str.split('').map((el) => {
        return {
          char: el,
          reg1: false,
          reg2: false
        };
      });
    }

    this._REGEXPS = {
      reg1: new RegExp(regexp1, 'gi'),
      reg2: new RegExp(regexp2, 'gi'),
    };
    this._originalString = str;
    this._arrayChar = strToArr(this._originalString); 
  }

  _addMarkerToChars(indexes, reg) {
    indexes.forEach((el) => {
      for (let i = el.start; i < el.end; i++) {
        this._arrayChar[i][reg] = true;     
      }
    });      

  }

  _getIndexes(reg) {
    const regexp = this._REGEXPS[reg];

    let matches = this._originalString.match(regexp);
    let indexes = [];
    let index = 0;

    if (matches) {

      matches.forEach((el) => {
        
        let startIndex = this._originalString.indexOf(el, index);

        indexes.push({
          start: startIndex,
          end: startIndex + el.length
        });  

        index = ++startIndex;
      });
    }

    return indexes;
  }

  _markedString(reg) {
    this._addMarkerToChars(this._getIndexes(reg), reg); 
  }

  _getFormatString() {
    return this._arrayChar.map((el) => {
      let char = (el.reg1) ? `<i>${el.char}</i>` : el.char;
      char = (el.reg2) ? `<b>${char}</b>` : char;
      return char;
    }).join('');
  }

  getString() {
    this._markedString('reg1');
    this._markedString('reg2');

    return this._getFormatString();
  }
}

const formNode = document.querySelector('form');
const inputStringNode = formNode.querySelector('#string');
const inputRegexp1Node = formNode.querySelector('#regexp1');
const inputRegexp2Node = formNode.querySelector('#regexp2');
const outputNode = document.querySelector('#output');

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let tmp = new MarkedString(inputStringNode.value, inputRegexp1Node.value,
    inputRegexp2Node.value);

  outputNode.innerHTML = tmp.getString();
});

