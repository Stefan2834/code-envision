const { GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const { Data } = require('./Schema');
const { UserType } = require('./type')

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getData: {
            type: new GraphQLList(UserType),
            resolve: async () => {
                try {
                    const data = await Data.find({})
                    return data
                } catch (err) {
                    console.error(err);
                    throw new Error(err.message);
                }
            },
        }
    },
});

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        postData: {
            type: UserType,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { username }) => {
                try {
                    const newUser = new Data({ username });
                    const userSaved = await newUser.save();
                    return userSaved;
                } catch (err) {
                    console.log(err)
                    return false
                }
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});