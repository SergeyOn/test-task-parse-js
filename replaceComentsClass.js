/* usage 

class variation

https://github.com/SergeyOn/

;url = [string]
;const replace = new ReplaceComments();
;let result = await replace.fetchUrl('url');
;replace.showData() || result;

*/

class ReplaceComments {
  constructor() {
    this.text = '';
    this.parsed = '';
    this.resultFunc = () => alert('hello world');
    this.regExp = /\/\*(.|\n)*?\*\/|(?<![\\,",',`])\/{2}.*?\n/gms;
  };

  showData = () => ({
    before: this.text,
    after: this.parsed,
    resultFunc: this.resultFunc,
  });

  parseText = () => this.text.replace(this.regExp, '');

  refresh = (text) => {
    this.text = text;
    this.parsed = this.parseText();
    this.resultFunc = this.parsed ? new Function(this.parsed) : () => alert('hello world');
  };

  fetchUrl = async url => {

    try {
      const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusloadText);
      }
      const responseText = await response.text();
      this.refresh(responseText);
    } catch (err) {
      this.refresh('');
      throw new Error(err);
    }

    return showData();
  };
};


