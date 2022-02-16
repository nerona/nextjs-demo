import type { NextPage } from "next";
import { useState, useCallback } from "react";
import Head from "next/head";
import { InfiniteScroll, List, NoticeBar } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const News: NextPage<{ data: any; joke: any }> = ({ data = [], joke = [] }) => {
  const [offset, setOffset] = useState(20);
  const [list, setList] = useState<any[]>(data);

  const loadMore = useCallback(async () => {
    const res = await fetch(
      `https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=24hours&srv_id=pc&offset=${offset}&limit=20&strategy=1&ext={%22pool%22:[%22top%22],%22is_filter%22:7,%22check_type%22:true}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const result = await res.json();
    if (result && result.data) {
      setList([...list, ...(result.data.list || [])]);
      setOffset(offset + 20);
    }
  }, [offset, list]);

  return (
    <div>
      <Head>
        <title>News</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoticeBar content={joke[0]?.content} color="info" />

      <main>
        <List>
          {list.map((item: any) => (
            <List.Item key={item.article_id} prefix={<UnorderedListOutline />}>
              <a>{item.title}</a>
            </List.Item>
          ))}
        </List>

        <InfiniteScroll loadMore={loadMore} hasMore={offset <= 160} />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const newsRes = await fetch(
    `https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=24hours&srv_id=pc&offset=0&limit=20&strategy=1&ext={%22pool%22:[%22top%22],%22is_filter%22:7,%22check_type%22:true}`
  );
  const newsData = await newsRes.json();

  const jokeRes = await fetch(
    `http://api.tianapi.com/joke/index?key=80e4fa9d0221495137dfd51e1bb0db98`,
    {
      method: "GET",
    }
  );
  const jokeData = await jokeRes.json();

  return {
    props: {
      data: newsData?.data?.list || [],
      joke: jokeData?.newslist || [],
    },
  };
}

export default News;
