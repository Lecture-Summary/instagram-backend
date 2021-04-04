import { Resolvers } from '../types'

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } })
    },
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    likes: ({ id }, _, { client }) =>
      client.like.count({ where: { photoId: id } }),
  },
  Hashtag: {
    photos: ({ id }, { page }, { client, loggedInUser }) => {
      return client.hashtag.findUnique({ where: { id } }).photos()
    },
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
}

export default resolvers
