import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { List, NoticeBar } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const Weibo: NextPage<{ data: any; list: any }> = ({
  data = [],
  list = [],
}) => {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <Head>
        <title>Title</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoticeBar content={data[0]?.content} color="info" />

      <main>
        <List>
          {list.map((item: any) => (
            <List.Item key={item.article_id} prefix={<UnorderedListOutline />}>
              <a>{item.title}</a>
            </List.Item>
          ))}
        </List>
      </main>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `http://api.tianapi.com/pyqwenan/index?key=${process.env.TIANXING_KEY}`
  );
  const data = await res.json();

  // https://weibo.com/ajax/statuses/mymblog?uid=2492465520&page=1&feature=0

  return {
    props: {
      data: data?.newslist || [],
      list: [],
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
