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

import { getMarvelAPI } from "../services/axios";
import { useEffect, useState } from "react";

const api = getMarvelAPI({});
const apikey = process.env.NEXT_PUBLIC_API_KEY;
const params = new URLSearchParams({
  apikey
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
      <section className="inner-dashboard grid grid-cols-2 overflow-auto md:overflow-clip lg:grid-cols-4 lg:grid-rows-3 gap-2.5 h-3/4 px-6 py-4 pb-24">
        {characters.length ? characters.map((el, index) => index + 1 > maxItemsPerPage ? null : (
          <div
            className={`character-card-wrapper rounded-2xl bg-gray-100 text-black ${index < (maxItemsPerPage - 2) ? '' : 'col-span-2'}`}
            key={el.id}>
            <div className="card-inner flex h-full rounded-xl px-2.5 py-3.5 gap-4">
              <figure className="w-1/3 lg:w-[5.25rem] h-full shrink-0">
                <img className="w-full h-full object-cover rounded-2xl" src={`${el.thumbnail.path}.${el.thumbnail.extension}`} />
              </figure>
              <div className="character-info overflow-hidden relative">
                <h1 className="font-semibold text-md truncate" title={el.name}>{el.name}</h1>
                <div className="description-holder max-h-[calc(100%-1.75rem)] overflow-hidden ">
                  <p className="overflow-hidden text-ellipsis text-xs font-light line-clamp-5">{el.description}</p>
                </div>
              </div>
            </div>
          </div>
        )) : null}
      </section>
  )
}