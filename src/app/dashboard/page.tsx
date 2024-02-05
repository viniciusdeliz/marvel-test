interface CharacterThumbnail {
  path: string,
  extension: string,
}

interface CharacterDataProperties {
  name: string,
  id: number,
  description: string,
  thumbnail: CharacterThumbnail,
}

'use client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getMarvelAPI } from "../services/axios";
import { useEffect, useState } from "react";

const api = getMarvelAPI({});
const params = new URLSearchParams({
  apikey: '9a2752cee37c71853530ad4eb3056e4a',
});


export default function UserDashboard() {
  const [characters, setCharacters] = useState<CharacterDataProperties[]>([]);
  const [lastFetchedIndex, setLastFetchedIndex] = useState(0);
  const [maxItemsPerPage, setMaxItemsPerPage] = useState(10);
  const url = (url: string) => url + params;
  useEffect(() => {
    api.get(url('/series/18142/characters?')).then(res => { setCharacters(res.data.data.results.reverse()); setLastFetchedIndex(res.data.data.results.length - 1); });
  }, []);
  return (
    <div className="dashboard-wrapper">
      <ToastContainer />
      <nav className="search-bar h-16 border-b border-slate-100 box-border flex flex-col justify-center relative">
        <i className="absolute left-4 top-5"><MagnifyingGlassIcon className="h-5 w-5 text-blue-900" /></i>
        <input onChange={() => toast("Busca ainda não implementada!")}  type="text" className="ml-12 text-black placeholder:text-xs placeholder:text-gray-500" placeholder="Busque um agente" />
      </nav>
      <section className="inner-dashboard grid grid-cols-4 grid-rows-3 gap-3 h-3/4">
        {characters.length ? characters.map((el, index) => index + 1 > maxItemsPerPage ? null : (
          <div
            className={`character-card-wrapper rounded-lg bg-slate-200 text-black ${index < (maxItemsPerPage - 2) ? '' : 'col-span-2'}`}
            key={el.id}>
            <div className="card-inner flex h-full rounded-2xl px-2.5 py-3.5 gap-4">
              <figure className="w-24 h-full shrink-0">
                <img className="w-full h-full object-cover rounded-2xl" src={`${el.thumbnail.path}.${el.thumbnail.extension}`} />
              </figure>
              <div className="character-info overflow-hidden relative">
                <h1 className="font-semibold text-lg truncate" title={el.name}>{el.name}</h1>
                <div className="description-holder max-h-[calc(100%-1.75rem)] overflow-hidden ">
                  <p className="overflow-hidden text-ellipsis line-clamp-4">{el.description}</p>
                </div>
              </div>
            </div>
          </div>
        )) : null}
      </section>
    </div>
  )
}