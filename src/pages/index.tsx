import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { List, NoticeBar } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const Home: NextPage<{ data: any; photo: string }> = ({ data = [], photo }) => {
  return (
    <div>
      <Head>
        <title>Demo</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoticeBar
        content={data[0]?.content}
        color="info"
        style={{
          position: "relative",
          zIndex: 9,
        }}
      />

      <main>
        <Image src={photo} alt="Picture of the author" layout="fill" />

        <List>
          <List.Item prefix={<UnorderedListOutline />}>
            <Link href={`/news`} as={`/news`}>
              <a>News</a>
            </Link>
          </List.Item>
          <List.Item prefix={<UnorderedListOutline />}>
            <Link href={`/weibo`} as={`/weibo`}>
              <a>微博</a>
            </Link>
          </List.Item>
        </List>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `http://api.tianapi.com/saylove/index?key=${process.env.TIANXING_KEY}&num=10`
  );
  const data = await res.json();

  const bingRes = await fetch(
    `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN`
  );
  const bing = await bingRes.json();

  let photo = "https://cn.bing.com";
  if (bing && bing.images) {
    photo += bing.images[0]?.url ?? "";
  }

  return {
    props: {
      data: data?.newslist || [],
      photo,
    },
  };
}

export default Home;
