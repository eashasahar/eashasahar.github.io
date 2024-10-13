const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

interface Post {
  title?: string;
  description?: string;
  date?: string; // Optional date
  tag?: string;
  slug: string;
  url: string;
}

const POSTS_PER_PAGE = 8;

const is_next_root = fs.existsSync(path.join(process.cwd(), 'md/post'));

function generateLatestPosts() {
  // Check if 'md/post' or 'src/md/post' exists
  const postsDirectory = path.join(process.cwd(), is_next_root ? 'md/post' : 'src/md/post')

  const fileNames : string[] = fs.readdirSync(postsDirectory);

  // Read and parse all markdown files
  const posts: Post[] = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    const slug = fileName.replace(/\.md$/, '');

    return {
      ...data,
      slug: fileName.replace(/\.md$/, ''),
      url: `/${slug}`, // You can modify this URL if necessary
    };
  });

  // Sort posts by date (descending)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  // Create 'dist' directory if not exists
  const outputDir = path.join(process.cwd(), is_next_root ? 'dist' : 'src/dist');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Save the sorted posts to `dist/latest.json`
  fs.writeFileSync(path.join(outputDir, 'latest.json'), JSON.stringify(sortedPosts, null, 2));

  console.log('latest.json file generated successfully');
}

generateLatestPosts();
