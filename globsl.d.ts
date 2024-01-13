interface Meal<TImage extends string | File> {
  id: string;
  title: string;
  slug: string;
  image: TImage;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}
