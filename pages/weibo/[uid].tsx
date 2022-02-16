import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Weibo: NextPage<{ data: any }> = ({ data }) => {
  const router = useRouter();
  console.log(router);
  console.log(data);

  return (
    <div>
      <Head>
        <title>小纪</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      data: [],
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: ["/weibo/*"],
    fallback: true,
  };
}

export default Weibo;
