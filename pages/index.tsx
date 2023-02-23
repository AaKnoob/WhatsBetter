import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Card from 'components/card/card.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CLIENT_ID = '76841e411dd14d4ab23976bfe4aee607';
const REDIRECT_URI =
  'https://githubvjtxwq-1ewl--3000.local-credentialless.webcontainer.io/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

const Home: NextPage = () => {
  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    // getToken()
    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: 'artist',
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map(
      (artist, index) =>
        index < 2 && (
          <div
            key={artist.id}
            className="border p-4 rounded-xl shadow-xl hover:shadow-lg hover:bg-blue-200"
          >
            {artist.images.length ? (
              <img width={'100%'} src={artist.images[0].url} alt="" />
            ) : (
              <div>No Image</div>
            )}
            {artist.name}
          </div>
        )
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to WhatsBetter</h1>

        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            className="px-6 py-3 bg-green-500 rounded-xl font-semibold"
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {token ? (
          <form
            onSubmit={searchArtists}
            className="p-4 bg-gray-300 rounded-xl flex gap-4"
          >
            <input
              className="bg-grey-300 h-8 border-none"
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button type={'submit'}>Search</button>
          </form>
        ) : (
          <h2>Please login</h2>
        )}

        {renderArtists()}

        <h4 className="mt-4">Chose the one you like the best👇</h4>
        <div className="flex gap-2 mt-8">
          <Card />
          <Card />
        </div>
        <button type="button" className="mt-6 hover:text-blue-800">
          I dont know... I'll skip this
        </button>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Created by <b>Aa</b>
      </footer>
    </div>
  );
};

export default Home;
