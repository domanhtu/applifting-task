type Article = {
    articleId: string;
    title: string;
    perex: string;
    createdAt: string;
    imageId: string;
  };

type MyComment = {
  commentId: string;
  articleId: string;
  author: string;
  content: string | undefined;
  postedAt: string;
  score: number;
}


type ArticleDetail = {
    articleId: string;
    title: string;
    perex: string;
    imageId: string;
    createdAt: string;
    lastUpdatedAt: string;
    content: string;
    comments: MyComment[];
  };