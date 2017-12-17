import { SchemaStitcher } from '../../api/graphql/schemastitcher'
import Context from '../../context'
import { Post, Comment, BlogFactory } from './'
import { stitcher as profileStitcher } from '../profile'

const PostType = `
  type Post {
    id: Int
    text: String
    createdAt: String
    author: Profile
    replies: [Comment]
  }
`

const CommentType = `
  type Comment {
    id: Int
    text: String
    createdAt: String
    author: Profile
  }
`

// resolver functions
function blogposts(root: {}, args: {}, ctx: Context): Promise<Post[]> {
  return ctx.blogFacade.getAllPosts()
}

interface CreatePostArgs {
  text: string
}

async function createPost(
  root: {}, // todo: define type
  args: CreatePostArgs,
  ctx: Context,
): Promise<Post> {
  const profile = await ctx.profileFacade.getProfileFromMembership(
    await ctx.membershipFacade.getCurrentMembership()
  )

  const post = BlogFactory.createPost(profile, args.text)
  return await ctx.blogFacade.savePost(post) as Post
}

interface CreateCommentArgs {
  text: string
  postId: number
}

async function createComment(
  root: {}, // todo: define type
  args: CreateCommentArgs,
  ctx: Context,
): Promise<Comment> {
  const profile = await ctx.profileFacade.getProfileFromMembership(
    await ctx.membershipFacade.getCurrentMembership()
  )

  return ctx.blogFacade.createComment(profile, args.postId, args.text)
}

export const stitcher = new SchemaStitcher({
  queryDefinition: `
    # Get blog posts
    blogposts: [Post]
  `,
  mutationDefinition: `
    createPost(
      text: String!
    ): Post

    createComment(
      text: String!
      postId: Int!
    ): Comment
  `,
  types: () => [
    PostType,
    CommentType,
    profileStitcher.types,
  ],
  resolvers: {
    // Root query resolvers
    Query: {
      blogposts,
    },
    // Root mutation resolvers
    Mutation: {
      createPost,
      createComment,
    },
    // Custom leaf resolvers
    Post: {
      author: (post: Post, args: {}, ctx: Context) => {
        // fetch author by post.author
        return ctx.profileFacade.getProfileById(post.authorId)
      },
      replies: async (post: Post, args: {}, ctx: Context) => {
        const replies = await ctx.blogFacade.getRepliesForPost(post.id)

        return replies.map(async (reply) => ({
          ...reply,
          createdAt: new Date(reply.createdAt).toISOString(),
          author: await ctx.profileFacade.getProfileById(reply.authorId),
        }))
      },
    }
  }
})
