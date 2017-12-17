import { SchemaStitcher } from '../../api/graphql/schemastitcher'
import Context from '../../context'
import { Post, BlogFactory } from './'
import { stitcher as profileStitcher } from '../profile'

const PostType = `
  type Post {
    text: String
    createdAt: String
    author: Profile
    replies: [Comment]
  }
`

const CommentType = `
  type Comment {
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

export const stitcher = new SchemaStitcher({
  queryDefinition: `
    # Get blog posts
    blogposts: [Post]
  `,
  mutationDefinition: `
    createPost(
      text: String!
    ): Post
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
    },
    // Custom leaf resolvers
    Post: {
      author: (post: Post, args: {}, ctx: Context) => {
        // fetch author by post.author
        return ctx.profileFacade.getProfileById(post.authorId)
      }
    }
  }
})
