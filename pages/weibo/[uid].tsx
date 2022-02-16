import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { List, NoticeBar } from "antd-mobile";

const Weibo: NextPage<{ data: any }> = ({ data = [] }) => {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <Head>
        <title>小纪</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoticeBar content={data[0]?.content} color="info" />

      <main></main>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `http://api.tianapi.com/pyqwenan/index?key=80e4fa9d0221495137dfd51e1bb0db98`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  let result: any[] = [];
  if (data.code === 200) {
    result = data.newslist;
  }
  return {
    props: {
      data: result,
    },
  };
}

export default Weibo;
