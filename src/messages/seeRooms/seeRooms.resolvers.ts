import { Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver(
      async (_, __, { loggedInUser, client }) =>
        await client.room.findMany({
          where: { users: { some: { id: loggedInUser.id } } },
        })
    ),
  },
}

export default resolvers