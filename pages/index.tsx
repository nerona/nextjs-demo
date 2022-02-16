import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { List, NoticeBar } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const Home: NextPage<{ data: any }> = ({ data = { newslist: [] } }) => {
  return (
    <div>
      <Head>
        <title>小纪</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <List
          header={
            <NoticeBar
              content={data.newslist[0]?.content || "甜到腻嘴的土味情话"}
              color="info"
            />
          }>
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
    `http://api.tianapi.com/saylove/index?key=80e4fa9d0221495137dfd51e1bb0db98&num=10`,
    {
      method: "GET",
    }
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
