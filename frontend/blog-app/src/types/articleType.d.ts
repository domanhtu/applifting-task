type Article = {
    articleId: string;
    title: string;
    perex: string;
    createdAt: string;
    imageId: string;
  };

type Comment = {
  commentId: string;
  articleId: string;
  author: string;
  content: string;
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
    comments: Comment[];
  };