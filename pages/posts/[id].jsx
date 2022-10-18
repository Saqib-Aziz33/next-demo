import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/Date";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
      id: params.id,
    },
  };
}

export default function Post({ postData, id }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}

      <br />
      {postData.id}
      <br />
      {postData.date}
      <hr />
      <Date dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
