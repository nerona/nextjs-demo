import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { List } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>小纪</title>
        <meta name="description" content="Generated for 小纪" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <List header="菜单">
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

export default Home;
