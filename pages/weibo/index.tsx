import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { List, NoticeBar } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const Weibo: NextPage<{ data: any }> = ({ data = [] }) => {
  return (
    <div>
      <Head>
        <title>微博</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoticeBar content={data[0]?.content} color="info" />

      <main>
        <List>
          <List.Item prefix={<UnorderedListOutline />}>
            <Link href={`/weibo/2492465520`} as={`/weibo/2492465520`}>
              <a>恶魔奶爸</a>
            </Link>
          </List.Item>
        </List>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `http://api.tianapi.com/tiangou/index?key=80e4fa9d0221495137dfd51e1bb0db98`,
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
