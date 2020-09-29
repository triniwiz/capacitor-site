import { h } from '@stencil/core';
import { href } from '../../stencil-router-v2';
import { Heading, DateTime } from '@ionic-internal/ionic-ds';
import parseISO from 'date-fns/parseISO';
import { BlogData } from '../../data.server/blog';

import { RenderJsxAst } from '@stencil/ssg';



const getBlogPostPath = (data: BlogData) => `/blog/${data.slug}`;
// const getAbsoluteBlogPostUrl = (doc: RenderedBlog) => `https://capacitorjs.com${getBlogPostPath(doc)}`;

export const BlogPost = ({ data, single = true }: { data: BlogData, single?: boolean }) => {

  return (
    <div class="blog-post__wrap">
      <div class="blog-post">
        <Heading level={2}><a {...href(getBlogPostPath(data))}>{data.title}</a></Heading>
        <PostAuthor authorName={data.authorName} authorUrl={data.authorUrl} dateISO={data.date} />

        {data.featuredImage && <PostFeaturedImage data={data} />}

        <RenderJsxAst ast={data.ast} />

        {!single && data.preview ? <PostContinueReading data={data} /> : null}

        {/*
        {single && <disqus-comments url={getAbsoluteBlogPostUrl(post)} siteId='capacitor' id={post.slug} />}
        */}
      </div>
    </div>
  )
}

const PostFeaturedImage = ({ data }: { data: BlogData}) => (
  <img class="blog-post__featured-image" src={data.featuredImage} alt={data.featuredImageAlt} />
);

const PostContinueReading = ({ data }: { data: BlogData }) => 
  <a class="blog-post__continue-reading" {...href(getBlogPostPath(data))}>Continue reading <ion-icon name="arrow-forward" /></a>

const PostAuthor = ({ authorName, authorUrl, dateISO }: { authorName: string, authorUrl: string, dateISO }) => {
  
  const date = parseISO(dateISO);

  return (
    <div class="blog-post__author">
      {/*<img src={a.author_avatar.url} alt={a.author_name} />*/}
      <span>
        By {' '}
        {authorUrl
          ? <a href={authorUrl} target="_blank">{authorName}</a>
          : authorName}
        {' '}
        on <DateTime date={date} /></span>
    </div>
  );
}