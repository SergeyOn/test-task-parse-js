/* usage 

https://github.com/SergeyOn/

;url = [string]
;replaceComments('url');

*/


(function(){
  window.replaceComments = async url => {

  let text;
  
  try {
    console.log('file loading start');
    const response = await fetch(url);
  if (!response.ok) {
    console.log(`error - ${response.statusloadText}`);
      throw new Error(response.statusloadText);
    }
    text = await response.text();
  } catch (err) {
    console.log(`error - ${err.message}`);
    throw new Error(err);
  }
  
  console.log('file loaded'); 
  
  const regExp = /\/\*(.|\n)*?\*\/|(?<![\\,",',`])\/{2}.*?\n/gms;
  const parsed = text.replace(regExp, '');
   
  const diff = {
    before: text,
    after: parsed,
  };
  
  console.table(diff, ['before', 'after']);
  
  return new Function(parsed)();
  
  };
})();