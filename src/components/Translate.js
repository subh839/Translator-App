import './Translate.css';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

function Translate() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = () => {
 
   
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);

    axios.post('https://libretranslate.de/translate',params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res=>{
      setOutput(res.data.translatedText)
    })
  };

  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  //  curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

  return (
    <div className="Translate">
      <div>
     <h2>Language Translator</h2>
        <select onChange={(e) => setFrom(e.target.value)}>

          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
     
       
      </div>

      <div className='box1'>
        <textarea
          cols="30"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        >Write here</textarea>
      </div>
<div>
<select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
    </div>
      <div className='box2'>

        <textarea cols="30" rows="8" value={output}>Get translation</textarea>
      </div>
      <div>
        <button className='btn' onClick={e=>translate()}>Translate</button>
      </div>
    </div>
  );
}

export default Translate;