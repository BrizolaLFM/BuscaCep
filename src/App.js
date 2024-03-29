import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './services/api';

function App() {

const [input, setInput] = useState("");
const [cep, setCep] = useState({});

async function toqueSearch (){
  if(input === ''){
    alert("Por favor, digite algum CEP")
    return;
  }

  try{

const resposta = await api.get(`${input}/json`);
  setCep(resposta.data)
  setInput("");

  }catch{
    alert("Erro ao buscar CEP");
    setInput("")
  }
}

  return (
    <div className="container">
     <h1 className="title">Busca CEP</h1>

     <div className="containerInput">
    <input 
    type="text"
    placeholder="Digite seu cep..."
    value={input}
    onChange={(e) => setInput(e.target.value) }
    />
    <button className="buttonSearch" onClick={toqueSearch}>
      <FiSearch size={20} color="#FFF"/>  
    </button>
     </div>

      {Object.keys(cep).length > 0 && (
    <main className='main'>
      <h2>CEP:{cep.cep}</h2>

      <span>{cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>{cep.bairro}</span>   
      <span>{cep.localidade} - {cep.uf}</span>
     
     </main>
      )}

    </div>
  );
}

export default App;