export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: {
      asset: {
        _ref: string;
      };
    };
  };
  body: [object];
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  string;
  slug: {
    current: string;
  };
}
