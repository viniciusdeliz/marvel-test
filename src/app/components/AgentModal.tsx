interface CharacterDataProperties {
    name: string,
    id: number,
  }

'use client';

import Link from "next/link";
import { getMarvelAPI } from "../services/axios";
import { useState, useEffect, useId, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import Select from 'react-select';
const api = getMarvelAPI({});
const params = new URLSearchParams({
  apikey: '9a2752cee37c71853530ad4eb3056e4a',
});

interface agentObject {
  name: string,
}


export default function AgentModal() {
  const { setCoolestChar } = useContext(AuthContext);
  function handleChange(data: agentObject) {
    setCoolestChar(data.name);
  }
  const [characters, setCharacters] = useState<CharacterDataProperties[]>([]);
  const url = (url: string) => url + params;

  useEffect(() => {
    api.get(url('/series/22547/characters?')).then(res => { setCharacters(res.data.data.results) });
  }, []);

  const selectOptions = characters.map((el) => ({...el, label: el.name, value: el.name }));

    return (
        <section className="coolest-agent-page flex w-full grow justify-end mt-2">
          <div className="login-modal flex flex-col bg-white rounded-[1.75rem] w-[31%] h-[20rem] p-[2.25rem] pt-[2rem] self-center">
            <h1 className="text-4xl text-blue-950 font-bold tracking-tighter">
              Selecione o seu agente mais legal<em className="text-red-600 not-italic">.</em>
            </h1>
            <p className="text-gray-500 text-md mt-8 font-light tracking-tighter leading-tight">
              Tenha a visão completa do seu agente.
            </p>
            <Select
              onChange={handleChange}
              className="h-14 text-md text-slate-900 mt-4"
              instanceId={useId()}
              placeholder="Selecionar personagem"
              options={selectOptions} />
            <Link className="self-end w-[30%] h-12" href="/dashboard">
              <button className="bg-[#081B4E] w-full h-full rounded-lg text-zinc-50">
                Entrar
              </button>
            </Link>
          </div>
        </section>
    );
  }