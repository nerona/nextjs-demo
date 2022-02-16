import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import { InfiniteScroll, List, NoticeBar } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const Toutiao: NextPage<{ data: any; joke: any }> = ({
  data = [],
  joke = [],
}) => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>(data);

  const loadMore = async () => {
    const res = await fetch(
      `http://api.tianapi.com/topnews/index?key=80e4fa9d0221495137dfd51e1bb0db98&page=${
        page + 1
      }`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    if (data.code === 200) {
      setList([...list, ...data.newslist]);
      setPage(page + 1);
    }
  };

  return (
    <div>
      <Head>
        <title>今日头条</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoticeBar content={joke[0]?.content} color="info" />

      <main>
        <List>
          {list.map((item: any) => (
            <List.Item
              key={item.id}
              prefix={<UnorderedListOutline />}
              extra={item.source}>
              <a>{item.title}</a>
            </List.Item>
          ))}
        </List>

        <InfiniteScroll loadMore={loadMore} hasMore={true} />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `http://api.tianapi.com/topnews/index?key=80e4fa9d0221495137dfd51e1bb0db98`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  let result: any[] = [];
  if (data.code === 200) {
    result = data.newslist;
  }

  const jokeRes = await fetch(
    `http://api.tianapi.com/joke/index?key=80e4fa9d0221495137dfd51e1bb0db98`,
    {
      method: "GET",
    }
  );
  const jokeData = await jokeRes.json();
  let joke: any[] = [];
  if (jokeData.code === 200) {
    joke = jokeData.newslist;
  }

  return {
    props: {
      data: result,
      joke,
    },
  };
}

export default Toutiao;
