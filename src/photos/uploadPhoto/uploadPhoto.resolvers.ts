import { Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagObjs = null
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g)
          hashtagObjs = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }))
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
          },
        })
      }
    ),
  },
}

export default resolvers