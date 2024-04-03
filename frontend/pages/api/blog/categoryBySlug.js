import prisma from "../../../lib/db";
import { corsMiddleware } from "../../../middleware";

export default async function handler(req, res) {
    try {
        // Apply CORS middleware
        const response = corsMiddleware(req, res);
        if (response) {
            return response;
        }

        const page = parseInt(req.query.page) || 1;
        const postsPerPage = 12;

        // Fetch total number of posts
        const totalPostsCount = await prisma.post.count();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalPostsCount / postsPerPage);

        // Calculate startIndex and endIndex for pagination
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = page * postsPerPage;

        // Fetch a subset of posts based on pagination parameters
        const findAllPost = await prisma.post.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        });
        if (!findAllPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Return posts: If you want to implement server-side pagination, where 
        // you only return a subset of posts for the current page
        const posts = findAllPost.slice(startIndex, endIndex);

        // console.log("Find all posts:", findAllPost);
        // console.log("Posts:", posts);

        return res.status(200).json({ message: findAllPost, totalPages });
    } catch (error) {
        console.error('Error generating content:', error);
        return res.status(500).json({ error: 'Error generating content' });
    }
}
