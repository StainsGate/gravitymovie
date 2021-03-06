import Head from "next/head";
import Image from "next/image";
import Content from "../components/Content";
import Header from "../components/Header";
import Nav from "../components/Nav";
import requests from "../utils/request";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Dynamic Gravity</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      {/* header */}
      <Header />
      {/* nav */}
      <Nav />
      {/* content */}
      <Content Results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
