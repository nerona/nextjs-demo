import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { List } from "antd";

const data = [{ label: "恶魔奶爸", uid: 2492465520 }];

const Weibo: NextPage = () => {
  return (
    <div>
      <Head>
        <title>小纪</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Link href={`/weibo/${item.uid}`} as={`/weibo/${item.uid}`}>
                <a>{item.label}</a>
              </Link>
            </List.Item>
          )}
        />
      </main>
    </div>
  );
};

export default Weibo;
