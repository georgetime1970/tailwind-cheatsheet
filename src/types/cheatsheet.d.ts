interface Subcategory {
  title: string;
  docs: string;
  description: string;
  table: string[][];
}

interface Category {
  title: string;
  content: Subcategory[];
}
