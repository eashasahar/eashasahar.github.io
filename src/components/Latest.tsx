import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import MuiLink from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import latest_posts from '../dist/latest.json';

const TitleTypography = styled(Typography)(() => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
}));

function Author({ authors }: { authors?: { name: string; avatar: string }[] }) {
    if (!authors || authors.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar key={index} alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
    );
}

interface Post {
    title: string;
    description?: string;  // Optional
    tag?: string;          // Optional
    authors?: { name: string; avatar: string }[];  // Optional
    date: string;
    url: string;
}

const POSTS_PER_PAGE = 6;

export default function Latest({ searchQuery }: { searchQuery: string }) {
    // const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const posts = latest_posts;

    // Filter and paginate posts based on search query and page number
    useEffect(() => {
        // Apply search filtering
        const filtered = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        // Paginate the filtered posts
        const paginatedPosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
        setFilteredPosts(paginatedPosts);
        setTotalPages(Math.ceil(filtered.length / POSTS_PER_PAGE));
    }, [posts, searchQuery, page]);

    // Handle pagination
    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Latest
            </Typography>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
                                <Typography gutterBottom variant="caption">
                                    {post.tag}
                                </Typography>

                                <Link href={`/post/${post.url}`} passHref style={{ textDecoration: 'none', color: 'inherit'}}>
                                    <TitleTypography gutterBottom variant="h6" tabIndex={0}>
                                        {post.title}
                                        <NavigateNextRoundedIcon className="arrow" sx={{ fontSize: '1rem' }} />
                                    </TitleTypography>
                                </Link>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {post.description}
                                </Typography>
                                <Author authors={post.authors} />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography>No posts found for "{searchQuery}".</Typography>
                )}
            </Grid>
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                    <Pagination count={totalPages} page={page} onChange={handleChange} />
                </Box>
            )}
        </div>
    );
}
